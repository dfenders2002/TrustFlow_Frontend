import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../domains/User';
import { fetchAllUsers, deleteUserById } from '../actions/adminActions';

interface AdminState {
  allUsers: User[];
  loading: boolean;
  error: string | null;
}

const initialState: AdminState = {
  allUsers: [],
  loading: false,
  error: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    resetAdminError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchAllUsers
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAllUsers.fulfilled,
        (state, action: PayloadAction<User[]>) => {
          state.loading = false;
          state.allUsers = action.payload;
        },
      )
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Handle deleteUserById
      .addCase(deleteUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteUserById.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.loading = false;
          state.allUsers = state.allUsers.filter(
            (user) => user.id !== action.payload,
          );
        },
      )
      .addCase(deleteUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetAdminError } = adminSlice.actions;
export default adminSlice.reducer;
