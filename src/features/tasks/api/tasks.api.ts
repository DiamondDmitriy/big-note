import RestClient from '@/shared/api/client/rest.client.ts'
import type { AxiosResponse } from 'axios'
import type CategoryResponse from '@/features/tasks/api/category.response.ts'
import type TaskCategoryRequest from '@/features/tasks/api/task-category.request.ts'
import type {
  TaskChangeStatusRequest,
  TaskCreateRequest,
  TaskUpdateRequest,
} from '@/features/tasks/api/task.request.ts'

export class TasksApi extends RestClient {
  getOne(id: number) {
    return this.http.request({
      method: 'GET',
      url: `/api/v1/task/${id}`,
    })
  }

  getAll(includeTasks?: boolean) {
    const params: { include?: string } = {}

    if (includeTasks) {
      params['include'] = 'tasks'
    }

    return this.http.request({
      method: 'GET',
      url: `/api/v1/tasks/categories`,
      params: params,
    })
  }

  createCategory(categoryRequest: TaskCategoryRequest): Promise<AxiosResponse<CategoryResponse>> {
    return this.http.request({
      method: 'POST',
      url: `/api/v1/tasks/categories`,
      data: categoryRequest,
    })
  }

  deleteCategory(id: number) {
    return this.http.request({
      method: 'DELETE',
      url: `/api/v1/tasks/categories/${id}`,
    })
  }
  updateCategory(id: number, name: string): Promise<AxiosResponse<CategoryResponse>> {
    return this.http.request({
      method: 'PATCH',
      url: `/api/v1/tasks/categories/${id}`,
      data: { name },
    })
  }

  createTask(taskRequest: TaskCreateRequest) {
    return this.http.request({
      method: 'POST',
      url: `/api/v1/tasks`,
      data: taskRequest,
    })
  }

  updateTask(req: TaskUpdateRequest) {
    return this.http.request({
      method: 'PATCH',
      url: `/api/v1/tasks/${req.id}`,
      data: req,
    })
  }

  deleteTask(id: number) {
    return this.http.request({
      method: 'DELETE',
      url: `/api/v1/tasks/${id}`,
    })
  }

  changeStatusTask(req: TaskChangeStatusRequest) {
    return this.http.request({
      method: 'PATCH',
      url: `/api/v1/tasks/${req.id}/status`,
      data: { status: req.status },
    })
  }
}
