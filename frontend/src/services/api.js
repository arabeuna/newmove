import axios from 'axios';

/** @type {import('axios').AxiosInstance} */
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

/** @type {(config: import('axios').AxiosRequestConfig) => import('axios').AxiosRequestConfig} */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Melhor tratamento de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Verificar se é um erro de rede
    if (!error.response) {
      console.error('Erro de rede:', error.message);
      return Promise.reject(new Error('Erro de conexão. Verifique sua internet.'));
    }

    // Erro de autenticação
    if (error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login/passenger';
      return Promise.reject(new Error('Sessão expirada. Por favor, faça login novamente.'));
    }

    // Outros erros
    const errorMessage = error.response.data?.error || 'Ocorreu um erro inesperado';
    return Promise.reject(new Error(errorMessage));
  }
);

export default api; 