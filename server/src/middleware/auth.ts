import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { sql } from '../config/database';
import { AuthRequest, DatabaseUser, JWTPayload } from '../types';

export { AuthRequest };

export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let token: string | undefined;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    res.status(401).json({
      success: false,
      error: 'Not authorized to access this route',
    });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;

    const users = await sql`
      SELECT id, email, name, role
      FROM users
      WHERE id = ${decoded.id}
    ` as DatabaseUser[];

    if (users.length === 0) {
      res.status(401).json({
        success: false,
        error: 'User not found',
      });
      return;
    }

    // Transform database user to User interface
    const user = users[0];
    req.user = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role as 'student' | 'admin',
      created_at: user.created_at || new Date().toISOString(),
      updated_at: user.updated_at,
      avatar_url: user.avatar_url,
    };
    
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      error: 'Not authorized to access this route',
    });
  }
};

export const authorize = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: 'Not authorized to access this route',
      });
      return;
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        error: `User role ${req.user.role} is not authorized to access this route`,
      });
      return;
    }

    next();
  };
};
