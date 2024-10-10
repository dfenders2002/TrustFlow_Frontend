export enum Priority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export enum Status {
  COMPLETED = 'COMPLETED',
  PENDING = 'PENDING',
}

export interface Task {
  id: number;
  userId: number;
  description: string;
  priority: Priority;
  status: Status;
}

export interface CreateTaskRequest {
  description: string;
  priority: Priority;
}

export interface TaskResponse {
  status: string;
  task?: Task;
  message?: string;
}

export interface TasksResponse {
  status: string;
  message?: string;
  tasks?: Task[];
}
