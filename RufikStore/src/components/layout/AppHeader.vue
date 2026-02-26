<script setup lang="ts">
import {useCartStore} from "../../stores/cart.ts";

const cart = useCartStore();
</script>

<template>


    <header class="header">
      <h1>
        RufatBerries
      </h1>
      <button class="nav-button" @click="$router.push('/')">Главная</button>
      <button class="nav-button" @click="$router.push('/cart')">Корзина ({{ cart.totalCount }})</button>
    </header>



</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 16px 32px;
  background: var(--bg-header);
  color: var(--text-main);
}

.nav-button {
  background: var(--accent);
  color: var(--text-main);
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s ease;
}

.nav-button:hover {
  background: var(--accent-hover);
}
</style>