// src/domains/User.ts

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export interface User {
  id?: number;
  username: string;
  password: string;
  email: string;
  role: Role;
}

export interface AuthResponse {
  status: string;
  user?: User;
  message?: string;
}

export interface UserRegisterRequest {
  username: string;
  password: string;
  email: string;
}

export interface UserLoginRequest {
  username: string;
  password: string;
}

export interface SuccessResponse {
  status: string;
  user: User;
}
