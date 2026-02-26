<script setup lang="ts">
import type { Product } from '../../types/product'
import {useCartStore} from "../../stores/cart.ts";

const cart = useCartStore();
defineProps<{
  product: Product
}>()
</script>

<template>

    <div class="card">
      <router-link :to="`/product/${product.id}`" class="card_link">
        <img :src="product.image" alt="" class="card_img" />
        <h3 class="card_title">{{product.title}}</h3>
        <p class="card_price">{{ product.price }}</p>
      </router-link>
      <button
          class="card_button"
          @click="product && cart.addToCart(product)"
      >
        Добавить в корзину
      </button>
    </div>


</template>

<style scoped>
.card {
  background: var(--bg-card);
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
}

.card_img {
  width: 100%;
  height: 220px;
  object-fit: contain;
  background: #e6ecf8; /* чуть светлее блока фото */
  padding: 20px;
}

.card_title {
  font-size: 15px;
  font-weight: 500;
  color: #1c2a4d;
  line-height: 1.3;
  height: 40px;
  overflow: hidden;
}

.card_price {
  font-size: 18px;
  font-weight: 700;
  color: #0d1b3d;

}

.card_button {
  margin: 0 16px 16px 16px;
  padding: 10px 14px;
  border: none;
  background: var(--accent);
  color: var(--text-main);
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s ease;
}

.card_button:hover {
  background: var(--accent-hover);
}
</style>
