import express, { Response } from 'express';
import { sql } from '../config/database';
import { protect, authorize, AuthRequest } from '../middleware/auth';

const router = express.Router();

// All routes require admin access
router.use(protect);
router.use(authorize('admin'));

// @desc    Get admin dashboard statistics
// @route   GET /api/admin/dashboard
// @access  Private/Admin
router.get('/dashboard', async (req: AuthRequest, res) => {
  try {
    // Get total counts
    const totalUsers = await sql`SELECT COUNT(*) as count FROM users`;
    const totalPrograms = await sql`SELECT COUNT(*) as count FROM programs WHERE is_active = true`;
    const totalProjects = await sql`SELECT COUNT(*) as count FROM projects`;
    const totalEnrollments = await sql`SELECT COUNT(*) as count FROM user_programs`;

    // Get recent activity
    const recentUsers = await sql`
      SELECT id, name, email, created_at
      FROM users
      ORDER BY created_at DESC
      LIMIT 5
    `;

    const recentProjects = await sql`
      SELECT p.id, p.title, p.status, u.name as user_name, pr.title as program_title
      FROM projects p
      JOIN users u ON p.user_id = u.id
      JOIN programs pr ON p.program_id = pr.id
      ORDER BY p.created_at DESC
      LIMIT 5
    `;

    // Get program enrollment stats
    const programStats = await sql`
      SELECT p.title, COUNT(up.user_id) as enrollment_count
      FROM programs p
      LEFT JOIN user_programs up ON p.id = up.program_id
      WHERE p.is_active = true
      GROUP BY p.id, p.title
      ORDER BY enrollment_count DESC
    `;

    // Get project status distribution
    const projectStatusStats = await sql`
      SELECT status, COUNT(*) as count
      FROM projects
      GROUP BY status
    `;

    res.json({
      success: true,
      data: {
        totals: {
          users: totalUsers[0].count,
          programs: totalPrograms[0].count,
          projects: totalProjects[0].count,
          enrollments: totalEnrollments[0].count,
        },
        recentActivity: {
          users: recentUsers,
          projects: recentProjects,
        },
        programStats,
        projectStatusStats,
      },
    });
  } catch (error) {
    console.error('Get admin dashboard error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

// @desc    Get system analytics
// @route   GET /api/admin/analytics
// @access  Private/Admin
router.get('/analytics', async (req: AuthRequest, res) => {
  try {
    const { period = '30' } = req.query;

    // User growth over time
    const userGrowth = await sql`
      SELECT DATE(created_at) as date, COUNT(*) as count
      FROM users
      WHERE created_at >= NOW() - INTERVAL '${period} days'
      GROUP BY DATE(created_at)
      ORDER BY date
    `;

    // Program enrollment trends
    const enrollmentTrends = await sql`
      SELECT DATE(enrollment_date) as date, COUNT(*) as count
      FROM user_programs
      WHERE enrollment_date >= NOW() - INTERVAL '${period} days'
      GROUP BY DATE(enrollment_date)
      ORDER BY date
    `;

    // Project submission trends
    const projectTrends = await sql`
      SELECT DATE(created_at) as date, COUNT(*) as count
      FROM projects
      WHERE created_at >= NOW() - INTERVAL '${period} days'
      GROUP BY DATE(created_at)
      ORDER BY date
    `;

    // Top performing programs
    const topPrograms = await sql`
      SELECT p.title, COUNT(up.user_id) as enrollments, COUNT(pr.id) as projects
      FROM programs p
      LEFT JOIN user_programs up ON p.id = up.program_id
      LEFT JOIN projects pr ON p.id = pr.program_id
      WHERE p.is_active = true
      GROUP BY p.id, p.title
      ORDER BY enrollments DESC
      LIMIT 10
    `;

    res.json({
      success: true,
      data: {
        userGrowth,
        enrollmentTrends,
        projectTrends,
        topPrograms,
      },
    });
  } catch (error) {
    console.error('Get analytics error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

// @desc    Get pending approvals
// @route   GET /api/admin/pending-approvals
// @access  Private/Admin
router.get('/pending-approvals', async (req: AuthRequest, res) => {
  try {
    const pendingProjects = await sql`
      SELECT p.*, u.name as user_name, pr.title as program_title
      FROM projects p
      JOIN users u ON p.user_id = u.id
      JOIN programs pr ON p.program_id = pr.id
      WHERE p.status = 'completed'
      ORDER BY p.created_at DESC
    `;

    res.json({
      success: true,
      count: pendingProjects.length,
      data: pendingProjects,
    });
  } catch (error) {
    console.error('Get pending approvals error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

// @desc    Bulk operations
// @route   POST /api/admin/bulk-operations
// @access  Private/Admin
router.post('/bulk-operations', async (req: AuthRequest, res: Response) => {
  try {
    const { operation, ids, data } = req.body;

    switch (operation) {
      case 'approve_projects':
        await sql`
          UPDATE projects
          SET status = 'approved', updated_at = CURRENT_TIMESTAMP
          WHERE id = ANY(${ids})
        `;
        break;

      case 'reject_projects':
        await sql`
          UPDATE projects
          SET status = 'rejected', updated_at = CURRENT_TIMESTAMP
          WHERE id = ANY(${ids})
        `;
        break;

      case 'update_user_roles':
        await sql`
          UPDATE users
          SET role = ${data.role}, updated_at = CURRENT_TIMESTAMP
          WHERE id = ANY(${ids})
        `;
        break;

      default:
        return res.status(400).json({
          success: false,
          error: 'Invalid operation',
        });
    }

    return res.json({
      success: true,
      message: 'Bulk operation completed successfully',
    });
  } catch (error) {
    console.error('Bulk operation error:', error);
    return res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

// @desc    Export data
// @route   GET /api/admin/export/:type
// @access  Private/Admin
router.get('/export/:type', async (req: AuthRequest, res: Response) => {
  try {
    const { type } = req.params;

    let data;
    let filename;

    switch (type) {
      case 'users':
        data = await sql`
          SELECT id, name, email, role, created_at
          FROM users
          ORDER BY created_at DESC
        `;
        filename = 'users-export.json';
        break;

      case 'programs':
        data = await sql`
          SELECT p.*, COUNT(up.user_id) as enrollment_count
          FROM programs p
          LEFT JOIN user_programs up ON p.id = up.program_id
          WHERE p.is_active = true
          GROUP BY p.id
          ORDER BY p.created_at DESC
        `;
        filename = 'programs-export.json';
        break;

      case 'projects':
        data = await sql`
          SELECT p.*, u.name as user_name, pr.title as program_title
          FROM projects p
          JOIN users u ON p.user_id = u.id
          JOIN programs pr ON p.program_id = pr.id
          ORDER BY p.created_at DESC
        `;
        filename = 'projects-export.json';
        break;

      default:
        return res.status(400).json({
          success: false,
          error: 'Invalid export type',
        });
    }

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    return res.json(data);
  } catch (error) {
    console.error('Export error:', error);
    return res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

export default router;
