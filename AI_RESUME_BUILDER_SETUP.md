# AI Resume Builder Setup Guide

## Overview
The AI Resume Builder has been updated to work with real AI services instead of dummy data. It now makes secure API calls through the backend server to various AI providers.

## What Was Fixed

### Before (Dummy Data Issue)
- Client was trying to make direct AI API calls without proper API keys
- AI service was using hardcoded fallback responses
- No real AI integration was working

### After (Real AI Integration)
- Backend handles all AI API calls securely
- Client makes requests to backend endpoints
- Real AI content generation and suggestions
- Proper error handling and fallbacks

## Setup Instructions

### 1. Server Environment Variables
Create a `.env` file in the `server/` directory with your AI API keys:

```bash
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
NEON_DATABASE_URL=your-database-url

# Authentication
JWT_SECRET=your-jwt-secret
JWT_EXPIRES_IN=7d

# AI Service API Keys
GEMINI_API_KEY=your-gemini-api-key-here
MISTRALAI_API_KEY=your-mistralai-api-key-here
PERPLEXITY_API_KEY=your-perplexity-api-key-here
OPENAI_API_KEY=your-openai-api-key-here

# Other configurations...
```

### 2. Get AI API Keys

#### Google Gemini
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add it to `GEMINI_API_KEY` in your `.env` file

#### Mistral AI
1. Go to [Mistral AI Console](https://console.mistral.ai/)
2. Create an API key
3. Add it to `MISTRALAI_API_KEY` in your `.env` file

#### Perplexity AI
1. Go to [Perplexity AI](https://www.perplexity.ai/settings/api)
2. Generate an API key
3. Add it to `PERPLEXITY_API_KEY` in your `.env` file

### 3. Client Configuration
The client will automatically use the backend API. If you need to change the API URL, create a `.env` file in the `client/` directory:

```bash
REACT_APP_API_URL=http://localhost:5000/api
```

### 4. Start the Services

#### Start the Backend Server
```bash
cd server
npm install
npm run dev  # or npm start
```

#### Start the Frontend Client
```bash
cd client
npm install
npm start
```

## How It Works Now

### 1. User Interaction
- User fills out resume form
- Clicks "Generate Resume Content" or "Get AI Suggestions"

### 2. Backend Processing
- Client sends request to `/api/ai-resume/generate-content`
- Backend validates request and authentication
- Backend calls appropriate AI service (Gemini, Mistral, or Perplexity)
- Backend processes AI response and returns structured data

### 3. Frontend Display
- Client receives real AI-generated content
- Content is displayed in the resume form
- User can edit and customize the AI suggestions

## API Endpoints

### POST `/api/ai-resume/generate-content`
Generates AI content for resumes or portfolios.

**Request Body:**
```json
{
  "type": "resume",
  "input": {
    "jobTitle": "Software Engineer",
    "experience": "entry-level",
    "skills": ["JavaScript", "React", "Node.js"]
  },
  "preferences": {
    "tone": "professional",
    "length": "standard",
    "focus": "balanced"
  },
  "provider": "gemini"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "summary": "AI-generated professional summary...",
    "skills": [
      {
        "id": "skill1",
        "name": "Advanced JavaScript",
        "category": "technical",
        "proficiency": "advanced"
      }
    ]
  },
  "suggestions": [...]
}
```

### POST `/api/ai-resume/suggest-improvements`
Gets AI suggestions for improving existing resume/portfolio data.

**Request Body:**
```json
{
  "data": { /* resume/portfolio data */ },
  "provider": "gemini"
}
```

## Troubleshooting

### Common Issues

1. **"AI generation failed" Error**
   - Check if API keys are properly set in server `.env`
   - Verify the AI service is accessible
   - Check server logs for detailed error messages

2. **Authentication Errors**
   - Ensure user is logged in
   - Check if JWT token is valid
   - Verify authentication middleware is working

3. **CORS Issues**
   - Check `CORS_ORIGIN` in server `.env`
   - Ensure client URL matches the configured origin

### Debug Mode
Enable debug logging in the server by setting:
```bash
NODE_ENV=development
```

## Security Features

- **API Key Protection**: AI API keys are only stored on the backend
- **Authentication Required**: All AI endpoints require valid JWT tokens
- **Rate Limiting**: API calls are rate-limited to prevent abuse
- **Input Validation**: All requests are validated before processing

## Performance Considerations

- **Caching**: Consider implementing response caching for similar requests
- **Async Processing**: AI generation is handled asynchronously
- **Fallbacks**: Graceful degradation when AI services are unavailable
- **Error Handling**: Comprehensive error handling with user-friendly messages

## Next Steps

1. Test the AI generation with different providers
2. Customize the AI prompts for your specific use case
3. Implement response caching for better performance
4. Add more AI providers as needed
5. Consider implementing user preference storage for AI settings
