<script setup lang="ts">
import {ref, onMounted} from 'vue'
import { useRoute } from 'vue-router'
import type { Product } from '../types/product'
import { useCartStore } from "../stores/cart";


const route = useRoute()
const product = ref<Product | null>(null)
const loading = ref(false);
const error = ref<string | null>(null);
const cart = useCartStore();

onMounted(async () => {
  const id = route.params.id;
  if (!id) return

  try {
    loading.value = true
    error.value = null

    const response = await fetch(`https://fakestoreapi.com/products/${id}`)
    if (!response.ok) throw new Error('Ошибка загрузки товара')

    product.value = await response.json()
  } catch (e) {
    error.value = 'Не удалось загрузить товар'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div>
    <div class="header">
      <h1>Товар</h1>

      <router-link to="/">
        На главную
      </router-link>
      <router-link to="/cart">
        К корзине
      </router-link>
    </div>

    <p v-if="loading">Загрузка</p>
    <p v-else-if="error">{{ error }}</p>
    <div v-else-if="product" class="product_detail">

      <div class="product_detail_image">
        <img :src="product.image" alt="" />
      </div>

      <div class="product_detail_info">
        <h2>{{product.title}}</h2>
        <p class="product_detail_category">{{product.category}}</p>
        <p class="product_detail_price">{{product.price}}</p>
        <p class="product_detail_rating">
          ⭐ {{ product.rating?.rate }} ({{ product.rating?.count }} отзывов)
        </p>
        <p class="product_detail_description">
          {{product.description}}
        </p>

        <button class="product_detail_button"
                @click="product && cart.addToCart(product)"
        >
          Добавить в корзину
        </button>
      </div>
    </div>


    <p>Товаров в корзине: {{ cart.totalCount }}</p>
    <p>Сумма корзины: {{ cart.totalPrice }} ₽</p>
  </div>
</template>

<style scoped>
.product_detail {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  padding: 40px;
}

.product_detail_image img {
  width: 100%;
  max-width: 400px;
  object-fit: contain;
}

.product_detail_info {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.product_detail_price {
  font-size: 24px;
  font-weight: bold;
}

.product_detail_button {
  padding: 12px 20px;
  border: none;
  background: black;
  color: white;
  border-radius: 8px;
  cursor: pointer;
}

.header {
  display: flex;
  justify-content: space-between;
}
</style>