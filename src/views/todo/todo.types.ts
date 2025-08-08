export type ToDoTask = {
  id: number
  text: string
  isDone: boolean
  isFavourite: boolean
}

export type ToDoCategory = {
  id: number
  name: string
  isFocused?: boolean
  tasks: ToDoTask[]
}
