import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { sql } from '../config/database';
import { protect, authorize, AuthRequest } from '../middleware/auth';

const router = express.Router();

// @desc    Get all programs
// @route   GET /api/programs
// @access  Public
router.get('/', async (req: Request, res: Response) => {
  try {
    const programs = await sql`
      SELECT * FROM programs WHERE is_active = true ORDER BY created_at DESC
    `;

    res.json({
      success: true,
      count: programs.length,
      data: programs,
    });
  } catch (error) {
    console.error('Get programs error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

// @desc    Get single program
// @route   GET /api/programs/:id
// @access  Public
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const programs = await sql`
      SELECT * FROM programs WHERE id = ${req.params.id} AND is_active = true
    `;

    if (programs.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Program not found',
      });
    }

    return res.json({
      success: true,
      data: programs[0],
    });
  } catch (error) {
    console.error('Get program error:', error);
    return res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

// @desc    Create new program
// @route   POST /api/programs
// @access  Private/Admin
router.post(
  '/',
  protect,
  authorize('admin'),
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('duration').notEmpty().withMessage('Duration is required'),
    body('price_india').isNumeric().withMessage('India price must be numeric'),
    body('price_global').isNumeric().withMessage('Global price must be numeric'),
    body('category').notEmpty().withMessage('Category is required'),
  ],
  async (req: AuthRequest, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const {
      title,
      description,
      duration,
      price_india,
      price_global,
      category,
      region = 'global',
      image_url,
    } = req.body;

    try {
      const newPrograms = await sql`
        INSERT INTO programs (title, description, duration, price_india, price_global, category, region, image_url)
        VALUES (${title}, ${description}, ${duration}, ${price_india}, ${price_global}, ${category}, ${region}, ${image_url})
        RETURNING *
      `;

      return res.status(201).json({
        success: true,
        data: newPrograms[0],
      });
    } catch (error) {
      console.error('Create program error:', error);
      return res.status(500).json({
        success: false,
        error: 'Server error',
      });
    }
  }
);

// @desc    Update program
// @route   PUT /api/programs/:id
// @access  Private/Admin
router.put(
  '/:id',
  protect,
  authorize('admin'),
  async (req: AuthRequest, res: Response) => {
    try {
      const programs = await sql`
        SELECT * FROM programs WHERE id = ${req.params.id}
      `;

      if (programs.length === 0) {
        return res.status(404).json({
          success: false,
          error: 'Program not found',
        });
      }

      const updatedPrograms = await sql`
        UPDATE programs
        SET title = ${req.body.title || programs[0].title},
            description = ${req.body.description || programs[0].description},
            duration = ${req.body.duration || programs[0].duration},
            price_india = ${req.body.price_india || programs[0].price_india},
            price_global = ${req.body.price_global || programs[0].price_global},
            category = ${req.body.category || programs[0].category},
            region = ${req.body.region || programs[0].region},
            image_url = ${req.body.image_url || programs[0].image_url},
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ${req.params.id}
        RETURNING *
      `;

      return res.json({
        success: true,
        data: updatedPrograms[0],
      });
    } catch (error) {
      console.error('Update program error:', error);
      return res.status(500).json({
        success: false,
        error: 'Server error',
      });
    }
  }
);

// @desc    Delete program
// @route   DELETE /api/programs/:id
// @access  Private/Admin
router.delete('/:id', protect, authorize('admin'), async (req: AuthRequest, res: Response) => {
  try {
    const programs = await sql`
      SELECT * FROM programs WHERE id = ${req.params.id}
    `;

    if (programs.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Program not found',
      });
    }

    await sql`
      UPDATE programs SET is_active = false WHERE id = ${req.params.id}
    `;

    return res.json({
      success: true,
      message: 'Program deleted successfully',
    });
  } catch (error) {
    console.error('Delete program error:', error);
    return res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

// @desc    Enroll in program
// @route   POST /api/programs/:id/enroll
// @access  Private
router.post('/:id/enroll', protect, async (req: AuthRequest, res: Response) => {
  try {
    const programs = await sql`
      SELECT * FROM programs WHERE id = ${req.params.id} AND is_active = true
    `;

    if (programs.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Program not found',
      });
    }

    // Check if already enrolled
    const existingEnrollments = await sql`
      SELECT * FROM user_programs WHERE user_id = ${req.user!.id} AND program_id = ${req.params.id}
    `;

    if (existingEnrollments.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Already enrolled in this program',
      });
    }

    // Enroll user
    await sql`
      INSERT INTO user_programs (user_id, program_id)
      VALUES (${req.user!.id}, ${req.params.id})
    `;

    return res.status(201).json({
      success: true,
      message: 'Enrolled successfully',
    });
  } catch (error) {
    console.error('Enroll error:', error);
    return res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

// @desc    Get user's enrolled programs
// @route   GET /api/programs/enrolled
// @access  Private
router.get('/enrolled', protect, async (req: AuthRequest, res: Response) => {
  try {
    const enrolledPrograms = await sql`
      SELECT p.*, up.enrollment_date, up.progress, up.status
      FROM programs p
      JOIN user_programs up ON p.id = up.program_id
      WHERE up.user_id = ${req.user!.id}
      ORDER BY up.enrollment_date DESC
    `;

    return res.json({
      success: true,
      count: enrolledPrograms.length,
      data: enrolledPrograms,
    });
  } catch (error) {
    console.error('Get enrolled programs error:', error);
    return res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

export default router;
