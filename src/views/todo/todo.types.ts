export type ToDoTask = {
  id: number
  text: string
  status: {
    id: number
    alias: string
  }
  isFavourite: boolean
  order: number
}

export type ToDoCategory = {
  id: number
  name: string
  order: number
  tasks: ToDoTask[]
}
