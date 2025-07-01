<script setup lang="ts">
import DefaultLayout from '@/views/layouts/DefaultLayout.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import EmptyLayout from '@/views/layouts/EmptyLayout.vue'
import OnlyHeaderLayout from '@/views/layouts/OnlyHeaderLayout.vue'

const route = useRoute()
const layout = computed(() => {
  switch (route.meta.layout) {
    case 'empty':
      return EmptyLayout
    case 'only-header':
      return OnlyHeaderLayout
    default:
      return DefaultLayout
  }
})
</script>

<template>
  <Component :is="layout">
    <RouterView />
  </Component>
</template>

<style lang="scss" scoped></style>
