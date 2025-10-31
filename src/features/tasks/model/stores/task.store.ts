import { defineStore } from 'pinia'
import TodoService from '@/shared/api/services/todo.service.ts'
import { toCategoryWithTasksType } from '@/features/domain/mappers/task.mapper.ts'
import type { CategoryWithTasksType } from '@/features/domain/types/tasks/category-with-tasks.type.ts'
import CategoryWithTasksEntity from '@/entities/tasks/category-with-tasks.entity.ts'

const service = new TodoService()

type TaskState = {
  categoriesWithTasks: CategoryWithTasksType[]
}

export const useTaskStore = defineStore('task', {
  state(): TaskState {
    return {
      categoriesWithTasks: [],
    }
  },
  actions: {
    async fetchCategoriesWithTasks() {
      service.getCategoryWithTasks().then((entities) => {
        this.categoriesWithTasks = []
        entities.map((entity) => {
          this.categoriesWithTasks.push(toCategoryWithTasksType(entity))
        })
      })
    },
    async createCategory(name: string) {
      service.createCategory(name).then((entity) => {
        const entityWithTasks = new CategoryWithTasksEntity(
          entity.id,
          entity.name,
          entity.createAt,
          entity.updateAt,
          [],
        )
        this.categoriesWithTasks.push(toCategoryWithTasksType(entityWithTasks))
      })
    },
    async deleteCategory(id: number) {
      await service.deleteCategory(id).then(() => {
        this.categoriesWithTasks = this.categoriesWithTasks.filter((el) => el.id !== id)
      })
    },
    async updateCategory(id: number, name: string) {
      await service.updateCategory(id, name).then((newCategory) => {
        const category = this.categoriesWithTasks.find((el) => el.id === id)
        console.log(category)
        console.log(newCategory)
        // category.id = newCategory.id
      })
    },
    async createTask(text: string) {
      return service.createTask(text)
    },
    async updateTask(id: number, text: string) {
      return service.updateTask(id, text)
    },
    async deleteTask(id: number) {
      return service.deleteTask(id)
    },
    async changeStatusTask(id: number, status: boolean) {
      return service.changeStatusTask(id, status)
    },
  },
})
