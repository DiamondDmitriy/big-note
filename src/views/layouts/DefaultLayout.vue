<script setup lang="ts">
import { RouterView } from 'vue-router'
import SiteHeader from '@/components/SiteHeader.vue'
import SiteAside, { type AsideItem } from '@/components/SiteAside.vue'

const asideItems: AsideItem[] = [
  {
    name: 'To Do',
    routeName: 'to-do',
  },
  {
    name: 'Заметки',
    routeName: 'notes',
  },
  {
    name: 'Документация',
    routeName: 'docs',
  },
]
</script>

<template>
  <SiteHeader />
  <section class="container">
    <SiteAside :items="asideItems" />
    <main class="main">
      <RouterView />
    </main>
  </section>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  margin-top: var(--header-height);
  min-height: var(--main-height);

  .main {
    width: 100%;
    margin-left: var(--aside-width);
  }
}
</style>
