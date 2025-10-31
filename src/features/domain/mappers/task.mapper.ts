// import type CategoryEntity from '@/domain/entity/tasks/category.entity.ts'
// import type CategoryType from '@/domain/types/tasks/category.type.ts'
// import type TaskEntity from '@/domain/entity/tasks/task.entity.ts'
// import type TaskType from '@/domain/types/tasks/task.type.ts'
import type { CategoryWithTasksType } from '@/features/domain/types/tasks/category-with-tasks.type.ts'
import type CategoryWithTasksEntity from '@/entities/tasks/category-with-tasks.entity.ts'

// export function taskModelFromEntity(entity: TaskEntity): TaskType {
//   return {
//     id: entity.getId(),
//     text: entity.getText(),
//   }
// }
//
// export function categoryModelFromEntity(categoryEntity: CategoryEntity): CategoryType {
//   return {
//     id: categoryEntity.getId(),
//     name: categoryEntity.getName(),
//   }
// }

// export function tasksByCategoriesModelFromEntity(
//   categoryEntity: CategoryEntity,
// ): CategoryWithTasksType {
//   return {
//     id: categoryEntity.getId(),
//     name: categoryEntity.getName(),
//     tasks: categoryEntity.getTasks().map((task) => taskModelFromEntity(task)),
//   }
// }

export function toCategoryWithTasksType (entity: CategoryWithTasksEntity): CategoryWithTasksType {
  return {
    id: entity.id,
    name: entity.name,
    createdAt: entity.createAt,
    updatedAt: entity.updateAt,
    tasks: entity.tasks,
  }
}
