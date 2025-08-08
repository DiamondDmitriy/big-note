import container from '@/di.ts'
import RestController from '@/core/http/RestController.ts'

export const TASKS_SERVICE_ID = Symbol('TASKS_SERVICE_ID')

export class TasksController extends RestController {
  getOne(id: number) {
    return this.http.request({
      method: 'GET',
      url: `/api/task/${id}`,
    })
  }

  getAll() {
    return this.http.request({
      method: 'GET',
      url: `/api/tasks`,
    })
  }
}

container.bind<TasksController>(TASKS_SERVICE_ID).to(TasksController)
