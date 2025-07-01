<script setup lang="ts">
import { RouterView } from 'vue-router'
import SiteAside, { type AsideItem } from '@/components/SiteAside.vue'

const asideItem: AsideItem[] = [{ name: 'colors', routeName: 'docs-colors' }]
</script>

<template>
  <SiteAside :items="asideItem" />
  <main class="main">
    <RouterView />
  </main>
</template>

<style scoped lang="scss">
.main {
  width: 100%;
  margin-left: var(--aside-width);
  padding: var(--container-offset) var(--site-content-offset-horizon);
}
</style>
