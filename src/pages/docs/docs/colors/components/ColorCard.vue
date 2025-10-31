<script setup lang="ts">
defineProps({
  colorVar: String,
})
</script>

<template>
  <div class="color-card" :style="{ backgroundColor: `var(${colorVar})` }">
    <h4 class="title">{{ colorVar }}</h4>
    <!--    <span class="color">{{ colorVar }}</span>-->
  </div>
</template>

<style scoped lang="scss">
.color-card {
  border-radius: 4px;
  padding: 20px;
  font-size: 14px;
  border: 1px solid;
  width: 200px;
  height: 80px;

  .color {
    margin-top: 2px;
  }
}
</style>
