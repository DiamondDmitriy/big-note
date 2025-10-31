<script setup lang="ts">
import { RouterView } from 'vue-router'
import SiteHeader from '@/widgets/SiteHeader.vue'
import SiteAside, { type AsideItem } from '@/widgets/SiteAside.vue'
import { CircleCheck, Notebook, Document } from '@element-plus/icons-vue'

const asideItems: AsideItem[] = [
  {
    name: 'To Do',
    route: '/to-do',
    iconComponent: CircleCheck,
  },
  {
    name: 'Заметки',
    route: '/notes',
    iconComponent: Notebook,
  },
  {
    name: 'Документация',
    route: '/docs',
    iconComponent: Document,
    children: [
      {
        name: 'Colors',
        route: '/docs/colors',
        // iconComponent: null,
      },
    ],
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
