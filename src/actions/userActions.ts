import { createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../api/authService';
import { UserLoginRequest, UserRegisterRequest, User } from '../domains/User';

export const loginUser = createAsyncThunk(
  'user/login',
  async (userData: UserLoginRequest, thunkAPI) => {
    const response = await authService.login(userData);
    if (response.status === 'Logged in' && response.user) {
      return response.user;
    } else {
      return thunkAPI.rejectWithValue(response.message || 'Login failed');
    }
  },
);

export const registerUser = createAsyncThunk(
  'user/register',
  async (userData: UserRegisterRequest, thunkAPI) => {
    const response = await authService.register(userData);
    if (response.status === 'User registered' && response.user) {
      return response.user;
    } else {
      return thunkAPI.rejectWithValue(
        response.message || 'Registration failed',
      );
    }
  },
);

export const logoutUser = createAsyncThunk('user/logout', async () => {
  await authService.logout();
});

export const fetchCurrentUser = createAsyncThunk(
  'user/fetchCurrent',
  async (_, thunkAPI) => {
    const response = await authService.getUser();
    if (response.status === 'success' && response.user) {
      return response.user;
    } else {
      return thunkAPI.rejectWithValue('Failed to fetch user');
    }
  },
);

export const updateUser = createAsyncThunk(
  'user/update',
  async (userData: User, thunkAPI) => {
    const response = await authService.updateUser(userData);
    if (response.status === 'User updated') {
      return userData;
    } else {
      return thunkAPI.rejectWithValue('Update failed');
    }
  },
);

export const deleteUser = createAsyncThunk(
  'user/delete',
  async (_, thunkAPI) => {
    const response = await authService.deleteUser();
    if (response.status === 'User deleted') {
      return true;
    } else {
      return thunkAPI.rejectWithValue('Deletion failed');
    }
  },
);
