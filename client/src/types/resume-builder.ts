// Types for AI Resume & Portfolio Builder

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: Address;
  title?: string;
  bio?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  gpa?: number;
}

export interface Skill {
  id: string;
  name: string;
  category: 'technical' | 'soft' | 'language' | 'other';
  proficiency: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  yearsOfExperience?: number;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  startDate: string;
  endDate?: string;
  current: boolean;
  url?: string;
  githubUrl?: string;
  highlights: string[];
  images: string[];
  liveUrl?: string;
  featured: boolean;
  category: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  url?: string;
  credentialId?: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: 'basic' | 'conversational' | 'fluent' | 'native';
  reading: boolean;
  writing: boolean;
  speaking: boolean;
}

export interface Reference {
  id: string;
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  relationship: string;
}

export interface CustomSection {
  id: string;
  title: string;
  content: string;
  order: number;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
  languages: Language[];
  references: Reference[];
  customSections: CustomSection[];
}

export interface PortfolioData {
  id: string;
  title: string;
  description: string;
  personalInfo: PersonalInfo;
  about: string;
  skills: Skill[];
  projects: Project[];
  experience: Experience[];
  education: Education[];
  contact: {
    email: string;
    phone: string;
    linkedin: string;
    github: string;
    website: string;
  };
  social: Record<string, string>;
  theme: {
    id: string;
    name: string;
    primaryColor: string;
    secondaryColor: string;
    backgroundColor: string;
    textColor: string;
    accentColor: string;
    fontFamily: string;
    borderRadius: number;
    shadows: boolean;
    animations: boolean;
  };
  sections: any[];
}

export interface AISuggestion {
  type: 'skill' | 'project' | 'experience' | 'summary' | 'achievement';
  field: string;
  suggestion: string;
  confidence: number;
  reasoning: string;
  alternatives?: string[];
}

export interface AIGenerationRequest {
  type: 'resume' | 'portfolio' | 'section';
  input: {
    jobTitle?: string;
    industry?: string;
    experience?: string;
    skills?: string[];
    education?: string;
    targetRole?: string;
  };
  preferences: {
    tone: 'professional' | 'creative' | 'casual' | 'academic';
    length: 'brief' | 'standard' | 'detailed';
    focus: 'technical' | 'leadership' | 'achievements' | 'balanced';
  };
}

export interface AIGenerationResponse {
  success: boolean;
  data?: Partial<ResumeData> | Partial<PortfolioData>;
  suggestions?: AISuggestion[];
  error?: string;
  usage?: {
    tokens: number;
    cost: number;
  };
}

export interface AIResumeBuilderProps {
  initialData?: Partial<ResumeData>;
  onSave?: (data: ResumeData) => void;
  onExport?: (format: 'pdf' | 'png' | 'print' | 'html') => void;
  template?: string;
  theme?: 'light' | 'dark';
  readOnly?: boolean;
  className?: string;
  style?: Record<string, any>;
  aiEnabled?: boolean;
  preferredAIProvider?: 'gemini' | 'mistral' | 'perplexity';
  customAIEndpoint?: string;
  onAISuggestion?: (suggestion: AISuggestion) => void;
  onAIGeneration?: (generatedData: Partial<ResumeData>) => void;
}

export interface PortfolioBuilderProps {
  portfolioData?: Partial<PortfolioData>;
  onGenerate?: (data: PortfolioData) => void;
  onSave?: (data: PortfolioData) => void;
  onDeploy?: (url: string) => void;
  aiEnabled?: boolean;
  preferredAIProvider?: 'gemini' | 'mistral' | 'perplexity';
  templates?: any[];
  className?: string;
  style?: Record<string, any>;
}

export interface GitHubPagesGeneratorProps {
  portfolioData: PortfolioData;
  githubToken: string;
  repository: string;
  branch?: string;
  onDeploy?: (url: string) => void;
  onError?: (error: string) => void;
  className?: string;
  style?: Record<string, any>;
}
