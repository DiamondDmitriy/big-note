<script setup lang="ts">
import EmptyContent from '@/components/site/EmptyContent.vue'

withDefaults(defineProps<{
  empty: boolean
  emptyText?: string
}>(), {
  empty: false,
  emptyText: 'Тут пока пусто...',
})
</script>

<template>
  <div class="base-container">
    <EmptyContent :text="emptyText" v-if="empty" center />
    <slot v-else />
    <slot name="always" />
  </div>
</template>

<style scoped lang="scss">
.base-container {
  width: 100%;
  padding: var(--container-offset) var(--site-content-offset-horizon);
  position: relative;
}
</style>
