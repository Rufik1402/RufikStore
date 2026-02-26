<script setup lang="ts">
import AppHeader from '../components/layout/AppHeader.vue'
import ProductCard from '../components/product/ProductCard.vue'
import type { Product } from '../types/product'
import { ref } from 'vue'
import { onMounted } from 'vue'
import ProductCardSkeleton from "../components/product/ProductCardSkeleton.vue";

onMounted(async () => {
  try {
    loading.value = true
    const response = await fetch('https://fakestoreapi.com/products')
    const data = await response.json()
    products.value = data
  } catch (e) {
    console.error("Ошибка",e)
  } finally {
    loading.value = false
  }
})

const products = ref<Product[]>([])
const loading = ref(false);
const error = ref<string | null>(null);
const fetchProducts = async () => {
  try {
    loading.value = true
    error.value = null
    const response = await fetch('https://fakestoreapi.com/products')
    const data = await response.json()
    products.value = data
  } catch (e) {
    error.value = 'Что-то пошло не так 😢'
  } finally {
    loading.value = false
  }
}
onMounted(fetchProducts)


</script>

<template>
  <AppHeader />

  <div v-if="loading" class="products-grid">
    <ProductCardSkeleton v-for="n in 8" :key="n" />
  </div>

  <div v-else-if="error" class="error">
    <p>{{error}}</p>
    <button @click="fetchProducts">Попробовать снова</button>
  </div>
  <div v-else class="products-grid">
    <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
    />
  </div>
</template>

<style scoped>
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