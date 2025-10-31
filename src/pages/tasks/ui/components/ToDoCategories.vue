<script setup lang="ts">
import { Check, Close, CloseBold, EditPen, Plus, Search } from '@element-plus/icons-vue'
import { nextTick, ref } from 'vue'
import { useTaskStore } from '@/features/tasks/model/stores/task.store.ts'
import type { CategoryWithTasksType } from '@/features/domain/types/tasks/category-with-tasks.type.ts'

defineProps<{
  categories: CategoryWithTasksType[]
}>()

const emit = defineEmits<{
  (e: 'selected-category', value: CategoryWithTasksType): void
}>()

const taskStore = useTaskStore()
const searchValue = ref('')
const showAddCategoryInput = ref(false)
const newCategoryName = ref('')
const inputCategoryRef = ref()
const editingCategoryId = ref<number | null>(null)

function selectTarget(category: CategoryWithTasksType) {
  emit('selected-category', category)
}

async function createCategory() {
  await taskStore.createCategory(newCategoryName.value.trim())
  closeCreateCategory()
}

function goToCreateCategory() {
  showAddCategoryInput.value = true
  nextTick(() => {
    inputCategoryRef.value.ref.focus()
  })
}
function closeCreateCategory() {
  showAddCategoryInput.value = false
  newCategoryName.value = ''
}

function deleteCategory(id: number) {
  taskStore.deleteCategory(id)
}

function goToEditCategory(id: number) {
  editingCategoryId.value = id
}

async function editCategory(category: CategoryWithTasksType) {
  await taskStore.updateCategory(category.id, category.name)
  editingCategoryId.value = null
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
    <ElButton :icon="Plus" class="btn-add-category" size="large" @click="goToCreateCategory">
      Добавить категорию
    </ElButton>
    <div class="to-do-categories__add" v-show="showAddCategoryInput">
      <ElInput
        ref="inputCategoryRef"
        v-model="newCategoryName"
        placeholder="Введите название категории"
        @keydown.enter="createCategory"
      />
      <!--      <ElButton :icon="Select" @click="createCategory" size="small" />-->
      <ElButton :icon="CloseBold" @click="closeCreateCategory" />
    </div>
    <ul class="to-do-categories__items" v-if="categories.length">
      <li
        class="to-do-categories__item"
        v-for="category in categories"
        :key="category.id"
        @click="selectTarget(category)"
      >
        <div class="" v-if="editingCategoryId === category.id">
          <ElInput v-model="category.name">
            <template #suffix>
              <ElIcon>
                <Check @click="editCategory(category)" />
              </ElIcon>
              <ElIcon>
                <Close @click="editingCategoryId = null" />
              </ElIcon>
            </template>
          </ElInput>
        </div>
        <div class="" v-else>
          {{ category.name }}
          <ElIcon>
            <EditPen @click="goToEditCategory(category.id)" />
          </ElIcon>
          <ElIcon>
            <Close @click="deleteCategory(category.id)" />
          </ElIcon>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.to-do-categories {
  width: 300px;
  min-width: 300px;
  background-color: var(--base-fill);
  position: relative;
  padding: 20px 14px;

  &__search {
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
    margin-top: 14px;
    transition: all 0.3s;

    &:hover {
      border: 1px solid red;
    }
  }

  &__add {
    margin-top: 14px;
    display: flex;
    gap: 6px;
  }

  .btn-add-category {
    width: 100%;
  }
}
</style>
