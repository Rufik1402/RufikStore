<script setup lang="ts">
import { onMounted, ref } from 'vue'
import AppHeader from '../components/layout/AppHeader.vue'
import ProductCard from '../components/product/ProductCard.vue'
import ProductCardSkeleton from '../components/product/ProductCardSkeleton.vue'
import { useFiltersStore, type SortOrder } from '../stores/filters'

const filtersStore = useFiltersStore()
const loading = ref(false)
const error = ref<string | null>(null)

const fetchProducts = async () => {
  try {
    loading.value = true
    error.value = null
    const response = await fetch('https://fakestoreapi.com/products')
    const data = await response.json()
    filtersStore.setProducts(data)
  } catch (e) {
    error.value = 'Что-то пошло не так 😢'
  } finally {
    loading.value = false
  }
}

const parsePrice = (value: string) => {
  if (!value) return null

  const parsedValue = Number(value)

  if (Number.isNaN(parsedValue) || parsedValue < 0) {
    return null
  }

  return parsedValue
}

const updateMinPrice = (event: Event) => {
  const target = event.target as HTMLInputElement
  filtersStore.updateMinPrice(parsePrice(target.value))
}

const updateMaxPrice = (event: Event) => {
  const target = event.target as HTMLInputElement
  filtersStore.updateMaxPrice(parsePrice(target.value))
}

const updateSortOrder = (event: Event) => {
  const target = event.target as HTMLSelectElement
  filtersStore.sortOrder = target.value as SortOrder
}

onMounted(fetchProducts)
</script>

<template>
  <AppHeader />

  <section class="filters">
    <input
      v-model="filtersStore.searchQuery"
      class="filter-input"
      type="text"
      placeholder="Поиск товаров"
    />

    <select
      class="filter-select"
      :value="filtersStore.sortOrder"
      @change="updateSortOrder"
    >
      <option value="none">Без сортировки</option>
      <option value="price-asc">Цена: по возрастанию</option>
      <option value="price-desc">Цена: по убыванию</option>
    </select>

    <input
      class="filter-input"
      type="number"
      min="0"
      placeholder="Цена от"
      :value="filtersStore.minPrice ?? ''"
      @input="updateMinPrice"
    />

    <input
      class="filter-input"
      type="number"
      min="0"
      placeholder="Цена до"
      :value="filtersStore.maxPrice ?? ''"
      @input="updateMaxPrice"
    />
  </section>

  <div v-if="loading" class="products-grid">
    <ProductCardSkeleton v-for="n in 8" :key="n" />
  </div>

  <div v-else-if="error" class="error">
    <p>{{ error }}</p>
    <button @click="fetchProducts">Попробовать снова</button>
  </div>

  <div v-else class="products-grid">
    <ProductCard
      v-for="product in filtersStore.filteredProducts"
      :key="product.id"
      :product="product"
    />
  </div>
</template>

<style scoped>
.filters {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
  padding: 0 24px;
  margin-top: 16px;
}

.filter-input,
.filter-select {
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 14px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  padding: 24px;
}

@media (max-width: 1024px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .products-grid {
    grid-template-columns: 1fr;
  }
}

.loading {
  text-align: center;
  font-size: 20px;
  padding: 50px 0;
}
</style>
