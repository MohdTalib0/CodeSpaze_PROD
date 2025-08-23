// User Types
export interface User {
  id: number;
  name: string;
  email: string;
  role: 'student' | 'admin';
  avatar_url?: string;
  github_id?: string;
  google_id?: string;
  created_at: string;
  updated_at?: string;
}

export interface AuthResponse {
  success: boolean;
  data: {
    user: User;
    token: string;
  };
}

// Program Types
export interface Program {
  id: number;
  title: string;
  description: string;
  duration: string;
  price_india: number;
  price_global: number;
  category: 'internship' | 'fellowship' | 'accelerator' | 'bootcamp' | 'international';
  region: string;
  image_url?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface EnrolledProgram extends Program {
  enrollment_date: string;
  completion_date?: string;
  progress: number;
  status: 'enrolled' | 'in_progress' | 'completed' | 'dropped';
}

// Product Types
export interface Product {
  id: number;
  name: string;
  description: string;
  icon?: string;
  link?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Project Types
export interface Project {
  id: number;
  program_id: number;
  user_id: number;
  title: string;
  description: string;
  status: 'draft' | 'in_progress' | 'completed' | 'approved' | 'rejected';
  github_url?: string;
  live_url?: string;
  created_at: string;
  updated_at: string;
  user_name?: string;
  program_title?: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
  error?: string;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  count: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Form Types
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ProgramForm {
  title: string;
  description: string;
  duration: string;
  price_india: number;
  price_global: number;
  category: string;
  region: string;
  image_url?: string;
}

export interface ProjectForm {
  title: string;
  description: string;
  program_id: number;
  github_url?: string;
  live_url?: string;
}

// Dashboard Types
export interface DashboardStats {
  totalPrograms: number;
  enrolledPrograms: number;
  completedProjects: number;
  totalProgress: number;
}

export interface AdminStats {
  totals: {
    users: number;
    programs: number;
    projects: number;
    enrollments: number;
  };
  recentActivity: {
    users: User[];
    projects: Project[];
  };
  programStats: Array<{
    title: string;
    enrollment_count: number;
  }>;
  projectStatusStats: Array<{
    status: string;
    count: number;
  }>;
}

// Filter Types
export interface ProgramFilters {
  category?: string;
  region?: string;
  search?: string;
  priceRange?: [number, number];
}

export interface ProjectFilters {
  program_id?: number;
  status?: string;
  user_id?: number;
}

// Component Props Types
export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  onClick?: () => void;
}

export interface InputProps {
  label?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

// Navigation Types
export interface NavItem {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  children?: NavItem[];
}

// Animation Types
export interface AnimationProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

// Theme Types
export interface Theme {
  mode: 'light' | 'dark';
  primary: string;
  secondary: string;
  background: string;
}

// Error Types
export interface AppError {
  message: string;
  code?: string;
  status?: number;
}

// Notification Types
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
}

// File Upload Types
export interface FileUpload {
  file: File;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  url?: string;
  error?: string;
}

// Search Types
export interface SearchResult {
  type: 'program' | 'project' | 'user';
  id: number;
  title: string;
  description: string;
  url: string;
}

// Analytics Types
export interface AnalyticsData {
  userGrowth: Array<{
    date: string;
    count: number;
  }>;
  enrollmentTrends: Array<{
    date: string;
    count: number;
  }>;
  projectTrends: Array<{
    date: string;
    count: number;
  }>;
  topPrograms: Array<{
    title: string;
    enrollments: number;
    projects: number;
  }>;
}
