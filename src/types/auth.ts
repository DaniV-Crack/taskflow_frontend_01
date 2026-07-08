export interface User {
  id: string;
  name: string;
  email: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResult {
  token: string;
  user: User;
}

export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
  timestamp: string;
}
