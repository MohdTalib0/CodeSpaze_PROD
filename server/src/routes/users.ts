import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { sql } from '../config/database';
import { protect, authorize, AuthRequest } from '../middleware/auth';

const router = express.Router();

// @desc    Get all users (admin only)
// @route   GET /api/users
// @access  Private/Admin
router.get('/', protect, authorize('admin'), async (req: Request, res: Response) => {
  try {
    const users = await sql`
      SELECT id, name, email, role, avatar_url, created_at, updated_at
      FROM users
      ORDER BY created_at DESC
    `;

    res.json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
router.get('/profile', protect, async (req: AuthRequest, res: Response) => {
  try {
    const users = await sql`
      SELECT id, name, email, role, avatar_url, created_at
      FROM users
      WHERE id = ${req.user!.id}
    `;

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
    console.error('Get profile error:', error);
    return res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
router.put(
  '/profile',
  protect,
  [
    body('name').optional().notEmpty().withMessage('Name cannot be empty'),
    body('email').optional().isEmail().withMessage('Please include a valid email'),
  ],
  async (req: AuthRequest, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    try {
      const { name, email, avatar_url } = req.body;

      const updatedUsers = await sql`
        UPDATE users
        SET name = ${name || undefined},
            email = ${email || undefined},
            avatar_url = ${avatar_url || undefined},
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ${req.user!.id}
        RETURNING id, name, email, role, avatar_url, created_at
      `;

      return res.json({
        success: true,
        data: updatedUsers[0],
      });
    } catch (error) {
      console.error('Update profile error:', error);
      return res.status(500).json({
        success: false,
        error: 'Server error',
      });
    }
  }
);

// @desc    Get user by ID (admin only)
// @route   GET /api/users/:id
// @access  Private/Admin
router.get('/:id', protect, authorize('admin'), async (req: AuthRequest, res: Response) => {
  try {
    const users = await sql`
      SELECT id, name, email, role, avatar_url, created_at, updated_at
      FROM users
      WHERE id = ${req.params.id}
    `;

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

// @desc    Update user role (admin only)
// @route   PUT /api/users/:id/role
// @access  Private/Admin
router.put(
  '/:id/role',
  protect,
  authorize('admin'),
  [
    body('role').isIn(['student', 'admin']).withMessage('Role must be student or admin'),
  ],
  async (req: AuthRequest, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    try {
      const { role } = req.body;

      const updatedUsers = await sql`
        UPDATE users
        SET role = ${role}, updated_at = CURRENT_TIMESTAMP
        WHERE id = ${req.params.id}
        RETURNING id, name, email, role, created_at, updated_at
      `;

      if (updatedUsers.length === 0) {
        return res.status(404).json({
          success: false,
          error: 'User not found',
        });
      }

      return res.json({
        success: true,
        data: updatedUsers[0],
      });
    } catch (error) {
      console.error('Update user role error:', error);
      return res.status(500).json({
        success: false,
        error: 'Server error',
      });
    }
  }
);

// @desc    Get user statistics
// @route   GET /api/users/stats
// @access  Private/Admin
router.get('/stats', protect, authorize('admin'), async (req: AuthRequest, res: Response) => {
  try {
    const totalUsers = await sql`
      SELECT COUNT(*) as total FROM users
    `;

    const students = await sql`
      SELECT COUNT(*) as count FROM users WHERE role = 'student'
    `;

    const admins = await sql`
      SELECT COUNT(*) as count FROM users WHERE role = 'admin'
    `;

    const recentUsers = await sql`
      SELECT COUNT(*) as count FROM users WHERE created_at >= NOW() - INTERVAL '7 days'
    `;

    return res.json({
      success: true,
      data: {
        total: totalUsers[0].total,
        students: students[0].count,
        admins: admins[0].count,
        recentUsers: recentUsers[0].count,
      },
    });
  } catch (error) {
    console.error('Get user stats error:', error);
    return res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

// @desc    Upload user avatar
// @route   POST /api/users/upload-avatar
// @access  Private
router.post('/upload-avatar', protect, async (req: AuthRequest, res: Response) => {
  try {
    // For now, return a mock response since we don't have file upload implemented
    // In a real implementation, you would handle file upload here
    return res.json({
      success: true,
      data: {
        avatar_url: `https://ui-avatars.com/api/?name=${encodeURIComponent(req.user!.name)}&background=19c973&color=fff&size=200`
      }
    });
  } catch (error) {
    console.error('Upload avatar error:', error);
    return res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

// @desc    Change user email
// @route   POST /api/users/change-email
// @access  Private
router.post('/change-email', protect, [
  body('newEmail').isEmail().withMessage('Please include a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
], async (req: AuthRequest, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  try {
    const { newEmail, password } = req.body;

    // For now, return a mock response since we don't have email change implemented
    // In a real implementation, you would verify the password and update the email
    return res.json({
      success: true,
      message: 'Email change request submitted. Please check your new email for verification.',
    });
  } catch (error) {
    console.error('Change email error:', error);
    return res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

// @desc    Update privacy settings
// @route   PUT /api/users/privacy-settings
// @access  Private
router.put('/privacy-settings', protect, async (req: AuthRequest, res: Response) => {
  try {
    const { profileVisibility, emailNotifications, marketingEmails, dataSharing } = req.body;

    // For now, return a mock response since we don't have privacy settings implemented
    // In a real implementation, you would store these settings in the database
    return res.json({
      success: true,
      message: 'Privacy settings updated successfully',
    });
  } catch (error) {
    console.error('Update privacy settings error:', error);
    return res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

// @desc    Update security settings
// @route   PUT /api/users/security-settings
// @access  Private
router.put('/security-settings', protect, [
  body('currentPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword').optional().isLength({ min: 8 }).withMessage('New password must be at least 8 characters'),
], async (req: AuthRequest, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  try {
    const { currentPassword, newPassword, twoFactorEnabled } = req.body;

    // For now, return a mock response since we don't have password change implemented
    // In a real implementation, you would verify the current password and update it
    return res.json({
      success: true,
      message: 'Security settings updated successfully',
    });
  } catch (error) {
    console.error('Update security settings error:', error);
    return res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

export default router;
