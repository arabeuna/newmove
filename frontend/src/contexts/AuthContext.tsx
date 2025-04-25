import React, { createContext, useContext, useState, useCallback } from 'react';
import api from '../services/api';
import { User, AuthResponse } from '../types/api';

interface AuthContextData {
  user: User | null;
  loading: boolean;
  login: (phone: string, userType: string, password: string) => Promise<User>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error('Erro ao carregar usuário:', error);
      return null;
    }
  });

  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(() => localStorage.getItem('token'));

  const login = useCallback(async (phone: string, userType: string, password: string): Promise<User> => {
    if (!phone || !userType || !password) {
      throw new Error('Dados de login incompletos');
    }

    try {
      setLoading(true);
      const response = await api.post<AuthResponse>('/auth/login', {
        phone,
        userType,
        password
      });

      const { token, user } = response.data;

      if (!token || !user) {
        throw new Error('Resposta inválida do servidor');
      }

      api.defaults.headers.common.Authorization = `Bearer ${token}`;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      setUser(user);
      setToken(token);

      return user;
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    api.defaults.headers.common.Authorization = '';
    window.location.href = '/login/passenger';
  }, []);

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loading, 
        login, 
        logout, 
        isAuthenticated: Boolean(user) 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export default AuthContext; 