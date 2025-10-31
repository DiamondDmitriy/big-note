<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ToDoCategories from '@/pages/tasks/ui/components/ToDoCategories.vue'
import { useTaskStore } from '@/features/tasks/model/stores/task.store.ts'
import type { CategoryWithTasksType } from '@/features/domain/types/tasks/category-with-tasks.type.ts'
import BaseContainer from '@/shared/components/BaseContainer.vue'
import AddToDoTaskRow from '@/pages/tasks/ui/components/AddToDoTaskRow.vue'
import type TaskType from '@/features/domain/types/tasks/task.type.ts'

const taskStore = useTaskStore()
const activeCategory = ref<CategoryWithTasksType | null>(null)
const loading = ref(false)

function createTask(task: TaskType) {
  activeCategory.value.tasks.unshift(task)
  taskStore
    .createTask(task.text)
    .then()
    .catch((e) => {
      console.error(e)
    })
}

onMounted(async () => {
  loading.value = true
  await taskStore.fetchCategoriesWithTasks()
  loading.value = false
})
</script>

<template>
  <div class="to-do-view">
    <ToDoCategories
      :categories="taskStore.categoriesWithTasks"
      @selected-category="(category: CategoryWithTasksType) => (activeCategory = category)"
    />
    <BaseContainer class="to-do-view-tasks" :empty="!activeCategory?.tasks.length">
      <h2 class="to-do-view-tasks__title">{{ activeCategory?.name }}</h2>
      <ul class="to-do-view-tasks__items">
        <li
          class="to-do-view-tasks__item to-do-view-tasks-item"
          v-for="task in activeCategory?.tasks"
          :key="task.id"
        >
          <ElCheckbox value="Value 1" class="to-do-view-tasks-item__checkbox" />
          <p class="to-do-view-tasks-item__text">{{ task.text }}</p>
        </li>
      </ul>
      <template #always>
        <AddToDoTaskRow v-if="activeCategory" @add-task="createTask" />
      </template>
    </BaseContainer>
  </div>
</template>

<style scoped lang="scss">
.to-do-view {
  display: flex;
  height: 100%;

  --category-bg-color: white;
  --tasks-bg-color: white;

  &-tasks {
    &__title {
      margin-bottom: 30px;
    }

    &__items {
      list-style: none;
      padding: 0;
    }

    &-item {
      display: flex;
      align-items: center;
    }
  }
}
</style>
