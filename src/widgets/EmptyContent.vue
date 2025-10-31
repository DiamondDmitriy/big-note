<script setup lang="ts">
defineProps<{
  text: string
  center: boolean
}>()
import hedgehogEmpty from '@/shared/assets/images/hedgehog-empty.png'
</script>

<template>
  <div :class="['empty-content', { 'empty-content--center': center }]">
    <img class="empty-content__image" :src="hedgehogEmpty" alt="empty-content" width="450px" />
    <p class="empty-content__text">{{ text }}</p>
  </div>
</template>

<style scoped lang="scss">
.empty-content {
  display: flex;
  width: fit-content;
  text-align: center;
  flex-direction: column;
  gap: 30px;

  &--center {
    justify-self: center;
    margin-top: 200px;
  }
}
</style>
