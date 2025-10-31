export interface CategoryResponse {
  id: number
  name: string
  createdAt: Date,
  updatedAt: Date,
}

export interface CategoryWithTasksResponse extends CategoryResponse{
  tasks: []
}
