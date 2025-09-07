import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

dotenv.config();

const router = express.Router();
const sql = neon(process.env.NEON_DATABASE_URL!);

// Ensure uploads directory exists
const ensureUploadsDir = () => {
  const uploadsDir = path.join(process.cwd(), 'uploads');
  const resumesDir = path.join(uploadsDir, 'resumes');
  
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
  
  if (!fs.existsSync(resumesDir)) {
    fs.mkdirSync(resumesDir, { recursive: true });
  }
};

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    ensureUploadsDir();
    cb(null, 'uploads/resumes/');
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
    const allowedTypes = /pdf|doc|docx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only PDF, DOC, and DOCX files are allowed'));
    }
  }
});

// Validation middleware for enrollment form
const validateEnrollmentForm = [
  body('firstName').trim().isLength({ min: 1 }).withMessage('First name is required'),
  body('lastName').trim().isLength({ min: 1 }).withMessage('Last name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').trim().isLength({ min: 10 }).withMessage('Phone number is required'),
  body('address').trim().isLength({ min: 1 }).withMessage('Address is required'),
  body('city').trim().isLength({ min: 1 }).withMessage('City is required'),
  body('state').trim().isLength({ min: 1 }).withMessage('State is required'),
  body('country').trim().isLength({ min: 1 }).withMessage('Country is required'),
  body('school').trim().isLength({ min: 1 }).withMessage('School is required'),
  body('degree').trim().isLength({ min: 1 }).withMessage('Degree is required'),
  body('fieldOfStudy').trim().isLength({ min: 1 }).withMessage('Field of study is required'),
  body('graduationYear').trim().isLength({ min: 1 }).withMessage('Graduation year is required'),
  body('currentYear').trim().isLength({ min: 1 }).withMessage('Current year is required'),
  body('technologies').isArray({ min: 1 }).withMessage('At least one technology must be selected'),
  body('selectedProgram').trim().isLength({ min: 1 }).withMessage('Program selection is required'),
];

// Submit enrollment form
router.post('/submit', upload.single('resume'), validateEnrollmentForm, async (req: Request, res: Response) => {
  try {
    // Check for multer errors first
    if (req.file === undefined && req.body.resume) {
      return res.status(400).json({
        success: false,
        error: 'File upload failed. Please ensure the file is a valid PDF, DOC, or DOCX format and under 5MB.'
      });
    }

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const {
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      state,
      country,
      linkedin,
      github,
      school,
      degree,
      fieldOfStudy,
      graduationYear,
      currentYear,
      technologies,
      selectedProgram
    } = req.body;

    const resumeFile = req.file;

    // Insert enrollment submission into database
    const result = await sql`
      INSERT INTO enrollment_submissions (
        first_name, last_name, email, phone, address, city, state, country,
        linkedin_url, github_url, resume_filename, school, degree, field_of_study,
        graduation_year, current_year, technologies, selected_program
      )
      VALUES (
        ${firstName}, ${lastName}, ${email}, ${phone}, ${address}, ${city}, ${state}, ${country},
        ${linkedin || null}, ${github || null}, ${resumeFile ? resumeFile.filename : null},
        ${school}, ${degree}, ${fieldOfStudy}, ${graduationYear}, ${currentYear},
        ${technologies}, ${selectedProgram}
      )
      RETURNING id, created_at
    `;

    if (result && result.length > 0) {
      console.log(`✅ Enrollment form submitted: ${email} - ${selectedProgram}`);
      
      return res.status(201).json({
        success: true,
        message: 'Enrollment form submitted successfully',
        data: {
          id: result[0].id,
          submittedAt: result[0].created_at
        }
      });
    } else {
      throw new Error('Failed to insert enrollment submission');
    }

  } catch (error) {
    console.error('❌ Enrollment form submission error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to submit enrollment form. Please try again.'
    });
  }
});

// Get all enrollment submissions (admin only)
router.get('/submissions', async (req: Request, res: Response) => {
  try {
    const submissions = await sql`
      SELECT * FROM enrollment_submissions 
      ORDER BY created_at DESC
    `;

    return res.json({
      success: true,
      data: submissions
    });

  } catch (error) {
    console.error('❌ Error fetching enrollment submissions:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch enrollment submissions'
    });
  }
});

// Update enrollment submission status (admin only)
router.patch('/submissions/:id/status', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, reviewed_by } = req.body;

    const result = await sql`
      UPDATE enrollment_submissions 
      SET status = ${status}, reviewed_at = CURRENT_TIMESTAMP, reviewed_by = ${reviewed_by}, updated_at = CURRENT_TIMESTAMP
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
        error: 'Enrollment submission not found'
      });
    }

  } catch (error) {
    console.error('❌ Error updating enrollment submission status:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to update status'
    });
  }
});

export default router;
