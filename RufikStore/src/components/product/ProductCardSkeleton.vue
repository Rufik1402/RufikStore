<script setup lang="ts">

</script>

<template>
  <div class="card skeleton">
    <div class="card__image skeleton-block"></div>
    <div class="card__body">
      <div class="skeleton-block skeleton-title"></div>
      <div class="skeleton-block skeleton-price"></div>
      <div class="skeleton-block skeleton-button"></div>
    </div>
  </div>
</template>

<style scoped>
.card.skeleton {
  border-radius: 12px;
  padding: 16px;
  background: #f0f0f0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.skeleton-block {
  background: #ddd;
  border-radius: 6px;
  animation: pulse 1.2s infinite ease-in-out;
}

.card__image.skeleton-block {
  height: 200px;
  width: 100%;
}

.skeleton-title {
  height: 16px;
  width: 80%;
}

.skeleton-price {
  height: 14px;
  width: 40%;
}

.skeleton-button {
  height: 32px;
  width: 60px;
  margin-top: auto;
}

@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.4; }
  100% { opacity: 1; }
}
</style>