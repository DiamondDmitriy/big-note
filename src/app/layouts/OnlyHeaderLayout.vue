<script setup lang="ts">
import { RouterView } from 'vue-router'
import SiteHeader from '@/widgets/SiteHeader.vue'
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
  margin: var(--header-height) auto 0 auto;
}
</style>
