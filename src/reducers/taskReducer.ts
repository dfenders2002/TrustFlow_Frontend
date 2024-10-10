// src/reducers/taskReducer.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status, Task } from '../domains/Task';
import {
  fetchPendingTasks,
  fetchCompletedTasks,
  createTask,
  completeTask,
  deleteTask,
} from '../actions/taskActions';

interface TaskState {
  pending: Task[];
  completed: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  pending: [],
  completed: [],
  loading: false,
  error: null,
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    resetTaskError(state) {
      state.error = null;
    },
  },
  extraReducers: builder => {
    // Fetch Pending Tasks
    builder
      .addCase(fetchPendingTasks.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchPendingTasks.fulfilled,
        (state, action: PayloadAction<Task[]>) => {
          state.loading = false;
          state.pending = action.payload;
        }
      )
      .addCase(fetchPendingTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch Completed Tasks
      .addCase(fetchCompletedTasks.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCompletedTasks.fulfilled,
        (state, action: PayloadAction<Task[]>) => {
          state.loading = false;
          state.completed = action.payload;
        }
      )
      .addCase(fetchCompletedTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Create Task
      .addCase(createTask.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.loading = false;
        state.pending.push(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Complete Task
      .addCase(completeTask.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        completeTask.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.loading = false;
          const taskIndex = state.pending.findIndex(
            task => task.id === action.payload
          );
          if (taskIndex !== -1) {
            const [completedTask] = state.pending.splice(taskIndex, 1);
            completedTask.status = Status.COMPLETED;
            state.completed.push(completedTask);
          }
        }
      )
      .addCase(completeTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Delete Task
      .addCase(deleteTask.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.pending = state.pending.filter(
          task => task.id !== action.payload
        );
        state.completed = state.completed.filter(
          task => task.id !== action.payload
        );
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetTaskError } = taskSlice.actions;
export default taskSlice.reducer;
