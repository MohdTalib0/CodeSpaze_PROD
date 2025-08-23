# CodeSpaze Platform Setup Guide

This guide will help you set up the complete CodeSpaze platform locally for development.

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Git**
- **Neon Database** account (for PostgreSQL)
- **Neon Auth** account (for authentication)

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd codespaze-platform
```

### 2. Install Dependencies

```bash
# Install root dependencies
npm install

# Install all project dependencies
npm run install-all
```

### 3. Environment Setup

#### Backend Environment Variables

Create `server/.env` file:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
NEON_DATABASE_URL=postgresql://username:password@host:port/database

# Authentication
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d

# Neon Auth Configuration
NEON_AUTH_SECRET=your-neon-auth-secret
NEON_AUTH_URL=https://your-neon-auth-domain.com

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# File Upload
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads
```

#### Frontend Environment Variables

Create `client/.env` file:

```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_NEON_AUTH_URL=your-neon-auth-url
```

### 4. Database Setup

1. **Create Neon Database:**
   - Sign up at [neon.tech](https://neon.tech)
   - Create a new project
   - Copy the connection string

2. **Update Environment Variables:**
   - Replace `NEON_DATABASE_URL` with your Neon connection string

3. **Initialize Database:**
   - The database tables will be created automatically when you start the server

### 5. Start Development Servers

```bash
# Start both frontend and backend
npm run dev

# Or start them separately:
npm run server  # Backend on http://localhost:5000
npm run client  # Frontend on http://localhost:3000
```

## 📁 Project Structure

```
codespaze-platform/
├── client/                 # React frontend
│   ├── public/            # Static files
│   ├── src/               # Source code
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React context
│   │   ├── services/      # API services
│   │   ├── types/         # TypeScript types
│   │   └── utils/         # Utility functions
│   ├── package.json       # Frontend dependencies
│   └── tailwind.config.js # Tailwind configuration
├── server/                 # Node.js backend
│   ├── src/               # Source code
│   │   ├── config/        # Configuration files
│   │   ├── middleware/    # Express middleware
│   │   ├── routes/        # API routes
│   │   └── index.ts       # Server entry point
│   ├── package.json       # Backend dependencies
│   └── tsconfig.json      # TypeScript configuration
├── package.json           # Root package.json
├── README.md              # Project documentation
└── render.yaml            # Deployment configuration
```

## 🛠 Development

### Available Scripts

#### Root Level
- `npm run dev` - Start both frontend and backend
- `npm run install-all` - Install all dependencies
- `npm run build` - Build frontend for production
- `npm start` - Start production server

#### Frontend (client/)
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

#### Backend (server/)
- `npm run dev` - Start development server with nodemon
- `npm run build` - Build TypeScript
- `npm start` - Start production server
- `npm test` - Run tests

### Code Quality

The project uses:
- **ESLint** for code linting
- **Prettier** for code formatting
- **TypeScript** for type safety
- **Husky** for git hooks (optional)

### Database Schema

The platform includes the following tables:
- `users` - User accounts and profiles
- `programs` - Learning programs
- `products` - Platform products
- `projects` - User project submissions
- `user_programs` - User program enrollments

## 🚀 Deployment

### Render Deployment

1. **Connect Repository:**
   - Connect your GitHub repository to Render
   - The `render.yaml` file will automatically configure services

2. **Set Environment Variables:**
   - Add all required environment variables in Render dashboard
   - Ensure production URLs are set correctly

3. **Deploy:**
   - Render will automatically build and deploy both services
   - Frontend: Static site
   - Backend: Node.js service

### Environment Variables for Production

Update the following in Render:
- `NODE_ENV=production`
- `CORS_ORIGIN=https://your-frontend-domain.com`
- `REACT_APP_API_URL=https://your-backend-domain.com/api`

## 🔧 Configuration

### Tailwind CSS

The project uses a custom Tailwind configuration with:
- Custom color palette (primary, secondary, dark themes)
- Custom animations and keyframes
- Glassmorphism utilities
- Responsive design utilities

### Authentication

The platform supports:
- Email/password authentication
- OAuth (GitHub, Google) via Neon Auth
- JWT token-based sessions
- Role-based access control (student/admin)

### API Endpoints

#### Public Endpoints
- `GET /api/health` - Health check
- `GET /api/programs` - List programs
- `GET /api/products` - List products
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

#### Protected Endpoints
- `GET /api/auth/me` - Get current user
- `GET /api/users/profile` - Get user profile
- `GET /api/programs/enrolled` - Get enrolled programs
- `POST /api/projects` - Create project

#### Admin Endpoints
- `GET /api/admin/dashboard` - Admin dashboard stats
- `POST /api/programs` - Create program
- `PUT /api/programs/:id` - Update program
- `DELETE /api/programs/:id` - Delete program

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Failed:**
   - Verify Neon database URL
   - Check network connectivity
   - Ensure database is active

2. **CORS Errors:**
   - Verify CORS_ORIGIN in environment variables
   - Check frontend URL configuration

3. **Build Failures:**
   - Clear node_modules and reinstall
   - Check TypeScript compilation errors
   - Verify all dependencies are installed

4. **Authentication Issues:**
   - Verify JWT_SECRET is set
   - Check token expiration settings
   - Ensure proper CORS configuration

### Development Tips

1. **Hot Reload:**
   - Frontend: Automatic with React Scripts
   - Backend: Uses nodemon for auto-restart

2. **Database Changes:**
   - Tables are created automatically on server start
   - Use migrations for production schema changes

3. **Environment Variables:**
   - Never commit .env files
   - Use .env.example for documentation
   - Set different values for development/production

## 📚 Additional Resources

- [React Documentation](https://reactjs.org/docs/)
- [Node.js Documentation](https://nodejs.org/docs/)
- [Express.js Documentation](https://expressjs.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Neon Database Documentation](https://neon.tech/docs)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Happy Coding! 🚀**
