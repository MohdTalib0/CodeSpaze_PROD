import { Request } from 'express';

// Simple type definitions to avoid compilation issues
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

// Extended Request interface for authentication
export interface AuthRequest extends Request {
  user?: User;
}

// Database result types
export interface DatabaseUser {
  id: number;
  email: string;
  name: string;
  role: string;
  password_hash?: string;
  phone?: string;
  github_id?: string;
  linkedin_id?: string;
  avatar_url?: string;
  created_at?: string;
  updated_at?: string;
}

// JWT Payload
export interface JWTPayload {
  id: number;
  iat?: number;
  exp?: number;
}
