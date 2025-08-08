<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { CategoriesItems } from '@/views/todo/TestData.ts'
import type { ToDoCategory } from '@/views/todo/todo.types.ts'
import BaseContainer from '@/components/site/BaseContainer.vue'
import AddToDoTaskRow from '@/views/todo/components/AddToDoTaskRow.vue'
import ToDoCategories from '@/views/todo/components/ToDoCategories.vue'
// import { TASKS_SERVICE_ID, TasksController } from '@/core/http/controllers/Tasks.controller'
// import container from '@/di.ts'

// const tasksController = container.get<TasksController>(TASKS_SERVICE_ID)
const categories = ref<ToDoCategory[]>(CategoriesItems)
const targetCategory = ref<ToDoCategory | null>(null)
const loading = ref(false)

onMounted(async () => {
  loading.value = true
  // tasksController
  //   .getAll()
  //   .then(({ data }) => {
  //     console.log(data)
  //   })
  //   .catch((err) => {
  //     console.error(err)
  //   })
  loading.value = false
})
</script>

<template>
  <div class="to-do-view">
    <ToDoCategories
      :categories="categories"
      @selected-category="(category: ToDoCategory) => (targetCategory = category)"
      @add-category="(category: ToDoCategory) => categories.push(category)"
    />

    <BaseContainer class="to-do-view-tasks" :empty="!targetCategory?.tasks.length">
      <h2 class="to-do-view-tasks__title">{{ targetCategory?.name }}</h2>
      <ul class="to-do-view-tasks__items">
        <li
          class="to-do-view-tasks__item to-do-view-tasks-item"
          v-for="task in targetCategory?.tasks"
          :key="task.id"
        >
          <el-checkbox value="Value 1" class="to-do-view-tasks-item__checkbox" />
          <p class="to-do-view-tasks-item__text">{{ task.text }}</p>
          <!--          <div class="to-do-view-tasks-item__favorite"></div>-->
          <!--          <el-rate v-model="value" size="large" :max="1" />-->
        </li>
      </ul>
      <template #always>
        <!--        targetCategory-->
        <AddToDoTaskRow
          v-if="targetCategory"
          @add-task="(item) => targetCategory.tasks.unshift(item)"
        />
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
