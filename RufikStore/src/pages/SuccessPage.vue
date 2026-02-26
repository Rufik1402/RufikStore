<template>
  <div class="success-page">
    <h1>Спасибо за заказ! 🎉</h1>
    <p>Ваш заказ успешно оформлен.</p>
    <button class="nav-button" @click="$router.push('/')">Вернуться в каталог</button>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.success-page {
  max-width: 600px;
  margin: 80px auto;
  padding: 32px;
  background: #1e2f5a;      /* тёмно-синий фон */
  border-radius: 12px;
  text-align: center;
  color: #ffffff;
}

.success-page h1 {
  margin-bottom: 16px;
}

.success-page p {
  margin-bottom: 24px;
  color: #cfd8f0;
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