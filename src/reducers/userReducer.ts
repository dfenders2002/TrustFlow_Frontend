// src/reducers/userReducer.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  loginUser,
  registerUser,
  logoutUser,
  fetchCurrentUser,
  updateUser,
  deleteUser,
} from '../actions/userActions';
import { User } from '../domains/User';

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetError(state) {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      // Handle login
      .addCase(loginUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Handle registration
      .addCase(registerUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Handle logout
      .addCase(logoutUser.fulfilled, state => {
        state.user = null;
      })
      // Handle fetching current user
      .addCase(
        fetchCurrentUser.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.user = action.payload;
        }
      )
      .addCase(fetchCurrentUser.rejected, state => {
        state.user = null;
      })
      // Handle updating user
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
        if (state.user) {
          state.user = action.payload;
        }
      })
      // Handle deleting user
      .addCase(deleteUser.fulfilled, state => {
        state.user = null;
      });
  },
});

export const { resetError } = userSlice.actions;
export default userSlice.reducer;
