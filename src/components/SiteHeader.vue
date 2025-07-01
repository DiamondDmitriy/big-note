<script setup lang="ts">
import { UserFilled } from '@element-plus/icons-vue'
import ThemeSwitch from '@/components/ThemeSwitch.vue'
</script>

<template>
  <header class="header">
    <div class="header__logo">
      <router-link :to="{ name: 'home' }">LOGO</router-link>
    </div>

    <div class="header__content">
      <ThemeSwitch />

      <div class="user">
        <ElAvatar :icon="UserFilled" :size="30" />
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  position: fixed;
  top: 0;
  width: 100vw;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--base-border);
  height: var(--header-height);
  padding: 0 var(--site-content-offset-horizon);
  background-color: var(--base-background);

  &__content {
    display: flex;
    margin-left: auto;
    align-items: center;
    gap: 24px;

    .user {
      cursor: pointer;
      display: flex;
      gap: 15px;
    }
  }
}
</style>
