<script setup lang="ts">
import { useCartStore } from "../../stores/cart.ts";
import type {Product} from "../../types/product.ts";
import {computed} from "vue";

const props = defineProps<{
  item: {
    product: Product;
    quantity: number;
  }
}>()

const subtotal = computed(() => {
  return props.item.quantity * props.item.product.price;
})

const cart = useCartStore();

const increase = () => cart.increaseQuantity(props.item.product.id);
const decrease = () => cart.decreaseQuantity(props.item.product.id);
const remove = () => cart.removeFromCart(props.item.product.id);
</script>

<template>
  <div class="cart_item">
    <img :src="item.product.image" alt="" />
    <div class="cart_item_info">
      <h2>{{item.product.title}}</h2>
      <p>{{item.product.price}}</p>
      <p>Количество: {{item.quantity}}</p>
      <p>Сумма: {{subtotal}}</p>

      <div class="cart_item_buttons">
        <button @click="decrease">-</button>
        <button @click="increase">+</button>
        <button @click="remove">Удалить</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cart_item {
  display: flex;
  gap: 16px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 16px;
}

.cart_item img {
  width: 120px;
  object-fit: contain;
  border-radius: 8px;
}

.cart_item_info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.cart_item_buttons button {
  margin-right: 8px;
  background: #3B5998FF
}



</style>