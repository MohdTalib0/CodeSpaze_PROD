import express, { Request, Response } from 'express';
import multer from 'multer';
import { protect } from '../middleware/auth';
import { resumeService } from '../services/resumeService';
import pdf from 'pdf-parse';
import mammoth from 'mammoth';
import jsPDF from 'jspdf';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, Table, TableRow, TableCell, WidthType, BorderStyle } from 'docx';

const router = express.Router();

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, Word, and text files are allowed.'));
    }
  }
});

// AI Resume Builder Routes
router.post('/generate-content', protect, async (req: Request, res: Response) => {
  try {
    const { type, input, preferences, provider = 'gemini' } = req.body;

    // Validate input
    if (!type || !input) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields: type and input' 
      });
    }

    // Use smart fallback system
    const aiResponse = await generateWithFallback(type, input, preferences, provider);

    // Add provider information to response
    const responseWithProvider = {
      ...aiResponse,
      provider: (aiResponse as any).provider || provider,
      fallback: (aiResponse as any).fallback || false,
      originalProvider: (aiResponse as any).originalProvider || provider
    };
    
    res.json(responseWithProvider);
  } catch (error) {
    console.error('AI content generation failed:', error);
    res.status(500).json({ 
      success: false, 
      error: 'AI content generation failed' 
    });
  }
});

router.post('/suggest-improvements', protect, async (req: Request, res: Response) => {
  try {
    const { data, provider = 'gemini' } = req.body;

    if (!data) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing resume/portfolio data' 
      });
    }

    // Generate AI suggestions for improvements
    const suggestions = await generateSuggestions(data, provider);
    
    res.json({ 
      success: true, 
      suggestions 
    });
  } catch (error) {
    console.error('AI suggestions failed:', error);
    res.status(500).json({ 
      success: false, 
      error: 'AI suggestions failed' 
    });
  }
});

// Resume Upload and Extraction Route
router.post('/extract-resume', protect, upload.single('resume'), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No resume file uploaded'
      });
    }

    const { buffer, mimetype, originalname } = req.file;
    const userId = (req as any).user.id; // Get user ID from auth middleware
    
    console.log(`Processing resume: ${originalname} (${mimetype}) for user ${userId}`);

    // Save file to disk and database
    let resumeFileId: number;
    let storedFilePath: string;
    
    try {
      // Save file to disk
      const { storedFilename, filePath } = await resumeService.saveFileToDisk(buffer, originalname, userId);
      storedFilePath = filePath;
      
      // Save file record to database
      const fileData = {
        user_id: userId,
        original_filename: originalname,
        stored_filename: storedFilename,
        file_path: filePath,
        file_size: buffer.length,
        mime_type: mimetype,
        extraction_status: 'pending' as const,
        ai_processing_status: 'pending' as const
      };
      
      resumeFileId = await resumeService.saveResumeFile(fileData);
      console.log('Resume file saved to database with ID:', resumeFileId);
      
    } catch (fileError) {
      console.error('File saving failed:', fileError);
      res.status(500).json({
        success: false,
        error: 'Failed to save resume file'
      });
      return;
    }

    // Extract text content from the uploaded file
    let extractedText = '';
    
    try {
      console.log(`Processing file: ${originalname} (${mimetype})`);
      console.log('File size:', buffer.length, 'bytes');
      
      if (mimetype === 'text/plain') {
        // Handle plain text files
        console.log('Processing plain text file...');
        extractedText = buffer.toString('utf-8');
        console.log('Text file content length:', extractedText.length);
      } else if (mimetype === 'application/pdf') {
        // For PDF files, use pdf-parse library
        console.log('Processing PDF file...');
        extractedText = await extractTextFromPDF(buffer);
        console.log('PDF extraction completed, text length:', extractedText.length);
      } else if (mimetype.includes('word')) {
        // For Word documents, use mammoth library
        console.log('Processing Word document...');
        extractedText = await extractTextFromWord(buffer);
        console.log('Word extraction completed, text length:', extractedText.length);
      }
      
      if (!extractedText.trim()) {
        throw new Error('No text content could be extracted from the file');
      }
      
      console.log('Final extracted text length:', extractedText.length);
      console.log('Text preview:', extractedText.substring(0, 300));
      
      // Update file record with extracted text
      await resumeService.updateResumeFileExtraction(resumeFileId, extractedText, 'completed');
      
      // Use AI to parse and structure the extracted text
      console.log('Starting AI parsing...');
      const structuredData = await parseResumeWithAI(extractedText);
      console.log('AI parsing completed, structured data:', JSON.stringify(structuredData, null, 2));
      
      console.log('Processing dates in structured data...');
      console.log('Original experience dates:', structuredData.experience?.map((exp: any) => ({ 
        company: exp.company, 
        startDate: exp.startDate, 
        endDate: exp.endDate 
      })));
      console.log('Original education dates:', structuredData.education?.map((edu: any) => ({ 
        institution: edu.institution, 
        endDate: edu.endDate 
      })));
      
      // Helper function to sanitize text for JSON storage
      const sanitizeText = (text: string | null | undefined): string => {
        if (!text) return '';
        return text
          .replace(/\\/g, '\\\\')  // Escape backslashes
          .replace(/"/g, '\\"')    // Escape quotes
          .replace(/\n/g, ' ')    // Replace newlines with spaces
          .replace(/\r/g, ' ')    // Replace carriage returns with spaces
          .replace(/\t/g, ' ')    // Replace tabs with spaces
          .replace(/\u0000/g, '') // Remove null characters
          .replace(/\u0001/g, '') // Remove start of heading
          .replace(/\u0002/g, '') // Remove start of text
          .replace(/\u0003/g, '') // Remove end of text
          .replace(/\u0004/g, '') // Remove end of transmission
          .replace(/\u0005/g, '') // Remove enquiry
          .replace(/\u0006/g, '') // Remove acknowledge
          .replace(/\u0007/g, '') // Remove bell
          .replace(/\u0008/g, '') // Remove backspace
          .replace(/\u000B/g, '') // Remove vertical tab
          .replace(/\u000C/g, '') // Remove form feed
          .replace(/\u000E/g, '') // Remove shift out
          .replace(/\u000F/g, '') // Remove shift in
          .replace(/\u0010/g, '') // Remove data link escape
          .replace(/\u0011/g, '') // Remove device control 1
          .replace(/\u0012/g, '') // Remove device control 2
          .replace(/\u0013/g, '') // Remove device control 3
          .replace(/\u0014/g, '') // Remove device control 4
          .replace(/\u0015/g, '') // Remove negative acknowledge
          .replace(/\u0016/g, '') // Remove synchronous idle
          .replace(/\u0017/g, '') // Remove end of transmission block
          .replace(/\u0018/g, '') // Remove cancel
          .replace(/\u0019/g, '') // Remove end of medium
          .replace(/\u001A/g, '') // Remove substitute
          .replace(/\u001B/g, '') // Remove escape
          .replace(/\u001C/g, '') // Remove file separator
          .replace(/\u001D/g, '') // Remove group separator
          .replace(/\u001E/g, '') // Remove record separator
          .replace(/\u001F/g, '') // Remove unit separator
          .trim();
      };

      // Helper function to sanitize experience descriptions
      const sanitizeExperiences = (experiences: any[]): any[] => {
        return experiences.map(exp => ({
          ...exp,
          description: sanitizeText(exp.description)
        }));
      };

      // Helper function to sanitize education descriptions
      const sanitizeEducation = (education: any[]): any[] => {
        return education.map(edu => ({
          ...edu,
          description: sanitizeText(edu.description)
        }));
      };

      // Helper function to format dates to yyyy-MM format
      const formatDate = (dateStr: string | null | undefined): string => {
        if (!dateStr) return '';
        
        // Handle various date formats
        const date = dateStr.toString().trim().toLowerCase();
        
        // If it's already in yyyy-MM format, return as is
        if (/^\d{4}-\d{2}$/.test(date)) {
          return date;
        }
        
        // If it's just a year, add "-01" to make it yyyy-MM
        if (/^\d{4}$/.test(date)) {
          return `${date}-01`;
        }
        
        // If it's "current" or "present", use current date
        if (date === 'current' || date === 'present' || date === 'now') {
          const now = new Date();
          return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
        }
        
        // Try to parse other date formats
        try {
          const parsedDate = new Date(date);
          if (!isNaN(parsedDate.getTime())) {
            return `${parsedDate.getFullYear()}-${String(parsedDate.getMonth() + 1).padStart(2, '0')}`;
          }
        } catch (e) {
          // If parsing fails, return original with warning
          console.warn(`Could not parse date: ${dateStr}, using as-is`);
        }
        
        // Fallback: if it looks like a year, add "-01"
        if (/^\d{4}$/.test(date)) {
          return `${date}-01`;
        }
        
        return date;
      };

      // Helper function to recursively sanitize all text fields in objects and arrays
      const sanitizeObject = (obj: any): any => {
        if (obj === null || obj === undefined) return obj;
        
        if (typeof obj === 'string') {
          return sanitizeText(obj);
        }
        
        if (Array.isArray(obj)) {
          return obj.map(item => sanitizeObject(item));
        }
        
        if (typeof obj === 'object') {
          const sanitized: any = {};
          for (const [key, value] of Object.entries(obj)) {
            if (key === 'startDate' || key === 'endDate' || key === 'graduationYear') {
              // Format dates properly
              sanitized[key] = formatDate(value as string);
            } else {
              sanitized[key] = sanitizeObject(value);
            }
          }
          return sanitized;
        }
        
        return obj;
      };

      // Helper function to validate JSON data
      const validateJSONData = (data: any): boolean => {
        try {
          JSON.stringify(data);
          return true;
        } catch (error) {
          console.error('JSON validation failed:', error);
          return false;
        }
      };

      // Save structured data to database
      const resumeData = {
        user_id: userId,
        resume_file_id: resumeFileId,
        template_id: 'default', // Will be updated when user selects template
        template_name: 'Default Template',
        status: 'draft' as const,
        version: 1,
        is_current: true,
        
        // Personal Information
        first_name: structuredData.personalInfo?.firstName || '',
        last_name: structuredData.personalInfo?.lastName || '',
        email: structuredData.personalInfo?.email || '',
        phone: structuredData.personalInfo?.phone || '',
        title: structuredData.personalInfo?.title || '',
        location: structuredData.personalInfo?.location || '',
        linkedin_url: structuredData.personalInfo?.linkedin || '',
        github_url: structuredData.personalInfo?.github || '',
        
        // Content - recursively sanitize all text fields
        summary: sanitizeText(structuredData.summary),
        experiences: sanitizeObject(structuredData.experience || []),
        education: sanitizeObject(structuredData.education || []),
        skills: sanitizeObject(structuredData.skills || {}),
        
        // AI Enhancement
        ai_enhanced: false,
        completion_percentage: 0
      };
      
      // Log processed dates for debugging
      console.log('Processed experience dates:', resumeData.experiences?.map((exp: any) => ({ 
        company: exp.company, 
        startDate: exp.startDate, 
        endDate: exp.endDate 
      })));
      console.log('Processed education dates:', resumeData.education?.map((edu: any) => ({ 
        institution: edu.institution, 
        endDate: edu.endDate 
      })));
      
      console.log('Attempting to save resume details to database...');
      console.log('Sanitized resume data:', JSON.stringify(resumeData, null, 2));
      
      // Validate that the data can be properly serialized to JSON
      if (!validateJSONData(resumeData)) {
        throw new Error('Resume data contains invalid JSON characters');
      }
      
      try {
        const resumeDetailId = await resumeService.saveResumeDetail(resumeData);
        console.log('Resume details saved to database with ID:', resumeDetailId);
        
        // Add history record
        await resumeService.addResumeHistory({
          user_id: userId,
          resume_detail_id: resumeDetailId,
          action: 'resume_uploaded',
          action_details: { filename: originalname, file_size: buffer.length },
          new_data: structuredData,
          ai_enhancement_applied: false
        });
        
        res.json({
          success: true,
          data: structuredData,
          resume_file_id: resumeFileId,
          resume_detail_id: resumeDetailId,
          message: 'Resume content extracted and structured successfully'
        });
      } catch (dbError) {
        console.error('Database save failed:', dbError);
        
        // Clean up file from disk since database save failed
        await resumeService.deleteFileFromDisk(storedFilePath);
        
        res.status(500).json({
          success: false,
          error: 'Failed to save resume data to database',
          details: dbError instanceof Error ? dbError.message : 'Unknown database error'
        });
      }
      
    } catch (extractionError) {
      console.error('Text extraction failed:', extractionError);
      
      // Update file status to failed
      await resumeService.updateResumeFileExtraction(resumeFileId, '', 'failed');
      
      // Clean up file from disk
      await resumeService.deleteFileFromDisk(storedFilePath);
      
      res.status(500).json({
        success: false,
        error: `Failed to extract text content from the uploaded file: ${extractionError instanceof Error ? extractionError.message : 'Unknown error'}`
      });
    }
    
  } catch (error) {
    console.error('Resume extraction failed:', error);
    res.status(500).json({
      success: false,
      error: 'Resume extraction failed'
    });
  }
});

// AI Service Functions
async function generateWithGemini(type: string, input: any, preferences: any) {
  const apiKey = process.env.GEMINI_API_KEY;
  console.log('Debug: GEMINI_API_KEY value:', apiKey ? 'EXISTS' : 'MISSING');
  console.log('Debug: All env vars:', Object.keys(process.env).filter(key => key.includes('API')));
  
  if (!apiKey) {
    return {
      success: false,
      error: 'Gemini API key not configured'
    };
  }

  try {
    const prompt = buildPrompt(type, input, preferences);
    
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json() as any;
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
    return parseAIResponse(generatedText, 'gemini');
  } catch (error) {
    console.error('Gemini API call failed:', error);
    return {
      success: false,
      error: `Gemini API call failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}

async function generateWithMistral(type: string, input: any, preferences: any) {
  const apiKey = process.env.MISTRALAI_API_KEY;
  if (!apiKey) {
    return {
      success: false,
      error: 'Mistral API key not configured'
    };
  }

  try {
    const prompt = buildPrompt(type, input, preferences);
    
    const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'mistral-large-latest',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2048,
        top_p: 0.95
      })
    });

    if (!response.ok) {
      throw new Error(`Mistral API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json() as any;
    const generatedText = data.choices?.[0]?.message?.content || '';
    
    return parseAIResponse(generatedText, 'mistral');
  } catch (error) {
    console.error('Mistral API call failed:', error);
    return {
      success: false,
      error: `Mistral API call failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}

async function generateWithPerplexity(type: string, input: any, preferences: any) {
  const apiKey = process.env.PERPLEXITY_API_KEY;
  if (!apiKey) {
    return {
      success: false,
      error: 'Perplexity API key not configured'
    };
  }

  try {
    const prompt = buildPrompt(type, input, preferences);
    
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-large-128k-online',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2048,
        top_p: 0.95
      })
    });

    if (!response.ok) {
      throw new Error(`Perplexity API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json() as any;
    const generatedText = data.choices?.[0]?.message?.content || '';
    
    return parseAIResponse(generatedText, 'perplexity');
  } catch (error) {
    console.error('Perplexity API call failed:', error);
    return {
      success: false,
      error: `Perplexity API call failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}

// Smart AI generation with automatic fallback
async function generateWithFallback(type: string, input: any, preferences: any, preferredProvider: string = 'gemini') {
  console.log(`🔄 Starting AI generation with ${preferredProvider} as primary provider`);
  
  // Try preferred provider first
  let response = await generateWithProvider(preferredProvider, type, input, preferences);
  
  if (response.success) {
    console.log(`✅ ${preferredProvider} succeeded`);
    return response;
  }
  
  console.log(`❌ ${preferredProvider} failed, trying fallback providers...`);
  
  // Define fallback order based on preferred provider
  let fallbackOrder: string[] = [];
  
  if (preferredProvider === 'gemini') {
    fallbackOrder = ['perplexity', 'mistral'];
  } else if (preferredProvider === 'perplexity') {
    fallbackOrder = ['mistral', 'gemini'];
  } else if (preferredProvider === 'mistral') {
    fallbackOrder = ['perplexity', 'gemini'];
  }
  
  // Try fallback providers
  for (const fallbackProvider of fallbackOrder) {
    console.log(`🔄 Trying fallback: ${fallbackProvider}`);
    
    response = await generateWithProvider(fallbackProvider, type, input, preferences);
    
    if (response.success) {
      console.log(`✅ ${fallbackProvider} fallback succeeded`);
      return {
        ...response,
        provider: fallbackProvider,
        fallback: true,
        originalProvider: preferredProvider
      };
    }
    
    console.log(`❌ ${fallbackProvider} fallback failed`);
  }
  
  // All providers failed
  console.log(`❌ All AI providers failed`);
  return {
    success: false,
    error: 'All AI providers failed. Please try again later.',
    providers: [preferredProvider, ...fallbackOrder]
  };
}

// Helper function to call specific provider
async function generateWithProvider(provider: string, type: string, input: any, preferences: any) {
  switch (provider) {
    case 'gemini':
      return await generateWithGemini(type, input, preferences);
    case 'mistral':
      return await generateWithMistral(type, input, preferences);
    case 'perplexity':
      return await generateWithPerplexity(type, input, preferences);
    default:
      return await generateWithGemini(type, input, preferences);
  }
}

async function generateSuggestions(data: any, provider: string) {
  try {
    // Analyze the resume data to provide contextual suggestions
    const analysis = analyzeResumeData(data);
    
    const request = {
      type: 'resume',
      input: {
        jobTitle: data.personalInfo?.title || data.personalInfo?.jobTitle,
        industry: analysis.industry,
        experience: analysis.experienceLevel,
        skills: analysis.currentSkills,
        education: analysis.educationLevel,
        targetRole: data.personalInfo?.title || 'Professional Role'
      },
      preferences: {
        tone: 'professional',
        length: 'standard',
        focus: analysis.primaryFocus
      }
    };

    // Use fallback system for suggestions
    const response = await generateWithFallback(request.type, request.input, request.preferences, provider);
    
    if (response.success && 'suggestions' in response && response.suggestions) {
      return response.suggestions;
    }

    // Enhanced fallback suggestions based on data analysis
    return generateContextualSuggestions(analysis);
  } catch (error) {
    console.error('Failed to generate suggestions:', error);
    return generateBasicSuggestions();
  }
}

// Analyze resume data to provide better context for suggestions
function analyzeResumeData(data: any) {
  const analysis = {
    industry: 'Technology', // Default, could be enhanced with industry detection
    experienceLevel: 'entry',
    currentSkills: [],
    educationLevel: 'bachelor',
    primaryFocus: 'balanced',
    skillGaps: [],
    strengths: [],
    areasForImprovement: []
  };

  // Analyze experience level
  if (data.experience && data.experience.length > 0) {
    const totalYears = data.experience.reduce((total: number, exp: any) => {
      const start = new Date(exp.startDate);
      const end = exp.endDate === 'current' ? new Date() : new Date(exp.endDate);
      return total + (end.getFullYear() - start.getFullYear());
    }, 0);
    
    if (totalYears < 2) analysis.experienceLevel = 'entry';
    else if (totalYears < 5) analysis.experienceLevel = 'mid';
    else if (totalYears < 10) analysis.experienceLevel = 'senior';
    else analysis.experienceLevel = 'executive';
  }

  // Analyze skills
  if (data.skills) {
    analysis.currentSkills = [
      ...(data.skills.technical || []),
      ...(data.skills.soft || [])
    ];
    
    // Identify potential skill gaps
    const commonSkills = ['communication', 'leadership', 'problem solving', 'teamwork'];
    analysis.skillGaps = commonSkills.filter(skill => 
      !analysis.currentSkills.some(s => s.toLowerCase().includes(skill))
    );
  }

  // Analyze education
  if (data.education && data.education.length > 0) {
    const highestDegree = data.education.reduce((highest: string, edu: any) => {
      const degree = edu.degree?.toLowerCase() || '';
      if (degree.includes('phd') || degree.includes('doctorate')) return 'phd';
      if (degree.includes('master')) return 'master';
      if (degree.includes('bachelor') || degree.includes('bachelor')) return 'bachelor';
      return 'associate';
    }, 'associate');
    analysis.educationLevel = highestDegree;
  }

  // Determine primary focus based on analysis
  if (analysis.skillGaps.length > 2) analysis.primaryFocus = 'skills';
  else if (analysis.experienceLevel === 'entry') analysis.primaryFocus = 'experience';
  else analysis.primaryFocus = 'achievements';

  return analysis;
}

// Generate contextual suggestions based on resume analysis
function generateContextualSuggestions(analysis: any) {
  const suggestions = [];

  // Skills-focused suggestions
  if (analysis.primaryFocus === 'skills') {
    suggestions.push({
      type: 'skill',
      field: 'Skill Development',
      suggestion: `Focus on developing ${analysis.skillGaps.join(', ')} skills through training or projects`,
      confidence: 0.9,
      reasoning: 'These skills are commonly required across industries',
      priority: 'high'
    });
  }

  // Experience-focused suggestions
  if (analysis.experienceLevel === 'entry') {
    suggestions.push({
      type: 'experience',
      field: 'Work Experience',
      suggestion: 'Highlight internships, projects, and volunteer work to demonstrate practical skills',
      confidence: 0.9,
      reasoning: 'Entry-level candidates benefit from showing hands-on experience',
      priority: 'high'
    });
  }

  // Achievement-focused suggestions
  if (analysis.primaryFocus === 'achievements') {
    suggestions.push({
      type: 'experience',
      field: 'Quantified Results',
      suggestion: 'Add specific metrics and numbers to demonstrate your impact',
      confidence: 0.95,
      reasoning: 'Quantified achievements are more compelling to hiring managers',
      priority: 'high'
    });
  }

  // Always include these general suggestions
  suggestions.push(
    {
      type: 'format',
      field: 'ATS Optimization',
      suggestion: 'Use industry-standard keywords and clean formatting for better ATS compatibility',
      confidence: 0.9,
      reasoning: 'Most companies use ATS systems to screen resumes',
      priority: 'medium'
    },
    {
      type: 'summary',
      field: 'Professional Summary',
      suggestion: 'Create a compelling 3-4 sentence summary that highlights your unique value proposition',
      confidence: 0.85,
      reasoning: 'A strong summary helps you stand out in the first few seconds',
      priority: 'medium'
    }
  );

  return suggestions;
}

// Basic fallback suggestions
function generateBasicSuggestions() {
  return [
    {
      type: 'skill',
      field: 'Technical Skills',
      suggestion: 'Consider adding more specific technical skills relevant to your target role',
      confidence: 0.8,
      reasoning: 'Technical skills are highly valued by employers',
      priority: 'medium'
    },
    {
      type: 'experience',
      field: 'Work Experience',
      suggestion: 'Quantify your achievements with specific metrics and numbers',
      confidence: 0.9,
      reasoning: 'Quantified achievements demonstrate impact and value',
      priority: 'high'
    }
  ];
}

function buildPrompt(type: string, input: any, preferences: any): string {
  let prompt = `You are an expert career counselor, resume writer, and HR professional with 15+ years of experience in talent acquisition and career development. You specialize in creating compelling, ATS-friendly content that helps candidates stand out in competitive job markets.

YOUR EXPERTISE:
- Modern resume writing techniques and ATS optimization
- Industry-specific terminology and best practices
- Career progression strategies and skill development
- Professional branding and personal marketing

TASK: Create professional, engaging content for a ${type} that will help the candidate achieve their career goals.

CANDIDATE CONTEXT:`;
  
  if (input.jobTitle) {
    prompt += `\n- Target Job Title: ${input.jobTitle}`;
  }
  if (input.industry) {
    prompt += `\n- Target Industry: ${input.industry}`;
  }
  if (input.experience) {
    prompt += `\n- Experience Level: ${input.experience}`;
  }
  if (input.skills && input.skills.length > 0) {
    prompt += `\n- Current Skills: ${input.skills.join(', ')}`;
  }
  if (input.education) {
    prompt += `\n- Education Background: ${input.education}`;
  }
  if (input.targetRole) {
    prompt += `\n- Target Role: ${input.targetRole}`;
  }

  prompt += `\n\nCONTENT PREFERENCES:`;
  prompt += `\n- Tone: ${preferences.tone} (professional, confident, enthusiastic, or understated)`;
  prompt += `\n- Length: ${preferences.length} (concise, moderate, or detailed)`;
  prompt += `\n- Focus: ${preferences.focus} (achievements, skills, experience, or growth potential)`;

  prompt += `\n\nCONTENT REQUIREMENTS:`;
  prompt += `\n1. Professional Summary/Description:`;
  prompt += `\n   - 3-4 compelling sentences that highlight key strengths`;
  prompt += `\n   - Include relevant experience, skills, and career objectives`;
  prompt += `\n   - Use industry-specific keywords for ATS optimization`;
  prompt += `\n   - Focus on value proposition and unique selling points`;

  prompt += `\n\n2. Skills Enhancement:`;
  prompt += `\n   - Suggest relevant technical and soft skills`;
  prompt += `\n   - Include proficiency levels (beginner/intermediate/advanced/expert)`;
  prompt += `\n   - Add emerging skills that are in high demand`;
  prompt += `\n   - Consider industry trends and job market demands`;

  prompt += `\n\n3. Improvement Suggestions:`;
  prompt += `\n   - Specific, actionable recommendations`;
  prompt += `\n   - Focus on measurable improvements`;
  prompt += `\n   - Include examples and best practices`;
  prompt += `\n   - Address potential gaps or weaknesses`;

  prompt += `\n\n4. Additional Content Ideas:`;
  prompt += `\n   - Project highlights or achievements`;
  prompt += `\n   - Certifications or training recommendations`;
  prompt += `\n   - Industry-specific keywords or phrases`;
  prompt += `\n   - Career advancement strategies`;

  prompt += `\n\nOUTPUT FORMAT (JSON only):`;
  prompt += `\n{
  "summary": "professional summary text (3-4 sentences, compelling and specific)",
  "skills": [
    {
      "id": "unique_skill_id",
      "name": "Skill Name",
      "category": "technical|soft|industry_specific",
      "proficiency": "beginner|intermediate|advanced|expert",
      "description": "brief description of skill relevance",
      "market_demand": "high|medium|low"
    }
  ],
  "suggestions": [
    {
      "type": "summary|skill|experience|format",
      "field": "Specific Field Name",
      "suggestion": "detailed, actionable suggestion text",
      "confidence": 0.9,
      "reasoning": "explanation of why this suggestion will help",
      "priority": "high|medium|low"
    }
  ],
  "keywords": [
    "industry-specific keyword 1",
    "ATS-friendly keyword 2",
    "skill-related keyword 3"
  ]
}`;

  prompt += `\n\nQUALITY STANDARDS:`;
  prompt += `\n- Content must be original, engaging, and professional`;
  prompt += `\n- Use active voice and action verbs`;
  prompt += `\n- Include specific examples and quantifiable achievements`;
  prompt += `\n- Ensure ATS compatibility with relevant keywords`;
  prompt += `\n- Maintain consistency with the candidate's experience level`;
  prompt += `\n- Focus on value and impact, not just responsibilities`;

  prompt += `\n\nReturn ONLY the JSON object, no markdown formatting, no explanations, no additional text.`;

  return prompt;
}

function parseAIResponse(text: string, provider: string) {
  try {
    // Try to extract JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      
      return {
        success: true,
        data: {
          summary: parsed.summary || '',
          skills: parsed.skills || []
        },
        suggestions: parsed.suggestions || []
      };
    }

    // Fallback: parse unstructured text
    return {
      success: true,
      data: {
        summary: text.substring(0, 200) + '...',
        skills: []
      },
      suggestions: [
        {
          type: 'summary',
          field: 'Professional Summary',
          suggestion: 'AI-generated content available',
          confidence: 0.8,
          reasoning: `Generated by ${provider} AI`
        }
      ]
    };
  } catch (error) {
    console.error(`Failed to parse ${provider} response:`, error);
    return {
      success: false,
      error: `Failed to parse ${provider} response: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}

// Resume Text Extraction Helper Functions
async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  try {
    console.log('Extracting text from PDF...');
    const data = await pdf(buffer);
    console.log('PDF extraction successful, text length:', data.text.length);
    return data.text;
  } catch (error) {
    console.error('PDF extraction failed:', error);
    throw new Error(`Failed to extract text from PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

async function extractTextFromWord(buffer: Buffer): Promise<string> {
  try {
    console.log('Extracting text from Word document...');
    const result = await mammoth.extractRawText({ buffer });
    console.log('Word extraction successful, text length:', result.value.length);
    return result.value;
  } catch (error) {
    console.error('Word extraction failed:', error);
    throw new Error(`Failed to extract text from Word document: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

async function parseResumeWithAI(extractedText: string): Promise<any> {
  try {
    console.log('Starting AI parsing of extracted text...');
    console.log('Extracted text preview:', extractedText.substring(0, 200));
    
    // Use AI to parse and structure the extracted resume text
    const prompt = `You are an expert resume parser and career analyst with 15+ years of experience in HR and recruitment. Your task is to analyze the following resume text and extract structured information with high accuracy.

IMPORTANT INSTRUCTIONS:
- Extract ALL work experiences, education entries, and skills mentioned
- Use exact dates when available, or estimate reasonable dates if only years are given
- For current positions, use "current" as end date
- Extract detailed job descriptions and achievements
- Identify both technical and soft skills
- Maintain the original meaning and context
- Return ONLY valid JSON, no explanations or additional text

RESUME TEXT TO ANALYZE:
${extractedText.substring(0, 4000)}

REQUIRED OUTPUT FORMAT (JSON):
{
  "personalInfo": {
    "firstName": "string (extract from name section)",
    "lastName": "string (extract from name section)", 
    "email": "string (extract email address)",
    "phone": "string (extract phone number)",
    "title": "string (extract job title/headline)",
    "location": "string (extract city, state, or country)",
    "linkedin": "string (extract LinkedIn URL if present)",
    "github": "string (extract GitHub URL if present)"
  },
  "summary": "string (extract professional summary/objective, 2-4 sentences)",
  "experience": [
    {
      "company": "string (exact company name)",
      "position": "string (exact job title)",
      "startDate": "string (format: YYYY-MM or YYYY, convert 'current' to actual date)",
      "endDate": "string (format: YYYY-MM or YYYY, use 'current' for ongoing positions)",
      "description": "string (detailed job description with achievements, 2-4 sentences)"
    }
  ],
  "education": [
    {
      "institution": "string (exact institution name)",
      "degree": "string (exact degree name)",
      "field": "string (field of study/major)",
      "endDate": "string (format: YYYY-MM or YYYY, graduation year)",
      "gpa": "number (if mentioned, otherwise null)"
    }
  ],
  "skills": {
    "technical": ["string (programming languages, tools, technologies, software)"],
    "soft": ["string (leadership, communication, problem-solving, teamwork)"]
  },
  "projects": [
    {
      "name": "string (project name)",
      "description": "string (project description and technologies used)",
      "url": "string (if available)"
    }
  ],
  "certifications": [
    {
      "name": "string (certification name)",
      "issuer": "string (issuing organization)",
      "date": "string (date obtained, format: YYYY-MM or YYYY)"
    }
  ],
  "languages": [
    {
      "language": "string (language name)",
      "proficiency": "string (fluent, proficient, intermediate, basic)"
    }
  ]
}

EXTRACTION RULES:
1. Work Experience: Extract ALL positions, even if they seem minor
2. Education: Include ALL degrees, certifications, and training
3. Skills: Categorize as technical (hard skills) or soft (interpersonal skills)
4. Dates: Convert all dates to YYYY-MM format when possible
5. Descriptions: Keep original text but clean up formatting
6. Accuracy: Prioritize accuracy over completeness - if unsure, omit rather than guess

Return ONLY the JSON object, no markdown formatting, no explanations.`;

    // Use Gemini to parse the resume
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('Gemini API key not configured');
    }

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          role: 'user',
          parts: [{
            text: prompt
          }]
        }],
        systemInstruction: {
          parts: [{
            text: `You are an expert resume parser with 15+ years of experience in HR and recruitment. Your task is to extract structured information from resume text with high accuracy. Always return valid JSON format, no explanations or additional text. Focus on precision and completeness.`
          }]
        },
        generationConfig: {
          temperature: 0.05, // Very low temperature for consistent, accurate parsing
          maxOutputTokens: 4096, // Increased for more detailed responses
          topP: 0.8, // Focus on most likely tokens
          topK: 40, // Limit token selection for consistency
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json() as any;
    const aiResponse = result.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
    // Parse the AI response
    try {
      console.log('AI response received:', aiResponse.substring(0, 500));
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        console.log('Successfully parsed AI response to JSON');
        return parsed;
      } else {
        console.log('No JSON found in AI response');
      }
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      console.log('Raw AI response:', aiResponse);
    }

    // Fallback: return basic structure with extracted text
    console.log('Using fallback parsing - AI parsing failed');
    const fallbackData = {
      personalInfo: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        title: '',
        location: '',
        linkedin: '',
        github: ''
      },
      summary: extractedText.substring(0, 500),
      experience: [],
      education: [],
      skills: {
        technical: [],
        soft: []
      },
      projects: [],
      certifications: [],
      languages: []
    };
    
    // Try to extract basic information using simple text parsing
    try {
      const lines = extractedText.split('\n').map(line => line.trim()).filter(line => line.length > 0);
      
      // Look for email
      const emailMatch = extractedText.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/);
      if (emailMatch) {
        fallbackData.personalInfo.email = emailMatch[0];
      }
      
      // Look for phone
      const phoneMatch = extractedText.match(/(\+\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
      if (phoneMatch) {
        fallbackData.personalInfo.phone = phoneMatch[0];
      }
      
      // Look for potential names (first two lines that look like names)
      const nameLines = lines.filter(line => 
        line.length > 2 && 
        line.length < 50 && 
        !line.includes('@') && 
        !line.includes('http') &&
        !line.includes('www') &&
        !line.match(/^\d/)
      );
      
      if (nameLines.length >= 2) {
        fallbackData.personalInfo.firstName = nameLines[0];
        fallbackData.personalInfo.lastName = nameLines[1];
      } else if (nameLines.length === 1) {
        const nameParts = nameLines[0].split(' ');
        if (nameParts.length >= 2) {
          fallbackData.personalInfo.firstName = nameParts[0];
          fallbackData.personalInfo.lastName = nameParts.slice(1).join(' ');
        }
      }
      
      console.log('Fallback parsing completed with basic extraction');
    } catch (fallbackError) {
      console.error('Fallback parsing also failed:', fallbackError);
    }
    
    return fallbackData;
    
  } catch (error) {
    console.error('AI resume parsing failed:', error);
    // Return basic structure as fallback
    return {
      personalInfo: {},
      summary: extractedText.substring(0, 500),
      experience: [],
      education: [],
      skills: { technical: [], soft: [] },
      projects: [],
      certifications: [],
      languages: []
    };
      }
  }

  // Update Resume Status Route
  router.patch('/update-status/:resumeId', protect, async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user.id;
      const { resumeId } = req.params;
      const { status, notes } = req.body;

      if (!status || !['draft', 'completed', 'published'].includes(status)) {
        return res.status(400).json({
          success: false,
          error: 'Invalid status. Must be draft, completed, or published'
        });
      }

      // Update the resume status
      await resumeService.updateResumeStatus(parseInt(resumeId), userId, status, notes);

      // Add to history
      await resumeService.addResumeHistory({
        user_id: userId,
        resume_detail_id: parseInt(resumeId),
        action: 'status_change',
        action_details: { status, notes },
        status_before: 'draft', // We'll get this from the service
        status_after: status,
        version_before: 1,
        version_after: 1
      });

      res.json({
        success: true,
        message: `Resume status updated to ${status}`,
        data: { status, notes }
      });
    } catch (error) {
      console.error('Error updating resume status:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to update resume status'
      });
    }
  });

  // Get Resume for Viewing/Export Route
  router.get('/resume/:resumeId', protect, async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user.id;
      const { resumeId } = req.params;

      const resume = await resumeService.getResumeDetail(parseInt(resumeId));
      
      if (!resume || resume.user_id !== userId) {
        return res.status(404).json({
          success: false,
          error: 'Resume not found'
        });
      }

      res.json({
        success: true,
        data: resume
      });
    } catch (error) {
      console.error('Error fetching resume:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch resume'
      });
    }
  });

  // Export Resume to PDF Route
  router.post('/export-pdf/:resumeId', protect, async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user.id;
      const { resumeId } = req.params;
      const { template_id } = req.body;

      const resume = await resumeService.getResumeDetail(parseInt(resumeId));
      
      if (!resume || resume.user_id !== userId) {
        return res.status(404).json({
          success: false,
          error: 'Resume not found'
        });
      }

      // Generate PDF using the specified template
      const pdfBuffer = await generateResumePDF(resume, template_id);

      // Set response headers for PDF download
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="${resume.first_name}_${resume.last_name}_Resume.pdf"`);
      res.setHeader('Content-Length', pdfBuffer.length);

      res.send(pdfBuffer);
    } catch (error) {
      console.error('Error exporting resume to PDF:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to export resume to PDF'
      });
    }
  });

  // Export Resume to DOCX Route
  router.post('/export-docx/:resumeId', protect, async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user.id;
      const { resumeId } = req.params;
      const { template_id } = req.body;

      const resume = await resumeService.getResumeDetail(parseInt(resumeId));
      
      if (!resume || resume.user_id !== userId) {
        return res.status(404).json({
          success: false,
          error: 'Resume not found'
        });
      }

      // Generate DOCX using the specified template
      const docxBuffer = await generateResumeDOCX(resume, template_id);

      // Set response headers for DOCX download
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
      res.setHeader('Content-Disposition', `attachment; filename="${resume.first_name}_${resume.last_name}_Resume.docx"`);
      res.setHeader('Content-Length', docxBuffer.length);

      res.send(docxBuffer);
    } catch (error) {
      console.error('Error exporting resume to DOCX:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to export resume to DOCX'
      });
    }
  });

  // Temporary Export Routes (for unsaved resumes)
  router.post('/export-pdf-temp', protect, async (req: Request, res: Response) => {
    try {
      const { template_id, resume_data } = req.body;

      if (!resume_data || !template_id) {
        return res.status(400).json({
          success: false,
          error: 'Missing required fields: resume_data, template_id'
        });
      }

      // Generate PDF using the provided form data
      const pdfBuffer = await generateResumePDF(resume_data, template_id);

      // Set response headers for PDF download
      const fileName = `resume_${resume_data.first_name || 'my'}_${resume_data.last_name || 'resume'}.pdf`;
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
      res.setHeader('Content-Length', pdfBuffer.length);

      res.send(pdfBuffer);
    } catch (error) {
      console.error('Error exporting resume to PDF:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to export resume to PDF'
      });
    }
  });

  router.post('/export-docx-temp', protect, async (req: Request, res: Response) => {
    try {
      const { template_id, resume_data } = req.body;

      if (!resume_data || !template_id) {
        return res.status(400).json({
          success: false,
          error: 'Missing required fields: resume_data, template_id'
        });
      }

      // Generate DOCX using the provided form data
      const docxBuffer = await generateResumeDOCX(resume_data, template_id);

      // Set response headers for DOCX download
      const fileName = `resume_${resume_data.first_name || 'my'}_${resume_data.last_name || 'resume'}.docx`;
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
      res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
      res.setHeader('Content-Length', docxBuffer.length);

      res.send(docxBuffer);
    } catch (error) {
      console.error('Error exporting resume to DOCX:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to export resume to DOCX'
      });
    }
  });

  // Save Resume Data Route
  router.post('/save-resume', protect, async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user.id;
      const { 
        resume_detail_id, 
        template_id, 
        template_name, 
        resume_data, 
        status = 'draft' 
      } = req.body;

      if (!resume_data || !template_id || !template_name) {
        return res.status(400).json({
          success: false,
          error: 'Missing required fields: resume_data, template_id, template_name'
        });
      }

      let resumeDetailId = resume_detail_id;

      if (!resumeDetailId) {
        // Create new resume detail
        resumeDetailId = await resumeService.createNewVersion(userId, template_id, template_name);
      }

      // Calculate completion percentage
      const completionPercentage = await resumeService.calculateCompletionPercentage(resume_data);

      // Prepare resume data for saving
      const resumeData = {
        user_id: userId,
        template_id,
        template_name,
        status,
        version: 1, // Will be updated by the service
        is_current: true,
        
        // Personal Information
        first_name: resume_data.firstName || resume_data.first_name,
        last_name: resume_data.lastName || resume_data.last_name,
        email: resume_data.email,
        phone: resume_data.phone,
        title: resume_data.title,
        location: resume_data.location,
        linkedin_url: resume_data.linkedin || resume_data.linkedin_url,
        github_url: resume_data.github || resume_data.github_url,
        
        // Content
        summary: resume_data.summary,
        experiences: resume_data.experiences || [],
        education: resume_data.education || [],
        skills: resume_data.skills || {},
        projects: resume_data.projects || [],
        certifications: resume_data.certifications || [],
        languages: resume_data.languages || [],
        resume_references: resume_data.resume_references || [],
        custom_sections: resume_data.custom_sections || [],
        
        // AI Enhancement
        ai_enhanced: resume_data.ai_enhanced || false,
        ai_suggestions: resume_data.ai_suggestions || [],
        ai_enhancement_date: resume_data.ai_enhancement_date,
        
        // Metadata
        completion_percentage: completionPercentage,
        tags: resume_data.tags || [],
        notes: resume_data.notes || ''
      };

      // Save or update resume detail
      if (resume_detail_id) {
        await resumeService.updateResumeDetail(resumeDetailId, resumeData);
      } else {
        resumeDetailId = await resumeService.saveResumeDetail(resumeData);
      }

      // Add history record
      await resumeService.addResumeHistory({
        user_id: userId,
        resume_detail_id: resumeDetailId,
        action: 'resume_saved',
        action_details: { template_id, template_name, status },
        new_data: resume_data,
        ai_enhancement_applied: resume_data.ai_enhanced || false
      });

      res.json({
        success: true,
        resume_detail_id: resumeDetailId,
        completion_percentage: completionPercentage,
        message: 'Resume saved successfully'
      });

    } catch (error) {
      console.error('Resume save failed:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to save resume'
      });
    }
  });

  // Get User Resumes Route
  router.get('/user-resumes', protect, async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user.id;
      
      const resumes = await resumeService.getUserResumes(userId);
      const resumeFiles = await resumeService.getUserResumeFiles(userId);
      
      res.json({
        success: true,
        resumes,
        resume_files: resumeFiles
      });

    } catch (error) {
      console.error('Failed to get user resumes:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to get user resumes'
      });
    }
  });

  // Get Resume History Route
  router.get('/resume-history/:resumeId', protect, async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user.id;
      const resumeId = parseInt(req.params.resumeId);
      
      const history = await resumeService.getResumeHistory(resumeId);
      
      res.json({
        success: true,
        history
      });

    } catch (error) {
      console.error('Failed to get resume history:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to get resume history'
      });
    }
  });


// PDF Generation Function
async function generateResumePDF(resume: any, templateId: string): Promise<Buffer> {
  try {
    console.log('🔍 PDF Generation Debug - Resume data:', JSON.stringify(resume, null, 2));
    console.log('🔍 PDF Generation Debug - Template ID:', templateId);
    
    const doc = new jsPDF();
    
    // Template-specific styling based on templateId
    let primaryColor = [0, 0, 0]; // Default black
    let secondaryColor = [100, 100, 100]; // Default gray
    let accentColor = [0, 123, 255]; // Default blue
    
    // Set colors based on template
    console.log('🔍 Color Debug - Template ID:', templateId);
    
    if (templateId === 'modern-professional') {
      primaryColor = [0, 0, 0]; // Black
      secondaryColor = [51, 51, 51]; // Dark gray
      accentColor = [0, 123, 255]; // Blue
      console.log('🔍 Color Debug - Using Modern Professional colors');
    } else if (templateId === 'creative-portfolio') {
      primaryColor = [0, 0, 0]; // Black
      secondaryColor = [51, 51, 51]; // Dark gray
      accentColor = [255, 69, 0]; // Orange
      console.log('🔍 Color Debug - Using Creative Portfolio colors');
    } else if (templateId === 'classic-elegant') {
      primaryColor = [0, 0, 0]; // Black
      secondaryColor = [51, 51, 51]; // Dark gray
      accentColor = [128, 128, 128]; // Gray
      console.log('🔍 Color Debug - Using Classic Elegant colors');
    } else if (templateId === 'minimal-clean') {
      primaryColor = [0, 0, 0]; // Black
      secondaryColor = [51, 51, 51]; // Dark gray
      accentColor = [34, 197, 94]; // Green
      console.log('🔍 Color Debug - Using Minimal Clean colors');
    } else {
      console.log('🔍 Color Debug - Using default colors for unknown template:', templateId);
    }
    
    console.log('🔍 Color Debug - Final colors:', { primaryColor, secondaryColor, accentColor });
    
    // Helper function to set text color
    const setTextColor = (color: number[]) => {
      doc.setTextColor(color[0], color[1], color[2]);
    };
    
    // Helper function to draw colored line
    const drawColoredLine = (x: number, y: number, width: number, color: number[]) => {
      doc.setDrawColor(color[0], color[1], color[2]);
      doc.setLineWidth(0.5);
      doc.line(x, y, x + width, y);
    };
    
    // Header - Name and Title with template colors
    setTextColor(primaryColor);
    doc.setFontSize(28);
    doc.setFont('helvetica', 'bold');
    
    // Debug: Log what we're trying to access
    console.log('🔍 Header Debug - first_name:', resume.first_name);
    console.log('🔍 Header Debug - last_name:', resume.last_name);
    console.log('🔍 Header Debug - title:', resume.title);
    console.log('🔍 Header Debug - email:', resume.email);
    console.log('🔍 Header Debug - phone:', resume.phone);
    console.log('🔍 Header Debug - location:', resume.location);
    
    // Handle different field naming conventions from templates
    const firstName = resume.first_name || resume.firstName || '';
    const lastName = resume.last_name || resume.lastName || '';
    const fullName = `${firstName} ${lastName}`.trim();
    console.log('🔍 Header Debug - fullName:', fullName);
    
    if (fullName) {
      doc.text(fullName, 20, 30);
    } else {
      // Fallback if no name
      doc.text('Your Name', 20, 30);
    }
    
    const jobTitle = resume.title || resume.jobTitle || resume.job_title || '';
    if (jobTitle) {
      setTextColor(accentColor);
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bold');
      doc.text(jobTitle, 20, 42);
    }
    
    // Draw accent line under header
    drawColoredLine(20, 45, 170, accentColor);
    
    // Contact Information with template styling
    let yPosition = 60;
    setTextColor(secondaryColor);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    
    const contactInfo: string[] = [];
    const email = resume.email || resume.email_address || '';
    const phone = resume.phone || resume.phone_number || '';
    const location = resume.location || resume.address || '';
    
    if (email) contactInfo.push(`📧 ${email}`);
    if (phone) contactInfo.push(`📱 ${phone}`);
    if (location) contactInfo.push(`📍 ${location}`);
    
    if (contactInfo.length > 0) {
      // Center contact info
      const contactText = contactInfo.join('  |  ');
      const contactWidth = doc.getTextWidth(contactText);
      const contactX = (210 - contactWidth) / 2;
      doc.text(contactText, contactX, yPosition);
      yPosition += 15;
    }
    
    // Professional Summary with template styling
    if (resume.summary) {
      setTextColor(primaryColor);
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('Professional Summary', 20, yPosition);
      yPosition += 8;
      
      // Draw accent line under section header
      drawColoredLine(20, yPosition, 170, accentColor);
      yPosition += 12;
      
      setTextColor(secondaryColor);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      
      // Split summary into lines that fit the page width
      const summaryLines = doc.splitTextToSize(resume.summary, 170);
      doc.text(summaryLines, 20, yPosition);
      yPosition += (summaryLines.length * 6) + 15;
    }
    
    // Work Experience with template styling
    // Check for experiences in different possible locations based on template structure
    const experiences = resume.experiences || resume.experience || [];
    
    if (experiences && Array.isArray(experiences)) {
      setTextColor(primaryColor);
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('Work Experience', 20, yPosition);
      yPosition += 8;
      
      // Draw accent line under section header
      drawColoredLine(20, yPosition, 170, accentColor);
      yPosition += 12;
      
      experiences.forEach((_: any, index: number) => {
        // Try different field naming conventions
        const company = resume[`company_${index}`] || resume[`company${index}`] || '';
        const position = resume[`position_${index}`] || resume[`position${index}`] || '';
        const startDate = resume[`startDate_${index}`] || resume[`startDate${index}`] || '';
        const endDate = resume[`endDate_${index}`] || resume[`endDate${index}`] || '';
        const description = resume[`description_${index}`] || resume[`description${index}`] || '';
        
        console.log(`🔍 Experience Debug - Index ${index}:`, { company, position, startDate, endDate, description });
        
        if (company && position) {
          // Check if we need a new page
          if (yPosition > 250) {
            doc.addPage();
            yPosition = 20;
          }
          
          // Position with accent color
          setTextColor(accentColor);
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(13);
          doc.text(position, 20, yPosition);
          yPosition += 7;
          
          // Company and dates with secondary color
          setTextColor(secondaryColor);
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(11);
          doc.text(company, 20, yPosition);
          yPosition += 6;
          
          doc.setFont('helvetica', 'normal');
          doc.text(`${startDate} - ${endDate || 'Present'}`, 20, yPosition);
          yPosition += 6;
          
          // Description with secondary color
          if (description) {
            const descLines = doc.splitTextToSize(description, 170);
            doc.text(descLines, 20, yPosition);
            yPosition += (descLines.length * 6) + 5;
          }
          
          yPosition += 8;
        }
      });
    }
    
    // Education with template styling
    // Check for education in different possible locations based on template structure
    const educations = resume.educations || resume.education || [];
    
    if (educations && Array.isArray(educations)) {
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }
      
      setTextColor(primaryColor);
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('Education', 20, yPosition);
      yPosition += 8;
      
      // Draw accent line under section header
      drawColoredLine(20, yPosition, 170, accentColor);
      yPosition += 12;
      
      educations.forEach((_: any, index: number) => {
        // Try different field naming conventions
        const degree = resume[`degree_${index}`] || resume[`degree${index}`] || '';
        const school = resume[`school_${index}`] || resume[`school${index}`] || '';
        const graduationYear = resume[`graduationYear_${index}`] || resume[`graduationYear${index}`] || '';
        const gpa = resume[`gpa_${index}`] || resume[`gpa${index}`] || '';
        
        console.log(`🔍 Education Debug - Index ${index}:`, { degree, school, graduationYear, gpa });
        
        if (degree && school) {
          // Degree with accent color
          setTextColor(accentColor);
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(13);
          doc.text(degree, 20, yPosition);
          yPosition += 7;
          
          // School and details with secondary color
          setTextColor(secondaryColor);
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(11);
          doc.text(school, 20, yPosition);
          yPosition += 6;
          
          doc.setFont('helvetica', 'normal');
          doc.text(`${graduationYear || 'Graduation Year'}`, 20, yPosition);
          yPosition += 6;
          
          if (gpa) {
            doc.text(`GPA: ${gpa}`, 20, yPosition);
            yPosition += 6;
          }
          
          yPosition += 8;
        }
      });
    }
    
    // Skills with template styling
    // Check for skills in different possible locations based on template structure
    const hasSkills = resume.skills || resume.technicalSkills || resume.softSkills;
    
    if (hasSkills) {
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }
      
      setTextColor(primaryColor);
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('Skills', 20, yPosition);
      yPosition += 8;
      
      // Draw accent line under section header
      drawColoredLine(20, yPosition, 170, accentColor);
      yPosition += 12;
      
      setTextColor(secondaryColor);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      
      // Handle skills properly - convert array to readable text
      let skillsText = '';
      console.log('🔍 Skills Debug - resume.skills:', resume.skills);
      console.log('🔍 Skills Debug - resume.technicalSkills:', resume.technicalSkills);
      console.log('🔍 Skills Debug - resume.softSkills:', resume.softSkills);
      
      // Combine all skills from different sources
      const allSkills: string[] = [];
      
      // Add technical skills
      if (resume.technicalSkills && Array.isArray(resume.technicalSkills)) {
        allSkills.push(...resume.technicalSkills.filter((skill: any) => skill && typeof skill === 'string' && skill.trim()));
      }
      
      // Add soft skills
      if (resume.softSkills && Array.isArray(resume.softSkills)) {
        allSkills.push(...resume.softSkills.filter((skill: any) => skill && typeof skill === 'string' && skill.trim()));
      }
      
      // Add general skills
      if (resume.skills) {
        if (Array.isArray(resume.skills)) {
          allSkills.push(...resume.skills.filter((skill: any) => skill && typeof skill === 'string' && skill.trim()));
        } else if (typeof resume.skills === 'string') {
          allSkills.push(resume.skills);
        }
      }
      
      // Remove duplicates and join
      const uniqueSkills = [...new Set(allSkills)];
      skillsText = uniqueSkills.join(', ');
      
      console.log('🔍 Skills Debug - Final skillsText:', skillsText);
      
      if (skillsText) {
        // Split skills into multiple lines if too long
        const skillsLines = doc.splitTextToSize(skillsText, 170);
        doc.text(skillsLines, 20, yPosition);
        yPosition += (skillsLines.length * 6) + 10;
      } else {
        doc.text('Skills not specified', 20, yPosition);
        yPosition += 20;
      }
    }
    
    // Footer with template styling
    setTextColor(secondaryColor);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    doc.text('Generated with CodeSpaze Resume Builder', 20, 280);
    
    // Convert to buffer
    const pdfBuffer = doc.output('arraybuffer');
    return Buffer.from(pdfBuffer);
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF');
  }
}

// DOCX Generation Function
async function generateResumeDOCX(resume: any, templateId: string): Promise<Buffer> {
  try {
    const children: any[] = [];
    
    // Template-specific styling
    let accentColor = '0000FF'; // Default blue
    
    // Set colors based on template
    if (templateId === 'modern-professional') {
      accentColor = '0000FF'; // Blue
    } else if (templateId === 'creative-portfolio') {
      accentColor = 'FF4500'; // Orange
    } else if (templateId === 'classic-elegant') {
      accentColor = '808080'; // Gray
    } else if (templateId === 'minimal-clean') {
      accentColor = '22C55E'; // Green
    }
    
    // Header - Name with template styling
    const fullName = `${resume.first_name || ''} ${resume.last_name || ''}`.trim();
    if (fullName) {
      children.push(
        new Paragraph({
          text: fullName,
          heading: HeadingLevel.HEADING_1,
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: fullName,
              bold: true,
              size: 32,
              color: '000000',
            }),
          ],
        })
      );
    }
    
    // Title with accent color
    if (resume.title) {
      children.push(
        new Paragraph({
          text: resume.title,
          heading: HeadingLevel.HEADING_2,
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: resume.title,
              bold: true,
              size: 24,
              color: accentColor,
            }),
          ],
        })
      );
    }
    
    // Contact Information with template styling
    const contactInfo: string[] = [];
    if (resume.email) contactInfo.push(`📧 ${resume.email}`);
    if (resume.phone) contactInfo.push(`📱 ${resume.phone}`);
    if (resume.location) contactInfo.push(`📍 ${resume.location}`);
    
    if (contactInfo.length > 0) {
      children.push(
        new Paragraph({
          text: contactInfo.join('  |  '),
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: contactInfo.join('  |  '),
              size: 20,
              color: '333333',
            }),
          ],
        })
      );
    }
    
    children.push(new Paragraph({ text: '' })); // Spacing
    
    // Professional Summary with template styling
    if (resume.summary) {
      children.push(
        new Paragraph({
          text: 'Professional Summary',
          heading: HeadingLevel.HEADING_2,
          children: [
            new TextRun({
              text: 'Professional Summary',
              bold: true,
              size: 24,
              color: '000000',
            }),
          ],
        })
      );
      children.push(
        new Paragraph({
          text: resume.summary,
          children: [
            new TextRun({
              text: resume.summary,
              size: 20,
              color: '333333',
            }),
          ],
        })
      );
      children.push(new Paragraph({ text: '' })); // Spacing
    }
    
    // Work Experience with template styling
    if (resume.experiences && Array.isArray(resume.experiences)) {
      children.push(
        new Paragraph({
          text: 'Work Experience',
          heading: HeadingLevel.HEADING_2,
          children: [
            new TextRun({
              text: 'Work Experience',
              bold: true,
              size: 24,
              color: '000000',
            }),
          ],
        })
      );
      
      resume.experiences.forEach((_: any, index: number) => {
        const company = resume[`company_${index}`];
        const position = resume[`position_${index}`];
        const startDate = resume[`startDate_${index}`];
        const endDate = resume[`endDate_${index}`];
        const description = resume[`description_${index}`];
        
        if (company && position) {
          // Position with accent color
          children.push(
            new Paragraph({
              text: position,
              heading: HeadingLevel.HEADING_3,
              children: [
                new TextRun({
                  text: position,
                  bold: true,
                  size: 22,
                  color: accentColor,
                }),
              ],
            })
          );
          
          // Company and dates
          children.push(
            new Paragraph({
              text: `${company} | ${startDate} - ${endDate || 'Present'}`,
              children: [
                new TextRun({
                  text: `${company} | ${startDate} - ${endDate || 'Present'}`,
                  bold: true,
                  size: 20,
                  color: '333333',
                }),
              ],
            })
          );
          
          if (description) {
            children.push(
              new Paragraph({
                text: description,
                children: [
                  new TextRun({
                    text: description,
                    size: 18,
                    color: '333333',
                  }),
                ],
              })
            );
          }
          children.push(new Paragraph({ text: '' })); // Spacing
        }
      });
    }
    
    // Education with template styling
    if (resume.educations && Array.isArray(resume.educations)) {
      children.push(
        new Paragraph({
          text: 'Education',
          heading: HeadingLevel.HEADING_2,
          children: [
            new TextRun({
              text: 'Education',
              bold: true,
              size: 24,
              color: '000000',
            }),
          ],
        })
      );
      
      resume.educations.forEach((_: any, index: number) => {
        const degree = resume[`degree_${index}`];
        const school = resume[`school_${index}`];
        const graduationYear = resume[`graduationYear_${index}`];
        const gpa = resume[`gpa_${index}`];
        
        if (degree && school) {
          // Degree with accent color
          children.push(
            new Paragraph({
              text: degree,
              heading: HeadingLevel.HEADING_3,
              children: [
                new TextRun({
                  text: degree,
                  bold: true,
                  size: 22,
                  color: accentColor,
                }),
              ],
            })
          );
          
          // School and details
          children.push(
            new Paragraph({
              text: `${school} | ${graduationYear || 'Graduation Year'}`,
              children: [
                new TextRun({
                  text: `${school} | ${graduationYear || 'Graduation Year'}`,
                  bold: true,
                  size: 20,
                  color: '333333',
                }),
              ],
            })
          );
          
          if (gpa) {
            children.push(
              new Paragraph({
                text: `GPA: ${gpa}`,
                children: [
                  new TextRun({
                    text: `GPA: ${gpa}`,
                    size: 18,
                    color: '333333',
                  }),
                ],
              })
            );
          }
          children.push(new Paragraph({ text: '' })); // Spacing
        }
      });
    }
    
    // Skills with template styling
    if (resume.skills) {
      children.push(
        new Paragraph({
          text: 'Skills',
          heading: HeadingLevel.HEADING_2,
          children: [
            new TextRun({
              text: 'Skills',
              bold: true,
              size: 24,
              color: '000000',
            }),
          ],
        })
      );
      
      const skillsText = typeof resume.skills === 'string' ? resume.skills : JSON.stringify(resume.skills);
      children.push(
        new Paragraph({
          text: skillsText,
          children: [
            new TextRun({
              text: skillsText,
              size: 20,
              color: '333333',
            }),
          ],
        })
      );
    }
    
    // Footer with template styling
    children.push(
      new Paragraph({
        text: 'Generated with CodeSpaze Resume Builder',
        alignment: AlignmentType.CENTER,
        children: [
                      new TextRun({
              text: 'Generated with CodeSpaze Resume Builder',
              size: 16,
              color: '666666',
              italics: true,
            }),
        ],
      })
    );
    
    // Create document
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: children,
        },
      ],
    });
    
    // Convert to buffer
    const buffer = await Packer.toBuffer(doc);
    return buffer;
    
  } catch (error) {
    console.error('Error generating DOCX:', error);
    throw new Error('Failed to generate DOCX');
  }
}

export default router;
