<script setup lang="ts">
import { RouterView } from 'vue-router'
import SiteHeader from '@/components/SiteHeader.vue'
</script>

<template>
  <SiteHeader />
  <section class="container">
    <RouterView />
  </section>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  min-height: calc(100vh - var(--header-height));
  margin-top: var(--header-height);
}
</style>
