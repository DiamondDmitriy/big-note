<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Moon, Sunny } from '@element-plus/icons-vue'

const themeSwitch = ref(false)

function applyTheme(isDark: boolean) {
  themeSwitch.value = isDark
  localStorage.setItem('theme', isDark ? 'dark' : 'light')

  if (isDark) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  const preferDark = savedTheme
    ? savedTheme === 'dark'
    : window.matchMedia('(prefers-color-scheme: dark)').matches

  applyTheme(preferDark)
})
</script>

<template>
  <div class="theme-switch">
    <ElSwitch :model-value="themeSwitch" @update:model-value="applyTheme">
      <template #active-action>
        <Moon />
      </template>
      <template #inactive-action>
        <Sunny />
      </template>
    </ElSwitch>
  </div>
</template>

<style scoped lang="scss">
.theme-switch {
  .el-switch {
    height: fit-content;
    user-select: none;

    &.is-checked {
      --el-switch-on-color: #2c2c2c;
      --el-switch-border-color: #4c4d4f;
    }
  }
}
</style>
