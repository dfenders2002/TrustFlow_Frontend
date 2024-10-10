// src/api/taskService.ts

import axios from 'axios';
import {
  CreateTaskRequest,
  TaskResponse,
  TasksResponse,
} from '../domains/Task';

const API_BASE_URL = 'http://localhost:8080';

const taskService = {
  createTask: async (task: CreateTaskRequest): Promise<TaskResponse> => {
    try {
      const response = await axios.post<TaskResponse>(
        `${API_BASE_URL}/tasks`,
        task,
        {
          withCredentials: true,
        },
      );
      return response.data;
    } catch (error: any) {
      return {
        status: 'error',
        message: error.response?.data?.status || 'Failed to create the task.',
      };
    }
  },

  completeTask: async (
    id: number,
  ): Promise<{ status: string; message?: string }> => {
    try {
      const response = await axios.put<{ status: string }>(
        `${API_BASE_URL}/tasks/${id}/complete`,
        {},
        {
          withCredentials: true,
        },
      );
      return response.data;
    } catch (error: any) {
      return {
        status: 'error',
        message: error.response?.data?.status || 'Failed to complete the task.',
      };
    }
  },

  deleteTask: async (
    id: number,
  ): Promise<{ status: string; message?: string }> => {
    try {
      const response = await axios.delete<{ status: string }>(
        `${API_BASE_URL}/tasks/${id}`,
        {
          withCredentials: true,
        },
      );
      return response.data;
    } catch (error: any) {
      return {
        status: 'error',
        message: error.response?.data?.status || 'Failed to delete the task.',
      };
    }
  },

  getPendingTasks: async (): Promise<TasksResponse> => {
    try {
      const response = await axios.get<TasksResponse>(
        `${API_BASE_URL}/tasks/pending`,
        {
          withCredentials: true,
        },
      );
      return response.data;
    } catch (error: any) {
      return {
        status: 'error',
        message:
          error.response?.data?.status || 'Failed to fetch pending tasks.',
      };
    }
  },

  getCompletedTasks: async (): Promise<TasksResponse> => {
    try {
      const response = await axios.get<TasksResponse>(
        `${API_BASE_URL}/tasks/completed`,
        {
          withCredentials: true,
        },
      );
      return response.data;
    } catch (error: any) {
      return {
        status: 'error',
        message:
          error.response?.data?.status || 'Failed to fetch completed tasks.',
      };
    }
  },
};

export default taskService;
