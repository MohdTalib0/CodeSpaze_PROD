import express, { Response } from 'express';
import { sql } from '../config/database';
import { protect, authorize, AuthRequest } from '../middleware/auth';
import fs from 'fs';
import path from 'path';

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

// @desc    Get all uploaded resumes
// @route   GET /api/admin/resumes
// @access  Private/Admin
router.get('/resumes', async (req: AuthRequest, res: Response) => {
  try {
    // Get enrollment data with resume information
    const enrollments = await sql`
      SELECT 
        e.id,
        e.first_name,
        e.last_name,
        e.email,
        e.phone,
        e.resume_url,
        e.created_at,
        p.title as program_title
      FROM enrollments e
      LEFT JOIN programs p ON e.program_id = p.id
      WHERE e.resume_url IS NOT NULL
      ORDER BY e.created_at DESC
    `;

    // Return enrollment data with resume URLs
    const resumesWithInfo = enrollments.map((enrollment) => ({
      ...enrollment,
      resume_url: enrollment.resume_url,
      resume_type: enrollment.resume_url.includes('linkedin.com') ? 'LinkedIn' : 
                   enrollment.resume_url.includes('github.com') ? 'GitHub' : 'External URL'
    }));

    res.json({
      success: true,
      count: resumesWithInfo.length,
      resumes: resumesWithInfo
    });
  } catch (error) {
    console.error('Error fetching resumes:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch resumes'
    });
  }
});

// @desc    Get resume URL for a specific enrollment
// @route   GET /api/admin/resumes/:enrollmentId
// @access  Private/Admin
router.get('/resumes/:enrollmentId', async (req: AuthRequest, res: Response) => {
  try {
    const { enrollmentId } = req.params;
    
    // Get enrollment info with resume URL
    const enrollment = await sql`
      SELECT 
        e.id,
        e.first_name,
        e.last_name,
        e.email,
        e.resume_url,
        e.created_at,
        p.title as program_title
      FROM enrollments e
      LEFT JOIN programs p ON e.program_id = p.id
      WHERE e.id = ${enrollmentId}
      LIMIT 1
    `;

    if (enrollment.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Enrollment not found'
      });
    }

    const enrollmentData = enrollment[0];

    if (!enrollmentData.resume_url) {
      return res.status(404).json({
        success: false,
        error: 'No resume URL found for this enrollment'
      });
    }

    // Log the access
    console.log(`Admin ${req.user?.email} accessed resume URL for enrollment ${enrollmentId}: ${enrollmentData.resume_url}`);

    res.json({
      success: true,
      enrollment: enrollmentData,
      resume_url: enrollmentData.resume_url,
      resume_type: enrollmentData.resume_url.includes('linkedin.com') ? 'LinkedIn' : 
                  enrollmentData.resume_url.includes('github.com') ? 'GitHub' : 'External URL'
    });
    
  } catch (error) {
    console.error('Error accessing resume:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to access resume'
    });
  }
});

// @desc    Get all enrollment submissions
// @route   GET /api/admin/enrollments
// @access  Private/Admin
router.get('/enrollments', async (req: AuthRequest, res: Response) => {
  try {
    console.log('🔍 Admin enrollments endpoint called by:', req.user?.email);
    console.log('📊 Query params:', req.query);
    
    const { page = 1, limit = 50, program, status, search } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    // For now, let's get all enrollments without complex filtering
    // We can add filtering later once the basic functionality works
    
    // Get total count
    const totalCount = await sql`
      SELECT COUNT(*) as count
      FROM enrollment_submissions
    `;

    // Get enrollment data with pagination
    const enrollments = await sql`
      SELECT 
        e.id,
        e.first_name,
        e.last_name,
        e.email,
        e.phone,
        e.address,
        e.city,
        e.state,
        e.country,
        e.linkedin_url,
        e.github_url,
        e.resume_url,
        e.school,
        e.degree,
        e.field_of_study,
        e.graduation_year,
        e.current_year,
        e.technologies,
        e.selected_program,
        e.created_at,
        p.title as program_title,
        p.id as program_id
      FROM enrollment_submissions e
      LEFT JOIN programs p ON e.selected_program = p.title
      ORDER BY e.created_at DESC
      LIMIT ${Number(limit)} OFFSET ${offset}
    `;

    // Get enrollment statistics
    const stats = await sql`
      SELECT 
        COUNT(*) as total_enrollments,
        COUNT(CASE WHEN created_at >= NOW() - INTERVAL '7 days' THEN 1 END) as recent_enrollments,
        COUNT(CASE WHEN created_at >= NOW() - INTERVAL '30 days' THEN 1 END) as monthly_enrollments
      FROM enrollment_submissions
    `;

    // Get enrollments by program
    const enrollmentsByProgram = await sql`
      SELECT 
        selected_program as program_name,
        COUNT(*) as count
      FROM enrollment_submissions
      GROUP BY selected_program
      ORDER BY count DESC
    `;

    // Get enrollments by graduation year
    const enrollmentsByYear = await sql`
      SELECT 
        graduation_year,
        COUNT(*) as count
      FROM enrollment_submissions
      WHERE graduation_year IS NOT NULL
      GROUP BY graduation_year
      ORDER BY graduation_year DESC
    `;

    console.log(`Admin ${req.user?.email} accessed enrollment data: ${enrollments.length} records`);

    res.json({
      success: true,
      data: {
        enrollments,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total: totalCount[0].count,
          pages: Math.ceil(totalCount[0].count / Number(limit))
        },
        stats: {
          total_enrollments: stats[0].total_enrollments,
          recent_enrollments: stats[0].recent_enrollments,
          monthly_enrollments: stats[0].monthly_enrollments
        },
        enrollments_by_program: enrollmentsByProgram,
        enrollments_by_year: enrollmentsByYear
      }
    });

  } catch (error) {
    console.error('Error fetching enrollments:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch enrollment data'
    });
  }
});

// @desc    Get enrollment details by ID
// @route   GET /api/admin/enrollments/:id
// @access  Private/Admin
router.get('/enrollments/:id', async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const enrollment = await sql`
      SELECT 
        e.*,
        p.title as program_title,
        p.id as program_id
      FROM enrollment_submissions e
      LEFT JOIN programs p ON e.selected_program = p.title
      WHERE e.id = ${id}
      LIMIT 1
    `;

    if (enrollment.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Enrollment not found'
      });
    }

    console.log(`Admin ${req.user?.email} accessed enrollment details for ID: ${id}`);

    res.json({
      success: true,
      data: enrollment[0]
    });

  } catch (error) {
    console.error('Error fetching enrollment details:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch enrollment details'
    });
  }
});

// @desc    Get resume statistics
// @route   GET /api/admin/resume-stats
// @access  Private/Admin
router.get('/resume-stats', async (req: AuthRequest, res: Response) => {
  try {
    // Get total resumes count
    const totalResumes = await sql`
      SELECT COUNT(*) as count FROM enrollments WHERE resume_filename IS NOT NULL
    `;

    // Get resumes by program
    const resumesByProgram = await sql`
      SELECT 
        p.title as program_title,
        COUNT(e.id) as resume_count
      FROM enrollments e
      JOIN programs p ON e.program_id = p.id
      WHERE e.resume_url IS NOT NULL
      GROUP BY p.id, p.title
      ORDER BY resume_count DESC
    `;

    // Get recent resumes (last 30 days)
    const recentResumes = await sql`
      SELECT COUNT(*) as count
      FROM enrollments
      WHERE resume_filename IS NOT NULL 
      AND created_at >= NOW() - INTERVAL '30 days'
    `;

    // Get resume URL types
    const resumeTypes = await sql`
      SELECT 
        CASE 
          WHEN resume_url LIKE '%linkedin.com%' THEN 'LinkedIn'
          WHEN resume_url LIKE '%github.com%' THEN 'GitHub'
          ELSE 'External URL'
        END as resume_type,
        COUNT(*) as count
      FROM enrollments
      WHERE resume_url IS NOT NULL
      GROUP BY 
        CASE 
          WHEN resume_url LIKE '%linkedin.com%' THEN 'LinkedIn'
          WHEN resume_url LIKE '%github.com%' THEN 'GitHub'
          ELSE 'External URL'
        END
    `;

    res.json({
      success: true,
      stats: {
        total_resumes: totalResumes[0].count,
        recent_resumes: recentResumes[0].count,
        resumes_by_program: resumesByProgram,
        resume_types: resumeTypes
      }
    });
  } catch (error) {
    console.error('Error fetching resume stats:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch resume statistics'
    });
  }
});

export default router;
