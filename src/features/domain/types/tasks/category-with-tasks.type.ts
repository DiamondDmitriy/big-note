import type TaskType from '@/features/domain/types/tasks/task.type.ts'
import type CategoryType from '@/features/domain/types/tasks/category.type.ts'

export type CategoryWithTasksType = CategoryType & {
  tasks: TaskType[]
}
