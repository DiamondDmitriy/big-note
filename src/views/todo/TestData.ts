import type { ToDoCategory, ToDoTask } from '@/views/todo/todo.types.ts'

export const TasksItems: ToDoTask[] = [
  {
    id: 1,
    text: 'Сделать что-то 1',
    isDone: false,
    isFavourite: false,
  },
  {
    id: 2,
    text: 'Сделать что-то 2',
    isDone: false,
    isFavourite: false,
  },
  {
    id: 3,
    text: 'Сделать что-то 3',
    isDone: false,
    isFavourite: false,
  },
  {
    id: 4,
    text: 'Сделать что-то 4',
    isDone: false,
    isFavourite: false,
  },
  {
    id: 5,
    text: 'Сделать что-то 5',
    isDone: false,
    isFavourite: false,
  },
]

export const CategoriesItems: ToDoCategory[] = [
  {
    id: 0,
    name: 'Категория 1',
    order: 1,
    tasks: TasksItems,
  },
]
