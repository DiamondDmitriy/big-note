<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="docs-view">
    <RouterView />
  </div>
</template>

<style scoped lang="scss">
.docs-view {
  padding: var(--container-offset) var(--site-content-offset-horizon);
}
</style>
