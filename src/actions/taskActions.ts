// src/actions/taskActions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import taskService from '../api/taskService';
import { CreateTaskRequest } from '../domains/Task';

// Fetch Pending Tasks
export const fetchPendingTasks = createAsyncThunk(
  'tasks/fetchPending',
  async (_, thunkAPI) => {
    const response = await taskService.getPendingTasks();
    if (response.status === 'success' && response.tasks) {
      return response.tasks;
    } else {
      return thunkAPI.rejectWithValue(
        response.message || 'Failed to fetch pending tasks'
      );
    }
  }
);

// Fetch Completed Tasks
export const fetchCompletedTasks = createAsyncThunk(
  'tasks/fetchCompleted',
  async (_, thunkAPI) => {
    const response = await taskService.getCompletedTasks();
    if (response.status === 'success' && response.tasks) {
      return response.tasks;
    } else {
      return thunkAPI.rejectWithValue(
        response.message || 'Failed to fetch completed tasks'
      );
    }
  }
);

// Create Task
export const createTask = createAsyncThunk(
  'tasks/create',
  async (taskData: CreateTaskRequest, thunkAPI) => {
    const response = await taskService.createTask(taskData);
    if (response.status === 'Task created' && response.task) {
      return response.task;
    } else {
      return thunkAPI.rejectWithValue(
        response.message || 'Failed to create task'
      );
    }
  }
);

// Complete Task
export const completeTask = createAsyncThunk(
  'tasks/complete',
  async (id: number, thunkAPI) => {
    const response = await taskService.completeTask(id);
    if (response.status === 'Task completed') {
      return id;
    } else {
      return thunkAPI.rejectWithValue(
        response.message || 'Failed to complete task'
      );
    }
  }
);

// Delete Task
export const deleteTask = createAsyncThunk(
  'tasks/delete',
  async (id: number, thunkAPI) => {
    const response = await taskService.deleteTask(id);
    if (response.status === 'Task deleted') {
      return id;
    } else {
      return thunkAPI.rejectWithValue(
        response.message || 'Failed to delete task'
      );
    }
  }
);
