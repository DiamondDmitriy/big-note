<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue'
import { nextTick, ref } from 'vue'
import type { ToDoTask } from '@/views/todo/todo.types.ts'

const emit = defineEmits<{
  (e: 'add-task', payload: ToDoTask): void
}>()

const inputValue = ref()
const inputRef = ref()
const inputFocused = ref(false)

async function focusingInput() {
  inputFocused.value = true
  await nextTick()
  inputRef.value.ref.focus()
}

function addTask() {
  if (!inputValue.value) {
    return
  }
  emit('add-task', {
    id: 0,
    text: inputValue.value,
    isDone: false,
    isFavourite: false,
  } as ToDoTask)
  inputValue.value = ''
}

function clickOutside() {
  inputFocused.value = false
}
</script>

<template>
  <div class="add-to-do-task-row" @click.stop="focusingInput" v-click-away="clickOutside">
    <div class="add-to-do-task-row__content">
      <template v-if="!inputFocused">
        <ElIcon size="20">
          <Plus />
        </ElIcon>

        <p class="add-to-do-task-row__text">Добавить задачу</p>
      </template>
      <template v-else>
        <i class="check-icon" />
        <ElInput
          v-model="inputValue"
          placeholder="Начни вводить тут"
          ref="inputRef"
          style="width: 100%"
          @keydown.enter="addTask"
        />
        <ElButton @click="addTask">Добавить</ElButton>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
.add-to-do-task-row {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  position: absolute;
  bottom: 50px;
  left: 0;
  right: 0;
  border: 1px solid var(--base-border);
  height: 54px;
  margin: 0 var(--site-content-offset-horizon);
  border-radius: 6px;
  cursor: text;
  color: var(--regular-text);

  &__content {
    display: flex;
    align-items: center;
    gap: 16px;
    width: 100%;
  }

  .check-icon {
    height: 24px;
    width: 24px;
    min-width: 24px;
    border: 2px solid var(--base-border);
    border-radius: 50%;
  }
}
</style>
