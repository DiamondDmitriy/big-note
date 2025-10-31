export interface TaskCategoryRequest {
  name: string
}

export interface TaskCreateRequest {
  text: string;
}

export interface TaskUpdateRequest {
  id: number;
  text: string;
}

export interface TaskChangeStatusRequest {
  id: number;
  status: boolean;
}
