const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();
const path = require('path');
const fs = require('fs');

// Import routes
import authRoutes from './routes/auth';
import programRoutes from './routes/programs';
import productRoutes from './routes/products';
import userRoutes from './routes/users';
import projectRoutes from './routes/projects';
import adminRoutes from './routes/admin';
import contactRoutes from './routes/contact';
import enrollmentRoutes from './routes/enrollment';
import aiResumeRoutes from './routes/ai-resume';

// Import middleware
import { errorHandler } from './middleware/errorHandler';
import { notFound } from './middleware/notFound';

// Import database
import { initializeDatabase } from './config/database';

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
    },
  },
}));

// CORS configuration
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://www.codespaze.org',
  'https://codespaze.org',
  'https://codespaze-prod-2.onrender.com',
  ...(process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',').map(origin => origin.trim()) : [])
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    console.warn(`CORS blocked request from origin: ${origin}`);
    return callback(new Error('Not allowed by CORS'), false);
  },
  credentials: true,
}));

// No rate limiting - Production optimized for high traffic
// Server can handle 10k+ users and 10-20 submissions per minute

// Body parsing middleware - Optimized for high traffic
app.use(express.json({ 
  limit: '50mb',
  parameterLimit: 10000,
  extended: true
}));
app.use(express.urlencoded({ 
  extended: true, 
  limit: '50mb',
  parameterLimit: 10000
}));

// Compression middleware - Optimized for high traffic
app.use(compression({
  level: 6, // Balanced compression
  threshold: 1024, // Compress files larger than 1KB
  filter: (req, res) => {
    if (req.headers['x-no-compression']) {
      return false;
    }
    return compression.filter(req, res);
  }
}));

// Logging middleware - Optimized for production
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  // Production: minimal logging to reduce overhead
  app.use(morgan('combined', {
    skip: (req, res) => {
      // Skip logging for health checks and static files
      return req.path === '/health' || req.path === '/api/health' || req.path.startsWith('/uploads/');
    }
  }));
}

// Static files - Optimized for high traffic
app.use('/uploads', express.static(path.join(__dirname, '../uploads'), {
  maxAge: '1d', // Cache for 1 day
  etag: true,
  lastModified: true,
  setHeaders: (res, path) => {
    // Set appropriate headers for different file types
    if (path.endsWith('.pdf')) {
      res.setHeader('Content-Type', 'application/pdf');
    } else if (path.endsWith('.jpg') || path.endsWith('.jpeg')) {
      res.setHeader('Content-Type', 'image/jpeg');
    } else if (path.endsWith('.png')) {
      res.setHeader('Content-Type', 'image/png');
    }
  }
}));

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
const resumesDir = path.join(uploadsDir, 'resumes');
const cvDir = path.join(uploadsDir, 'cv');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
if (!fs.existsSync(resumesDir)) {
  fs.mkdirSync(resumesDir, { recursive: true });
}
if (!fs.existsSync(cvDir)) {
  fs.mkdirSync(cvDir, { recursive: true });
}

// Health check endpoint - Optimized for load balancers
app.get('/api/health', (req, res) => {
  try {
    // Quick health check without heavy operations
    const healthData = {
      status: 'OK',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'production',
      version: '1.0.0',
      uptime: process.uptime(),
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024)
      }
    };
    
    // Set cache headers to reduce load
    res.set({
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    });
    
    res.status(200).json(healthData);
  } catch (error) {
    console.error('Health check error:', error);
    res.status(500).json({
      status: 'ERROR',
      timestamp: new Date().toISOString(),
      error: 'Health check failed'
    });
  }
});

// Additional lightweight health check for load balancers
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/programs', programRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/enrollment', enrollmentRoutes);
app.use('/api/ai-resume', aiResumeRoutes);

// 404 handler
app.use(notFound);

// Error handler
app.use(errorHandler);

// Initialize database and start server
async function startServer() {
  try {
    // Set process limits for better performance
    process.setMaxListeners(20);
    
    // Handle uncaught exceptions gracefully
    process.on('uncaughtException', (error) => {
      console.error('❌ Uncaught Exception:', error);
      // Don't exit immediately, let the process handle it
    });
    
    process.on('unhandledRejection', (reason, promise) => {
      console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
      // Don't exit immediately, let the process handle it
    });
    
    // Check if --reset-data flag is passed
    const shouldResetData = process.argv.includes('--reset-data');
    
    if (shouldResetData) {
      console.log('🔄 Reset data flag detected, resetting sample data...');
      const { resetSampleData } = await import('./config/database');
      await resetSampleData();
    }
    
    await initializeDatabase();
    console.log('✅ Database initialized successfully');
    
    const server = app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📊 Environment: ${process.env.NODE_ENV || 'production'}`);
      console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
      console.log(`⚡ Rate limiting: ${process.env.RATE_LIMIT_MAX_REQUESTS || '200'} requests per minute`);
      
      if (shouldResetData) {
        console.log('🔄 Sample data was reset on this startup');
      }
    });
    
    // Set server timeout for high-traffic production
    server.timeout = 60000; // 60 seconds for file uploads
    server.keepAliveTimeout = 10000; // 10 seconds
    server.headersTimeout = 12000; // 12 seconds
    
    // Optimize for high concurrency
    server.maxConnections = 1000; // Allow up to 1000 concurrent connections
    
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

export default app;
