<script setup lang="ts">
export type AsideItem = {
  name: string
  routeName: string
  icon?: null
}

defineProps<{ items: AsideItem[] }>()
</script>

<template>
  <aside class="aside">
    <ul class="aside__items">
      <li class="aside__item" v-for="(item, key) in items" :key="key">
        <RouterLink :to="{ name: item.routeName }">
          {{ item.name }}
        </RouterLink>
      </li>
    </ul>
  </aside>
</template>

<style scoped lang="scss">
.aside {
  position: fixed;
  left: 0;
  z-index: 1;
  top: var(--header-height);
  height: var(--main-height);
  border-right: 1px solid var(--base-border);
  padding: 20px 20px 0 var(--site-content-offset-horizon);
  width: var(--aside-width);

  &__items {
    padding: 0;
  }

  &__item {
    list-style: none;
    cursor: pointer;
  }
}
</style>
