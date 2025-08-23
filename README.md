# CodeSpaze – Global Tech Learning & Career Platform

A futuristic full-stack platform for tech learning and career development with AI/ML themes, glassmorphism design, and comprehensive program management.

## 🚀 Features

- **Modern Tech Stack**: React.js + TypeScript, Node.js + Express.js, Neon DB (PostgreSQL)
- **Authentication**: Neon Auth with Google & GitHub OAuth
- **Futuristic Design**: Glassmorphism cards, neon glowing effects, gradient borders
- **Responsive**: Desktop, tablet, and mobile optimized
- **Program Management**: Internships, Fellowships, Accelerators, International Programs
- **Admin Panel**: Complete CRUD operations for programs and user management
- **Portfolio-First**: Every program includes project deliverables
- **Global Pricing**: India and Global pricing for all programs

## 🛠 Tech Stack

- **Frontend**: React.js + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express.js + TypeScript
- **Database**: Neon DB (PostgreSQL)
- **Authentication**: Neon Auth
- **Deployment**: Render
- **Styling**: Tailwind CSS with custom animations
- **Code Quality**: ESLint + Prettier

## 📁 Project Structure

```
codespaze-platform/
├── client/                 # React frontend
├── server/                 # Node.js backend
├── shared/                 # Shared types and utilities
├── package.json           # Root package.json
└── README.md              # This file
```

## 🚀 Quick Start

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd codespaze-platform
   npm run install-all
   ```

2. **Environment Setup**
   - Copy `.env.example` to `.env` in both `client/` and `server/` directories
   - Fill in your Neon DB and Neon Auth credentials

3. **Development**
   ```bash
   npm run dev
   ```

4. **Production Build**
   ```bash
   npm run build
   npm start
   ```

## 🌟 Key Features

### Landing Page
- Fullscreen hero with animated AI/ML illustrations
- Futuristic design with particle animations
- Call-to-action buttons for program exploration

### Programs Page
- Dynamic program cards with filtering
- India and Global pricing display
- Progress tracking for enrolled users

### Dashboard
- Personalized user experience
- Program progress tracking
- Project management
- Career services integration

### Admin Panel
- Complete program and product management
- User analytics and management
- Secure admin authentication

## 🎨 Design System

- **Primary Color**: #c1ff72 (Neon Green)
- **Secondary Color**: #00a560 (Emerald)
- **Background**: Black (#000000)
- **Typography**: Futuristic sans-serif
- **Effects**: Glassmorphism, neon glows, gradient borders

## 🔧 Configuration

### Environment Variables

**Server (.env)**
```
PORT=5000
NODE_ENV=development
NEON_DATABASE_URL=your_neon_db_url
NEON_AUTH_SECRET=your_neon_auth_secret
JWT_SECRET=your_jwt_secret
```

**Client (.env)**
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_NEON_AUTH_URL=your_neon_auth_url
```

## 📊 Database Schema

- **Users**: Authentication, roles, enrolled programs
- **Programs**: Title, description, pricing, duration
- **Products**: Platform products and services
- **Projects**: User project submissions and progress

## 🚀 Deployment

The platform is configured for deployment on Render:

1. Connect your GitHub repository
2. Set environment variables in Render dashboard
3. Deploy both frontend and backend services

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

For support and questions, please contact the CodeSpaze team.
