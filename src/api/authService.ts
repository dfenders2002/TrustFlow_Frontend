// src/api/authService.ts

import axios from 'axios';
import {
  User,
  AuthResponse,
  UserRegisterRequest,
  SuccessResponse,
} from '../domains/User';

const API_BASE_URL = 'http://localhost:8080';

const authService = {
  register: async (user: UserRegisterRequest): Promise<AuthResponse> => {
    try {
      const response = await axios.post<SuccessResponse>(
        `${API_BASE_URL}/register`,
        user,
        {
          withCredentials: true,
        },
      );
      return response.data;
    } catch (error: any) {
      return {
        status: 'error',
        message: error.response?.data?.status || 'Registration failed',
      };
    }
  },

  login: async (username: string, password: string): Promise<AuthResponse> => {
    try {
      const response = await axios.post<AuthResponse>(
        `${API_BASE_URL}/login`,
        { username, password },
        {
          withCredentials: true,
        },
      );
      return response.data;
    } catch (error: any) {
      return {
        status: 'error',
        message: error.response?.data?.message || 'Login failed',
      };
    }
  },

  logout: async (): Promise<{ status: string }> => {
    try {
      const response = await axios.post<{ status: string }>(
        `${API_BASE_URL}/logout`,
        {},
        {
          withCredentials: true,
        },
      );
      return response.data;
    } catch (error: any) {
      return { status: 'error' };
    }
  },

  updateUser: async (user: User): Promise<{ status: string }> => {
    try {
      const response = await axios.put<{ status: string }>(
        `${API_BASE_URL}/update`,
        user,
        {
          withCredentials: true,
        },
      );
      return response.data;
    } catch (error: any) {
      return { status: 'error' };
    }
  },

  deleteUser: async (): Promise<{ status: string }> => {
    try {
      const response = await axios.delete<{ status: string }>(
        `${API_BASE_URL}/delete`,
        {
          withCredentials: true,
        },
      );
      return response.data;
    } catch (error: any) {
      return { status: 'error' };
    }
  },
};

export default authService;
