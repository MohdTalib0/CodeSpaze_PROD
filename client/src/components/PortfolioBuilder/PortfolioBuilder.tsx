import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Palette, 
  Download, 
  Save, 
  Eye,
  Sparkles,
  Edit3,
  Plus,
  Trash2,
  Globe,
  Github
} from 'lucide-react';
import { 
  PortfolioBuilderProps, 
  PortfolioData, 
  AIGenerationRequest,
  AIGenerationResponse,
  AISuggestion
} from '../../types/resume-builder';
import { AIService } from '../../services/aiService';
import Button from '../UI/Button';

export const PortfolioBuilder: React.FC<PortfolioBuilderProps> = ({
  portfolioData,
  onGenerate,
  onSave,
  onDeploy,
  aiEnabled = true,
  preferredAIProvider = 'gemini',
  templates = [],
  className = '',
  style = {}
}) => {
  const [portfolio, setPortfolio] = useState<PortfolioData>({
    id: Date.now().toString(),
    title: '',
    description: '',
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: {
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: ''
      },
      title: '',
      bio: ''
    },
    about: '',
    skills: [],
    projects: [],
    experience: [],
    education: [],
    contact: {
      email: '',
      phone: '',
      linkedin: '',
      github: '',
      website: ''
    },
    social: {},
    theme: {
      id: 'default',
      name: 'Default',
      primaryColor: '#3B82F6',
      secondaryColor: '#1F2937',
      backgroundColor: '#FFFFFF',
      textColor: '#1F2937',
      accentColor: '#10B981',
      fontFamily: 'Inter',
      borderRadius: 8,
      shadows: true,
      animations: true
    },
    sections: [],
    ...portfolioData
  });

  const [aiService] = useState(() => new AIService());
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestions, setSuggestions] = useState<AISuggestion[]>([]);

  // AI-powered portfolio generation
  const generateWithAI = async (type: 'resume' | 'portfolio' | 'section', input: any) => {
    if (!aiEnabled) return;

    setIsGenerating(true);
    try {
      const request: AIGenerationRequest = {
        type,
        input,
        preferences: {
          tone: 'professional',
          length: 'standard',
          focus: 'balanced'
        }
      };

      const response: AIGenerationResponse = await aiService.generateContent(request, preferredAIProvider);
      
      if (response.success && response.data) {
        const generatedData = response.data as Partial<PortfolioData>;
        setPortfolio(prev => ({ ...prev, ...generatedData }));
        onGenerate?.({ ...portfolio, ...generatedData });
      }
    } catch (error) {
      console.error('AI generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Get AI suggestions for improvements
  const getSuggestions = async () => {
    if (!aiEnabled) return;

    try {
      const newSuggestions = await aiService.suggestImprovements(portfolio, preferredAIProvider);
      setSuggestions(newSuggestions);
    } catch (error) {
      console.error('Failed to get suggestions:', error);
    }
  };

  // Handle save
  const handleSave = () => {
    onSave?.(portfolio);
  };

  // Handle deploy
  const handleDeploy = () => {
    const url = `https://${portfolio.personalInfo.firstName.toLowerCase()}-${portfolio.personalInfo.lastName.toLowerCase()}.github.io`;
    onDeploy?.(url);
  };

  // Update personal info
  const updatePersonalInfo = (field: keyof typeof portfolio.personalInfo, value: string) => {
    setPortfolio(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  };

  // Add project
  const addProject = () => {
    const newProject = {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: [],
      startDate: '',
      endDate: '',
      current: false,
      url: '',
      githubUrl: '',
      highlights: [],
      images: [],
      liveUrl: '',
      featured: false,
      category: ''
    };
    setPortfolio(prev => ({
      ...prev,
      projects: [...prev.projects, newProject]
    }));
  };

  // Add skill
  const addSkill = () => {
    const newSkill = {
      id: Date.now().toString(),
      name: '',
      category: 'technical' as const,
      proficiency: 'intermediate' as const
    };
    setPortfolio(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill]
    }));
  };

  // Update theme
  const updateTheme = (themeUpdates: Partial<typeof portfolio.theme>) => {
    setPortfolio(prev => ({
      ...prev,
      theme: { ...prev.theme, ...themeUpdates }
    }));
  };

  return (
    <div className={`space-y-6 bg-dark-950 ${className}`} style={style}>
      {/* Header */}
      <div className="glass-card p-6 rounded-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">
            <Palette className="inline w-6 h-6 mr-2 text-[#19c973]" />
            Portfolio Builder
          </h2>
          <div className="flex gap-3">
            <Button
              onClick={handleSave}
              variant="primary"
            >
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button
              onClick={handleDeploy}
              variant="outline"
            >
              <Github className="w-4 h-4 mr-2" />
              Deploy
            </Button>
          </div>
        </div>
      </div>

      {/* Personal Information Section */}
      <div className="glass-card p-6 rounded-xl">
        <h3 className="text-xl font-semibold text-white mb-6">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            placeholder="First Name"
            value={portfolio.personalInfo.firstName}
            onChange={(e) => updatePersonalInfo('firstName', e.target.value)}
            className="w-full px-4 py-3 bg-dark-800/50 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#19c973] focus:border-transparent"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={portfolio.personalInfo.lastName}
            onChange={(e) => updatePersonalInfo('lastName', e.target.value)}
            className="w-full px-4 py-3 bg-dark-800/50 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#19c973] focus:border-transparent"
          />
          <input
            type="email"
            placeholder="Email"
            value={portfolio.personalInfo.email}
            onChange={(e) => updatePersonalInfo('email', e.target.value)}
            className="w-full px-4 py-3 bg-dark-800/50 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#19c973] focus:border-transparent"
          />
          <input
            type="text"
            placeholder="Phone"
            value={portfolio.personalInfo.phone}
            onChange={(e) => updatePersonalInfo('phone', e.target.value)}
            className="w-full px-4 py-3 bg-dark-800/50 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#19c973] focus:border-transparent"
          />
          <input
            type="text"
            placeholder="Job Title"
            value={portfolio.personalInfo.title || ''}
            onChange={(e) => updatePersonalInfo('title', e.target.value)}
            className="w-full px-4 py-3 bg-dark-800/50 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#19c973] focus:border-transparent md:col-span-2"
          />
          <textarea
            placeholder="About Me"
            value={portfolio.about}
            onChange={(e) => setPortfolio(prev => ({ ...prev, about: e.target.value }))}
            className="w-full px-4 py-3 bg-dark-800/50 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#19c973] focus:border-transparent md:col-span-2"
            rows={3}
          />
        </div>
      </div>

      {/* AI Generation Section */}
      {aiEnabled && (
        <div className="glass-card p-6 rounded-xl">
          <h3 className="text-xl font-semibold text-white mb-6">
            <Sparkles className="inline w-5 h-5 mr-2 text-[#19c973]" />
            AI-Powered Portfolio Generation
          </h3>
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={() => generateWithAI('portfolio', { 
                jobTitle: portfolio.personalInfo.title,
                experience: 'entry-level'
              })}
              disabled={isGenerating}
              variant="primary"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Generating...
                </>
              ) : (
                'Generate Portfolio Content'
              )}
            </Button>
            <Button
              onClick={getSuggestions}
              variant="outline"
            >
              Get AI Suggestions
            </Button>
          </div>
          
          {suggestions.length > 0 && (
            <div className="mt-6 p-4 bg-dark-800/50 rounded-lg border border-[#19c973]/20">
              <h4 className="text-lg font-medium mb-4 text-[#19c973]">AI Suggestions</h4>
              <div className="space-y-3">
                {suggestions.map((suggestion, index) => (
                  <div key={index} className="p-3 bg-dark-700/50 rounded border-l-4 border-[#19c973]">
                    <strong className="text-[#19c973]">{suggestion.field}:</strong> 
                    <span className="text-gray-300 ml-2">{suggestion.suggestion}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Theme Customization */}
      <div className="glass-card p-6 rounded-xl">
        <h3 className="text-xl font-semibold text-white mb-6">Theme Customization</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">Primary Color</label>
            <input
              type="color"
              value={portfolio.theme.primaryColor}
              onChange={(e) => updateTheme({ primaryColor: e.target.value })}
              className="w-full h-10 rounded border border-white/10 bg-dark-800"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">Secondary Color</label>
            <input
              type="color"
              value={portfolio.theme.secondaryColor}
              onChange={(e) => updateTheme({ secondaryColor: e.target.value })}
              className="w-full h-10 rounded border border-white/10 bg-dark-800"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">Accent Color</label>
            <input
              type="color"
              value={portfolio.theme.accentColor}
              onChange={(e) => updateTheme({ accentColor: e.target.value })}
              className="w-full h-10 rounded border border-white/10 bg-dark-800"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">Font Family</label>
            <select
              value={portfolio.theme.fontFamily}
              onChange={(e) => updateTheme({ fontFamily: e.target.value })}
              className="w-full px-4 py-3 bg-dark-800/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#19c973] focus:border-transparent"
            >
              <option value="Inter" className="bg-dark-800 text-white">Inter</option>
              <option value="Roboto" className="bg-dark-800 text-white">Roboto</option>
              <option value="Open Sans" className="bg-dark-800 text-white">Open Sans</option>
              <option value="Lato" className="bg-dark-800 text-white">Lato</option>
            </select>
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <div className="glass-card p-6 rounded-xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-white">Projects</h3>
          <Button
            onClick={addProject}
            variant="outline"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Project
          </Button>
        </div>
        <div className="space-y-4">
          {portfolio.projects.map((project, index) => (
            <div key={project.id} className="p-4 bg-dark-800/30 rounded-lg border border-white/5">
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Project Name"
                  value={project.name}
                  onChange={(e) => {
                    const newProjects = [...portfolio.projects];
                    newProjects[index] = { ...project, name: e.target.value };
                    setPortfolio(prev => ({ ...prev, projects: newProjects }));
                  }}
                  className="w-full px-4 py-3 bg-dark-800/50 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#19c973] focus:border-transparent"
                />
                <textarea
                  placeholder="Project Description"
                  value={project.description}
                  onChange={(e) => {
                    const newProjects = [...portfolio.projects];
                    newProjects[index] = { ...project, description: e.target.value };
                    setPortfolio(prev => ({ ...prev, projects: newProjects }));
                  }}
                  className="w-full px-4 py-3 bg-dark-800/50 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#19c973] focus:border-transparent"
                  rows={2}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skills Section */}
      <div className="glass-card p-6 rounded-xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-white">Skills</h3>
          <Button
            onClick={addSkill}
            variant="outline"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Skill
          </Button>
        </div>
        <div className="space-y-4">
          {portfolio.skills.map((skill, index) => (
            <div key={skill.id} className="p-4 bg-dark-800/30 rounded-lg border border-white/5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Skill Name"
                  value={skill.name}
                  onChange={(e) => {
                    const newSkills = [...portfolio.skills];
                    newSkills[index] = { ...skill, name: e.target.value };
                    setPortfolio(prev => ({ ...prev, skills: newSkills }));
                  }}
                  className="w-full px-4 py-3 bg-dark-800/50 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#19c973] focus:border-transparent"
                />
                <select
                  value={skill.category}
                  onChange={(e) => {
                    const newSkills = [...portfolio.skills];
                    newSkills[index] = { ...skill, category: e.target.value as any };
                    setPortfolio(prev => ({ ...prev, skills: newSkills }));
                  }}
                  className="w-full px-4 py-3 bg-dark-800/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#19c973] focus:border-transparent"
                >
                  <option value="technical" className="bg-dark-800 text-white">Technical</option>
                  <option value="soft" className="bg-dark-800 text-white">Soft Skills</option>
                  <option value="language" className="bg-dark-800 text-white">Language</option>
                  <option value="other" className="bg-dark-800 text-white">Other</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
