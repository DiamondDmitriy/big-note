import CategoryEntity from '@/entities/tasks/category.entity.ts'
import type { AxiosResponse } from 'axios'
import type CategoryResponse from '@/features/tasks/api/category.response.ts'
import { TasksApi } from '@/features/tasks/api/tasks.api.ts'
import type CategoryWithTasksResponse from '@/features/tasks/api/category-with-tasks.response.ts'
import CategoryWithTasksEntity from '@/entities/tasks/category-with-tasks.entity.ts'
import type CategoryType from '@/features/domain/types/tasks/category.type.ts'
// import type TaskEntity from '@/domain/entity/tasks/task.entity.ts'

export default class TodoService {
  private api = new TasksApi()

  async createCategory(name: string): Promise<CategoryEntity> {
    return this.api.createCategory({ name }).then((response: AxiosResponse<CategoryResponse>) => {
      return new CategoryEntity(
        response.data.id,
        response.data.name,
        response.data.createdAt,
        response.data.updatedAt,
      )
    })
  }
  async getCategoryWithTasks(): Promise<CategoryWithTasksEntity[]> {
    return this.api.getAll(true).then((response: AxiosResponse<CategoryWithTasksResponse[]>) => {
      const categories: CategoryWithTasksEntity[] = []
      response.data.map((category) => {
        categories.push(
          new CategoryWithTasksEntity(
            category.id,
            category.name,
            category.createdAt,
            category.updatedAt,
            category.tasks,
          ),
        )
      })
      return categories
    })
  }
  async deleteCategory(id: number): Promise<AxiosResponse<void>> {
    return this.api.deleteCategory(id)
  }
  async updateCategory(id: number, name: string): Promise<CategoryType> {
    return this.api.updateCategory(id, name).then((response: AxiosResponse<CategoryResponse>) => {
      return {
        id: response.data.id,
        name: response.data.name,
        createdAt: response.data.createdAt,
        updatedAt: response.data.updatedAt,
      }
    })
  }
  async createTask(text: string): Promise<AxiosResponse<void>> {
    return this.api.createTask({ text: text })
  }
  async updateTask(id: number, text: string): Promise<AxiosResponse<void>> {
    return this.api.updateTask({ id: id, text: text })
  }
  async deleteTask(id: number): Promise<AxiosResponse<void>> {
    return this.api.deleteTask(id)
  }
  async changeStatusTask(id: number, status: boolean): Promise<AxiosResponse<void>> {
    return this.api.changeStatusTask({ id, status })
  }
}
