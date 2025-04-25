import { AxiosRequestConfig } from 'axios';

interface User {
  _id: string;
  name: string;
  phone: string;
  email: string;
  userType: 'passenger' | 'driver';
}

interface AuthResponse {
  token: string;
  user: User;
}

interface ApiConfig extends AxiosRequestConfig {
  headers: {
    Authorization?: string;
    'Content-Type': string;
  };
} 