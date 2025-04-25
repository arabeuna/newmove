import axios, { AxiosError, AxiosResponse } from 'axios';
import { ApiConfig, AuthResponse } from '../types/api';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
} as ApiConfig);

api.interceptors.request.use((config: ApiConfig) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (!error.response) {
      console.error('Erro de rede:', error.message);
      return Promise.reject(new Error('Erro de conexão. Verifique sua internet.'));
    }

    if (error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login/passenger';
      return Promise.reject(new Error('Sessão expirada. Por favor, faça login novamente.'));
    }

    const errorMessage = error.response.data?.error || 'Ocorreu um erro inesperado';
    return Promise.reject(new Error(errorMessage));
  }
);

export default api; 