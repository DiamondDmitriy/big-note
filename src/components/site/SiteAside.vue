<script setup lang="ts">
import type { Component } from 'vue'
import { useRouter } from 'vue-router'

export type AsideItem = {
  name: string
  route: string
  iconComponent?: Component
  children?: AsideItem[]
}
const router = useRouter()

defineProps<{ items: AsideItem[] }>()
</script>

<template>
  <aside class="aside">
    <ElMenu
      router
      :default-active="router.currentRoute.value.path"
    >
      <template v-for="(item, key) in items" :key="key">
        <!-- menu items -->
        <ElMenuItem :index="item.route" v-if="!item.children">
          <ElIcon v-if="item.iconComponent">
            <component :is="item.iconComponent" />
          </ElIcon>
          <span>{{ item.name }}</span>
        </ElMenuItem>

        <!-- sub menu items -->
        <ElSubMenu :index="item.route" v-else>
          <template #title>
            <ElIcon v-if="item.iconComponent">
              <component :is="item.iconComponent" />
            </ElIcon>
            <span>{{ item.name }}</span>
          </template>
          <ElMenuItem
            :index="child.route"
            v-for="(child, childKey) in item.children"
            :key="childKey"
          >
            <span>{{ child.name }}</span>
          </ElMenuItem>
        </ElSubMenu>
      </template>
    </ElMenu>
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
  padding-top: 30px;
  width: var(--aside-width);

  .el-menu {
    border-right: unset;
    --el-menu-bg-color: var(--base-background);
    --el-menu-hover-bg-color: var(--color-brand-6);
    --el-menu-text-color: var(--primary-text);
  }
}
</style>
