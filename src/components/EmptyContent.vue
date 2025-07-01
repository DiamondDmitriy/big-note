<script setup lang="ts">
defineProps({
  src: String,
  text: String,
})
</script>

<template>
  <div class="empty-content">
    <img class="empty-content__image" :src="src" alt="empty-content"/>
    <p class="empty-content__text">{{ text }}</p>
  </div>
</template>

<style scoped lang="scss"></style>
