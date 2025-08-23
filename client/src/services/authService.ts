import { User, AuthResponse, ApiResponse } from '@/types';
import apiService from './api';

interface AdditionalUserData {
  phone?: string;
  github?: string;
  linkedin?: string;
  cv?: File;
}

class AuthService {
  // Login user
  async login(email: string, password: string): Promise<AuthResponse> {
    return apiService.post<AuthResponse>('/auth/login', { email, password });
  }

  // Register user
  async register(name: string, email: string, password: string, additionalData?: AdditionalUserData): Promise<AuthResponse> {
    // Create FormData for file upload
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    
    if (additionalData) {
      if (additionalData.phone) formData.append('phone', additionalData.phone);
      if (additionalData.github) formData.append('github', additionalData.github);
      if (additionalData.linkedin) formData.append('linkedin', additionalData.linkedin);
      if (additionalData.cv) formData.append('cv', additionalData.cv);
    }

    return apiService.post<AuthResponse>('/auth/register', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  // Get current user
  async getCurrentUser(): Promise<ApiResponse<User>> {
    return apiService.get<ApiResponse<User>>('/auth/me');
  }

  // Update user profile
  async updateProfile(userData: Partial<User>): Promise<ApiResponse<User>> {
    return apiService.put<ApiResponse<User>>('/users/profile', userData);
  }

  // Logout user
  async logout(): Promise<ApiResponse<{ message: string }>> {
    return apiService.post<ApiResponse<{ message: string }>>('/auth/logout');
  }

  // OAuth callback
  async oauthCallback(provider: string, profile: any): Promise<AuthResponse> {
    return apiService.post<AuthResponse>('/auth/oauth/callback', { provider, profile });
  }

  // Forgot password
  async forgotPassword(email: string): Promise<ApiResponse<{ message: string }>> {
    return apiService.post<ApiResponse<{ message: string }>>('/auth/forgot-password', { email });
  }

  // Reset password
  async resetPassword(token: string, password: string): Promise<ApiResponse<{ message: string }>> {
    return apiService.post<ApiResponse<{ message: string }>>('/auth/reset-password', { token, password });
  }

  // Verify email
  async verifyEmail(token: string): Promise<ApiResponse<{ message: string }>> {
    return apiService.post<ApiResponse<{ message: string }>>('/auth/verify-email', { token });
  }

  // Resend verification email
  async resendVerification(email: string): Promise<ApiResponse<{ message: string }>> {
    return apiService.post<ApiResponse<{ message: string }>>('/auth/resend-verification', { email });
  }
}

export const authService = new AuthService();
export default authService;
