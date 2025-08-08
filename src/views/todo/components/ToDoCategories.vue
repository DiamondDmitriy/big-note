<script setup lang="ts">
import { Plus, Search } from '@element-plus/icons-vue'
import { ref } from 'vue'
import type { ToDoCategory, ToDoTask } from '@/views/todo/todo.types.ts'

defineProps<{
  categories: ToDoCategory[]
}>()

const emit = defineEmits<{
  (e: 'selected-category', value: ToDoCategory): void
  (e: 'add-category', value: ToDoCategory): void
}>()

const searchValue = ref('')

function selectTarget(category: ToDoCategory) {
  emit('selected-category', category)
}

function addCategory() {
  emit('add-category', {
    id: 0,
    name: 'Список без названия',
    isFocused: true,
    tasks: [],
  })
}
</script>

<template>
  <div class="to-do-categories">
    <div class="to-do-categories__search">
      <ElInput v-model="searchValue" placeholder="Поиск" clearable>
        <template #prefix>
          <ElIcon class="el-input__icon">
            <Search />
          </ElIcon>
        </template>
      </ElInput>
    </div>
    <ul class="to-do-categories__items" v-if="categories.length">
      <li
        class="to-do-categories__item"
        v-for="category in categories"
        :key="category.id"
        @click="selectTarget(category)"
      >
        <template v-if="!category.isFocused">
          {{ category.name }}
        </template>
        <template v-else>
          <ElInput v-model="category.name" />
        </template>
      </li>
    </ul>
    <ElButton :icon="Plus" class="btn-add-category" size="large" @click="addCategory">
      Добавить категорию
    </ElButton>
  </div>
</template>

<style scoped lang="scss">
.to-do-categories {
  width: 300px;
  min-width: 300px;
  background-color: var(--base-fill);
  position: relative;

  &__search {
    padding: 20px 14px 0 14px;
    margin-bottom: 20px;
  }

  &__items {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
  }

  &__item {
    cursor: pointer;
    border: 1px solid transparent;
    //border-radius: 4px;
    padding: 8px 14px;
    transition: all 0.3s;

    &:hover {
      border: 1px solid red;
      //background-color: var(--color-brand-6);
    }
  }

  .btn-add-category {
    position: absolute;
    bottom: 20px;
    width: calc(100% - 24px);
    margin-left: 14px;
  }
}
</style>
