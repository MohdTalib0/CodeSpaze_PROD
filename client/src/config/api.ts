// API Configuration
export const API_CONFIG = {
  // Base API URL - change this based on your environment
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  
  // AI Resume Builder endpoints
  AI_RESUME: {
    GENERATE_CONTENT: '/ai-resume/generate-content',
    SUGGEST_IMPROVEMENTS: '/ai-resume/suggest-improvements',
  },
  
  // Auth endpoints
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
  },
  
  // Other endpoints
  PROGRAMS: '/programs',
  PRODUCTS: '/products',
  USERS: '/users',
  PROJECTS: '/projects',
  ADMIN: '/admin',
  CONTACT: '/contact',
  ENROLLMENT: '/enrollment',
};

// Helper function to get full API URL
export const getApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Helper function to get auth headers
export const getAuthHeaders = (): Record<string, string> => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };
};
