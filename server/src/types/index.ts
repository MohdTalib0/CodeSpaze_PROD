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
export interface AuthRequest {
  user?: User;
  body: any;
  params: any;
  query: any;
  headers: any;
  method: string;
  url: string;
  originalUrl: string;
  path: string;
  ip: string;
  cookies: any;
  signedCookies: any;
  secret: string | string[];
  accepts: any;
  acceptsCharsets: any;
  acceptsEncodings: any;
  acceptsLanguages: any;
  range: any;
  param: (name: string, defaultValue?: any) => string;
  is: any;
  protocol: string;
  secure: boolean;
  subdomains: string[];
  stale: boolean;
  fresh: boolean;
  xhr: boolean;
  hostname: string;
  host: string;
  baseUrl: string;
  route: any;
  app: any;
  res: any;
  next: any;
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
