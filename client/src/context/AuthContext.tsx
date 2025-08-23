import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthResponse } from '../types';
import { authService } from '../services/authService';
import toast from 'react-hot-toast';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}

interface AdditionalUserData {
  phone?: string;
  github?: string;
  linkedin?: string;
  cv?: File;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, additionalData?: AdditionalUserData) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: true,
};

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, setState] = useState<AuthState>(initialState);

  // Check if user is authenticated on app load
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          setState(prev => ({ ...prev, loading: true }));
          const response = await authService.getCurrentUser();
          setState({
            user: response.data,
            token,
            isAuthenticated: true,
            loading: false,
          });
        } catch (error) {
          console.error('Auth check failed:', error);
          localStorage.removeItem('token');
          setState({
            user: null,
            token: null,
            isAuthenticated: false,
            loading: false,
          });
        }
      } else {
        setState({
          user: null,
          token: null,
          isAuthenticated: false,
          loading: false,
        });
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setState(prev => ({ ...prev, loading: true }));
      const response: AuthResponse = await authService.login(email, password);
      
      localStorage.setItem('token', response.data.token);
      setState({
        user: response.data.user,
        token: response.data.token,
        isAuthenticated: true,
        loading: false,
      });
      
      toast.success('Welcome back!');
    } catch (error: any) {
      const message = error.response?.data?.error || 'Login failed';
      setState({
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
      });
      toast.error(message);
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string, additionalData?: AdditionalUserData) => {
    try {
      setState(prev => ({ ...prev, loading: true }));
      const response: AuthResponse = await authService.register(name, email, password, additionalData);
      
      localStorage.setItem('token', response.data.token);
      setState({
        user: response.data.user,
        token: response.data.token,
        isAuthenticated: true,
        loading: false,
      });
      
      toast.success('Account created successfully!');
    } catch (error: any) {
      const message = error.response?.data?.error || 'Registration failed';
      setState({
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
      });
      toast.error(message);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setState({
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,
    });
    toast.success('Logged out successfully');
  };

  const updateUser = async (userData: Partial<User>) => {
    try {
      const response = await authService.updateProfile(userData);
      setState(prev => ({
        ...prev,
        user: response.data,
      }));
      toast.success('Profile updated successfully');
    } catch (error: any) {
      const message = error.response?.data?.error || 'Profile update failed';
      toast.error(message);
      throw error;
    }
  };

  const clearError = () => {
    // This can be used to clear any auth errors if needed
  };

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    updateUser,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
