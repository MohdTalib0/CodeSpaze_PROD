import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const sql = neon(process.env.NEON_DATABASE_URL!);

// Validation middleware for contact form
const validateContactForm = [
  body('name').trim().isLength({ min: 1 }).withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('subject').trim().isLength({ min: 1 }).withMessage('Subject is required'),
  body('message').trim().isLength({ min: 10 }).withMessage('Message must be at least 10 characters long'),
];

// Submit contact form
router.post('/submit', validateContactForm, async (req: Request, res: Response) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { name, email, subject, message } = req.body;

    // Insert contact submission into database
    const result = await sql`
      INSERT INTO contact_submissions (name, email, subject, message)
      VALUES (${name}, ${email}, ${subject}, ${message})
      RETURNING id, created_at
    `;

    if (result && result.length > 0) {
      console.log(`✅ Contact form submitted: ${email} - ${subject}`);
      
      return res.status(201).json({
        success: true,
        message: 'Contact form submitted successfully',
        data: {
          id: result[0].id,
          submittedAt: result[0].created_at
        }
      });
    } else {
      throw new Error('Failed to insert contact submission');
    }

  } catch (error) {
    console.error('❌ Contact form submission error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to submit contact form. Please try again.'
    });
  }
});

// Get all contact submissions (admin only - you can add auth middleware later)
router.get('/submissions', async (req: Request, res: Response) => {
  try {
    const submissions = await sql`
      SELECT * FROM contact_submissions 
      ORDER BY created_at DESC
    `;

    return res.json({
      success: true,
      data: submissions
    });

  } catch (error) {
    console.error('❌ Error fetching contact submissions:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch contact submissions'
    });
  }
});

// Update contact submission status (admin only)
router.patch('/submissions/:id/status', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, responded_at } = req.body;

    const result = await sql`
      UPDATE contact_submissions 
      SET status = ${status}, responded_at = ${responded_at}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `;

    if (result && result.length > 0) {
      return res.json({
        success: true,
        message: 'Status updated successfully',
        data: result[0]
      });
    } else {
      return res.status(404).json({
        success: false,
        error: 'Contact submission not found'
      });
    }

  } catch (error) {
    console.error('❌ Error updating contact submission status:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to update status'
    });
  }
});

export default router;
