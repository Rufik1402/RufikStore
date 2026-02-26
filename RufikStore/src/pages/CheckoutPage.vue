<script setup lang="ts">
import {ref} from 'vue'
import {useCartStore} from "../stores/cart.ts";
import {useRouter} from "vue-router";

const cart = useCartStore();
const router = useRouter();

const name = ref('')
const phone = ref('')
const address = ref('')


const submitOrder = () => {
  cart.clearCart()

  router.push('/success')
}
</script>

<template>
  <div class="checkout">
    <h1>Оформление заказа</h1>

    <p v-if="cart.items.length === 0">Корзина пуста 😢</p>

    <form v-else @submit.prevent="submitOrder" class="checkout-form">
      <input v-model="name" type="text" placeholder="Ваше имя" required />
      <input v-model="phone" type="tel" placeholder="Телефон" required />
      <input v-model="address" type="text" placeholder="Адрес доставки" required />

      <div class="summary">
        <p>Товаров: {{ cart.totalCount }}</p>
        <p>Сумма: {{ cart.totalPrice }} ₽</p>
      </div>

      <button type="submit" class="nav-button">Оформить заказ</button>
      <button type="button" class="nav-button" @click="$router.push('/')">Вернуться в каталог</button>
    </form>
  </div>
</template>

<style scoped>
.checkout {
  max-width: 600px;
  margin: 40px auto;
  padding: 0 16px;
  background: #1e2f5a;       /* темно-синий фон для всей страницы */
  border-radius: 12px;
  padding: 32px;
}

h1 {
  color: #ffffff;             /* белый заголовок */
  margin-bottom: 24px;
  text-align: center;
}

.checkout-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.checkout-form input {
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #5a7cc8;   /* светло-синяя граница */
  background: #ffffff;          /* белое поле */
  color: #1e2f5a;              /* тёмно-синий текст */
  font-size: 14px;
}

.summary {
  display: flex;
  justify-content: space-between;
  font-weight: 500;
  color: #ffffff;               /* белый текст для summary */
  margin-top: 16px;
}

.nav-button {
  background: #3b5998;          /* кнопка синий */
  color: #ffffff;               /* белый текст */
  border: none;
  padding: 12px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s ease;
}

.nav-button:hover {
  background: #5a7cc8;          /* светлый синий при hover */
}
</style>