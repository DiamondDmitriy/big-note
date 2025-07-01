// export const StatusLisk

// datetimeCreate: {
//   date: '23.12.2025',
//   time: '15:32:45',
// },
// datetimeChange: {
//   date: '23.12.2025',
//   time: '15:32:45',
// },

import type { ToDoCategory, ToDoTask } from '@/views/todo/todo.types.ts'

export const TasksItems: ToDoTask[] = [
  {
    id: 1,
    text: 'Сделать что-то 1',
    status: {
      id: 1,
      alias: 'in-work',
    },
    isFavourite: false,
    order: 1,
  },
  {
    id: 2,
    text: 'Сделать что-то 2',
    status: {
      id: 2,
      alias: 'done',
    },
    isFavourite: false,
    order: 1,
  },
  {
    id: 3,
    text: 'Сделать что-то 3',
    status: {
      id: 1,
      alias: 'in-work',
    },
    isFavourite: false,
    order: 1,
  },
  {
    id: 4,
    text: 'Сделать что-то 4',
    status: {
      id: 1,
      alias: 'in-work',
    },
    isFavourite: false,
    order: 1,
  },
  {
    id: 5,
    text: 'Сделать что-то 5',
    status: {
      id: 2,
      alias: 'done',
    },
    isFavourite: false,
    order: 1,
  },
]

export const CategoriesItems: ToDoCategory[] = [
  {
    id: 0,
    name: 'Категория 1',
    order: 1,
    tasks: TasksItems,
  },
  {
    id: 2,
    name: 'Категория 3',
    order: 2,
    tasks: TasksItems,
  },
  {
    id: 1,
    name: 'Категория 2',
    order: 3,
    tasks: TasksItems,
  },
]
