<script setup lang="ts">
import DefaultLayout from '@/views/layouts/DefaultLayout.vue'
import { useRoute } from 'vue-router'
import { computed, onBeforeMount } from 'vue'
import EmptyLayout from '@/views/layouts/EmptyLayout.vue'
import OnlyHeaderLayout from '@/views/layouts/OnlyHeaderLayout.vue'
import { useAuthStore } from '@/core/stores/AuthStore.ts'

const route = useRoute()
const authStore = useAuthStore()
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

onBeforeMount(async ()=>{
  // todo: do global loading
  await authStore.checkAuth()
})
</script>

<template>
  <Component :is="layout">
    <RouterView />
  </Component>
</template>

<style lang="scss" scoped></style>
