<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue'
import { onMounted, ref } from 'vue'
import { CategoriesItems } from '@/views/todo/TestData.ts'
import type { ToDoCategory } from '@/views/todo/todo.types.ts'
import EmptyContent from '@/components/EmptyContent.vue'

const targetCategory = ref<ToDoCategory | null>(null)
const categories = ref<ToDoCategory[]>(CategoriesItems)

function selectTarget(category: ToDoCategory) {
  targetCategory.value = category
}

onMounted(() => {})
</script>

<template>
  <div class="to-do-view">
    <div class="to-do-view-categories">
      <ul class="to-do-view-categories__items" v-if="categories.length">
        <li
          class="to-do-view-categories__item"
          v-for="category in categories"
          :key="category.id"
          @click="selectTarget(category)"
        >
          {{ category.name }}
        </li>
      </ul>
      <el-button style="width: 100%" :icon="Plus">Добавить категорию</el-button>
    </div>
    <div class="to-do-view-tasks">
      <EmptyContent text="test" v-if="!targetCategory?.tasks.length" />

      <template v-else>
        <h2 class="title">{{ targetCategory.name }}</h2>
        <ul class="to-do-view-tasks__items">
          <li class="to-do-view-tasks__item" v-for="task in targetCategory.tasks" :key="task.id">
            {{ task.text }}
          </li>
        </ul>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
.to-do-view {
  display: flex;
  height: 100%;
  gap: var(--container-padding);

  --category-bg-color: white;
  --tasks-bg-color: white;

  &-categories {
    width: 300px;
    background-color: var(--lighter-fill);
    //padding: var(--container-offset);

    &__items {
      list-style: none;
      padding: 0;
    }

    &__item {
    }
  }

  &-tasks {
    width: 100%;
    padding: var(--container-offset);
    //background-color: var(--tasks-bg-color);

    &__items {
      list-style: none;
      padding: 0;
    }

    &__item {
    }
  }
}
</style>
