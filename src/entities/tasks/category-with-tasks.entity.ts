import TaskEntity from '@/entities/tasks/task.entity.ts'
import CategoryEntity from '@/entities/tasks/category.entity.ts'

export default class CategoryWithTasksEntity extends CategoryEntity {
  constructor(
    id: number,
    name: string,
    createAt: Date,
    updateAt: Date,
    private readonly _tasks: TaskEntity[],
  ) {
    super(id, name, createAt, updateAt)
  }

  get tasks() {
    return [...this._tasks]
  }
}
