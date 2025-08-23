import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { sql } from '../config/database';
import { protect, authorize, AuthRequest } from '../middleware/auth';

const router = express.Router();

// @desc    Get all products
// @route   GET /api/products
// @access  Public
router.get('/', async (req: Request, res: Response) => {
  try {
    const products = await sql`
      SELECT * FROM products WHERE is_active = true ORDER BY created_at DESC
    `;

    res.json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const products = await sql`
      SELECT * FROM products WHERE id = ${req.params.id} AND is_active = true
    `;

    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Product not found',
      });
    }

    return res.json({
      success: true,
      data: products[0],
    });
  } catch (error) {
    console.error('Get product error:', error);
    return res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

// @desc    Create new product
// @route   POST /api/products
// @access  Private/Admin
router.post(
  '/',
  protect,
  authorize('admin'),
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('description').notEmpty().withMessage('Description is required'),
  ],
  async (req: AuthRequest, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { name, description, icon, link } = req.body;

    try {
      const newProducts = await sql`
        INSERT INTO products (name, description, icon, link)
        VALUES (${name}, ${description}, ${icon}, ${link})
        RETURNING *
      `;

      return res.status(201).json({
        success: true,
        data: newProducts[0],
      });
    } catch (error) {
      console.error('Create product error:', error);
      return res.status(500).json({
        success: false,
        error: 'Server error',
      });
    }
  }
);

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
router.put(
  '/:id',
  protect,
  authorize('admin'),
  async (req: AuthRequest, res: Response) => {
    try {
      const products = await sql`
        SELECT * FROM products WHERE id = ${req.params.id}
      `;

      if (products.length === 0) {
        return res.status(404).json({
          success: false,
          error: 'Product not found',
        });
      }

      const updatedProducts = await sql`
        UPDATE products
        SET name = ${req.body.name || products[0].name},
            description = ${req.body.description || products[0].description},
            icon = ${req.body.icon || products[0].icon},
            link = ${req.body.link || products[0].link},
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ${req.params.id}
        RETURNING *
      `;

      return res.json({
        success: true,
        data: updatedProducts[0],
      });
    } catch (error) {
      console.error('Update product error:', error);
      return res.status(500).json({
        success: false,
        error: 'Server error',
      });
    }
  }
);

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
router.delete('/:id', protect, authorize('admin'), async (req: AuthRequest, res: Response) => {
  try {
    const products = await sql`
      SELECT * FROM products WHERE id = ${req.params.id}
    `;

    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Product not found',
      });
    }

    await sql`
      UPDATE products SET is_active = false WHERE id = ${req.params.id}
    `;

    return res.json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    console.error('Delete product error:', error);
    return res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

export default router;
