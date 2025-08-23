import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import multer from 'multer';
import path from 'path';
import { sql } from '../config/database';
import { protect, AuthRequest } from '../middleware/auth';
import { DatabaseUser } from '../types';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/cv/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, DOC, and DOCX files are allowed.'));
    }
  }
});

// Generate JWT Token
const generateToken = (id: number): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET environment variable is not set');
  }
  
  return jwt.sign(
    { id }, 
    secret as any, 
    { expiresIn: (process.env.JWT_EXPIRES_IN || '7d') as any }
  );
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
router.post(
  '/register',
  upload.single('cv'),
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please include a valid email'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters'),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { name, email, password, phone, github, linkedin } = req.body;
    const cvFile = req.file;

    try {
      // Check if user exists
      const existingUsers = await sql`
        SELECT id FROM users WHERE email = ${email}
      ` as DatabaseUser[];

      if (existingUsers.length > 0) {
        return res.status(400).json({
          success: false,
          error: 'User already exists',
        });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create user with additional fields
      const newUsers = await sql`
        INSERT INTO users (name, email, password_hash, phone, github_id, linkedin_id, avatar_url)
        VALUES (${name}, ${email}, ${hashedPassword}, ${phone || null}, ${github || null}, ${linkedin || null}, ${cvFile ? cvFile.filename : null})
        RETURNING id, name, email, role, phone, github_id, linkedin_id, avatar_url
      ` as DatabaseUser[];

      const user = newUsers[0];

      return res.status(201).json({
        success: true,
        data: {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            phone: user.phone,
            github: user.github_id,
            linkedin: user.linkedin_id,
            cv: user.avatar_url, // Using avatar_url field for CV filename
          },
          token: generateToken(user.id),
        },
      });
    } catch (error) {
      console.error('Registration error:', error);
      return res.status(500).json({
        success: false,
        error: 'Server error',
      });
    }
  }
);

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Please include a valid email'),
    body('password').exists().withMessage('Password is required'),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;

    try {
      // Check for user
      const users = await sql`
        SELECT id, name, email, role, password_hash
        FROM users
        WHERE email = ${email}
      ` as DatabaseUser[];

      if (users.length === 0) {
        return res.status(401).json({
          success: false,
          error: 'Invalid credentials',
        });
      }

      const user = users[0];

      // Check password
      const isMatch = await bcrypt.compare(password, user.password_hash!);

      if (!isMatch) {
        return res.status(401).json({
          success: false,
          error: 'Invalid credentials',
        });
      }

      return res.json({
        success: true,
        data: {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token: generateToken(user.id),
        },
      });
    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({
        success: false,
        error: 'Server error',
      });
    }
  }
);

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
router.get('/me', protect, async (req: AuthRequest, res: Response) => {
  try {
    const users = await sql`
      SELECT id, name, email, role, avatar_url, created_at
      FROM users
      WHERE id = ${req.user!.id}
    ` as DatabaseUser[];

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }

    return res.json({
      success: true,
      data: users[0],
    });
  } catch (error) {
    console.error('Get user error:', error);
    return res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

// @desc    OAuth callback handler
// @route   POST /api/auth/oauth/callback
// @access  Public
router.post('/oauth/callback', async (req: Request, res: Response) => {
  const { provider, profile } = req.body;

  try {
    let user: DatabaseUser;

    // Check if user exists
    const existingUsers = await sql`
      SELECT id, name, email, role
      FROM users
      WHERE ${provider}_id = ${profile.id}
    ` as DatabaseUser[];

    if (existingUsers.length > 0) {
      user = existingUsers[0];
    } else {
      // Create new user
      const newUsers = await sql`
        INSERT INTO users (name, email, ${provider}_id, avatar_url)
        VALUES (${profile.displayName}, ${profile.emails[0].value}, ${profile.id}, ${profile.photos[0].value})
        RETURNING id, name, email, role
      ` as DatabaseUser[];
      user = newUsers[0];
    }

    return res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token: generateToken(user.id),
      },
    });
  } catch (error) {
    console.error('OAuth callback error:', error);
    return res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

// @desc    Logout user / clear cookie
// @route   POST /api/auth/logout
// @access  Private
router.post('/logout', protect, (req: AuthRequest, res: Response) => {
  return res.json({
    success: true,
    message: 'Logged out successfully',
  });
});

export default router;
