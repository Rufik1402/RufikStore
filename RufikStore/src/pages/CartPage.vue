<script setup lang="ts">
import { useCartStore } from "../stores/cart";
const cart = useCartStore();

import CartItem from "../components/product/CartItem.vue";
</script>

<template>
  <div class="cart-page">
    <h1>Корзина</h1>

    <router-link to="/">На главную</router-link>

    <p v-if="cart.items.length === 0">Корзина пуста 😢</p>

    <div v-else class="cart-items">
      <CartItem v-for="item in cart.items" :key="item.product.id" :item="item" />
    </div>

    <div v-if="cart.items.length > 0" class="cart-summary">
      <p>Товаров: {{ cart.totalCount }}</p>
      <p>Сумма: {{ cart.totalPrice }} ₽</p>
      <div class="cart-actions">
        <button class="nav-button" @click="$router.push('/')">Вернуться в каталог</button>
        <button class="nav-button" @click="$router.push('/checkout')">Оформить заказ</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cart-page {
  max-width: 900px;
  margin: 40px auto;
  padding: 32px;
  background: #1e2f5a;       /* тёмно-синий фон */
  border-radius: 12px;
  color: #ffffff;
}

h1 {
  margin-bottom: 24px;
  text-align: center;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.cart-summary {
  margin-top: 32px;
  padding: 16px;
  border-top: 1px solid #5a7cc8; /* светло-синяя граница */
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.cart-actions {
  display: flex;
  gap: 16px;
  margin-top: 16px;
}

.nav-button {
  background: #3b5998;
  color: #ffffff;
  border: none;
  padding: 12px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s ease;
}

.nav-button:hover {
  background: #5a7cc8;
}
</style>