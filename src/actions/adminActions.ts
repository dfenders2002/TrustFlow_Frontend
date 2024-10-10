import { createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../api/authService';
import { User } from '../domains/User';

// Actie om alle gebruikers op te halen
export const fetchAllUsers = createAsyncThunk(
  'admin/fetchAllUsers',
  async (_, thunkAPI) => {
    const response = await authService.getAllUsers();
    if (response.status === 'success' && response.users) {
      return response.users;
    } else {
      return thunkAPI.rejectWithValue(
        response.message || 'Failed to fetch users',
      );
    }
  },
);

// Actie om een andere gebruiker te verwijderen
export const deleteUserById = createAsyncThunk(
  'admin/deleteUserById',
  async (id: number, thunkAPI) => {
    const response = await authService.deleteOtherUser(id);
    if (response.status === 'User deleted') {
      return id;
    } else {
      return thunkAPI.rejectWithValue(
        response.message || 'Failed to delete user',
      );
    }
  },
);
