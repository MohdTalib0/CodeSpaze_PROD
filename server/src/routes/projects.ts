import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { sql } from '../config/database';
import { protect, authorize, AuthRequest } from '../middleware/auth';

const router = express.Router();

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
router.get('/', async (req: Request, res: Response) => {
  try {
    const projects = await sql`
      SELECT p.*, u.name as user_name, pr.title as program_title
      FROM projects p
      JOIN users u ON p.user_id = u.id
      JOIN programs pr ON p.program_id = pr.id
      ORDER BY p.created_at DESC
    `;

    res.json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Public
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const projects = await sql`
      SELECT p.*, u.name as user_name, pr.title as program_title
      FROM projects p
      JOIN users u ON p.user_id = u.id
      JOIN programs pr ON p.program_id = pr.id
      WHERE p.id = ${req.params.id}
    `;

    if (projects.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Project not found',
      });
    }

    return res.json({
      success: true,
      data: projects[0],
    });
  } catch (error) {
    console.error('Get project error:', error);
    return res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

// @desc    Create new project
// @route   POST /api/projects
// @access  Private
router.post(
  '/',
  protect,
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('program_id').isNumeric().withMessage('Program ID is required'),
  ],
  async (req: AuthRequest, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { title, description, program_id, github_url, live_url } = req.body;

    try {
      // Check if program exists
      const programs = await sql`
        SELECT id FROM programs WHERE id = ${program_id} AND is_active = true
      `;

      if (programs.length === 0) {
        return res.status(404).json({
          success: false,
          error: 'Program not found',
        });
      }

      // Check if user is enrolled in the program
      const enrollments = await sql`
        SELECT * FROM user_programs WHERE user_id = ${req.user!.id} AND program_id = ${program_id}
      `;

      if (enrollments.length === 0) {
        return res.status(400).json({
          success: false,
          error: 'You must be enrolled in this program to submit a project',
        });
      }

      const newProjects = await sql`
        INSERT INTO projects (title, description, program_id, user_id, github_url, live_url)
        VALUES (${title}, ${description}, ${program_id}, ${req.user!.id}, ${github_url}, ${live_url})
        RETURNING *
      `;

      return res.status(201).json({
        success: true,
        data: newProjects[0],
      });
    } catch (error) {
      console.error('Create project error:', error);
      return res.status(500).json({
        success: false,
        error: 'Server error',
      });
    }
  }
);

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private
router.put(
  '/:id',
  protect,
  async (req: AuthRequest, res: Response) => {
    try {
      const projects = await sql`
        SELECT * FROM projects WHERE id = ${req.params.id}
      `;

      if (projects.length === 0) {
        return res.status(404).json({
          success: false,
          error: 'Project not found',
        });
      }

      // Check if user owns the project or is admin
      if (projects[0].user_id !== req.user!.id && req.user!.role !== 'admin') {
        return res.status(403).json({
          success: false,
          error: 'Not authorized to update this project',
        });
      }

      const updatedProjects = await sql`
        UPDATE projects
        SET title = ${req.body.title || projects[0].title},
            description = ${req.body.description || projects[0].description},
            github_url = ${req.body.github_url || projects[0].github_url},
            live_url = ${req.body.live_url || projects[0].live_url},
            status = ${req.body.status || projects[0].status},
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ${req.params.id}
        RETURNING *
      `;

      return res.json({
        success: true,
        data: updatedProjects[0],
      });
    } catch (error) {
      console.error('Update project error:', error);
      return res.status(500).json({
        success: false,
        error: 'Server error',
      });
    }
  }
);

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private
router.delete('/:id', protect, async (req: AuthRequest, res: Response) => {
  try {
    const projects = await sql`
      SELECT * FROM projects WHERE id = ${req.params.id}
    `;

    if (projects.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Project not found',
      });
    }

    // Check if user owns the project or is admin
    if (projects[0].user_id !== req.user!.id && req.user!.role !== 'admin') {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to delete this project',
      });
    }

    await sql`
      DELETE FROM projects WHERE id = ${req.params.id}
    `;

    return res.json({
      success: true,
      message: 'Project deleted successfully',
    });
  } catch (error) {
    console.error('Delete project error:', error);
    return res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

// @desc    Get user's projects
// @route   GET /api/projects/user/me
// @access  Private
router.get('/user/me', protect, async (req: AuthRequest, res: Response) => {
  try {
    const projects = await sql`
      SELECT p.*, pr.title as program_title
      FROM projects p
      JOIN programs pr ON p.program_id = pr.id
      WHERE p.user_id = ${req.user!.id}
      ORDER BY p.created_at DESC
    `;

    return res.json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    console.error('Get user projects error:', error);
    return res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

// @desc    Update project status (admin only)
// @route   PUT /api/projects/:id/status
// @access  Private/Admin
router.put(
  '/:id/status',
  protect,
  authorize('admin'),
  [
    body('status').isIn(['in_progress', 'completed', 'approved', 'rejected']).withMessage('Invalid status'),
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
      const { status } = req.body;

      const updatedProjects = await sql`
        UPDATE projects
        SET status = ${status}, updated_at = CURRENT_TIMESTAMP
        WHERE id = ${req.params.id}
        RETURNING *
      `;

      if (updatedProjects.length === 0) {
        return res.status(404).json({
          success: false,
          error: 'Project not found',
        });
      }

      return res.json({
        success: true,
        data: updatedProjects[0],
      });
    } catch (error) {
      console.error('Update project status error:', error);
      return res.status(500).json({
        success: false,
        error: 'Server error',
      });
    }
  }
);

export default router;
