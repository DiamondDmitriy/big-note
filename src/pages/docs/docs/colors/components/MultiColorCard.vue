<script setup lang="ts">
defineProps<{
  main: string
  collection: string[]
}>()
</script>

<template>
  <div class="multi-color-card">
    <div class="multi-color-card__main" :style="{ backgroundColor: `var(${main})` }" />
    <div class="multi-color-card__collection multi-color-card-collection" v-if="collection.length">
      <div
        class="multi-color-card-collection__item"
        v-for="(color, key) in collection"
        :key="key"
        :style="{ backgroundColor: `var(${color})` }"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.multi-color-card {
  width: 500px;

  &__main {
    height: 60px;
    border-radius: 4px 4px 0 0;
  }

  &-collection {
    height: 40px;
    display: flex;

    &__item {
      flex: 1;
      min-width: 0;
    }
  }
}
</style>
