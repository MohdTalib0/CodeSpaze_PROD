import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Download, 
  Save, 
  Eye,
  Sparkles,
  Edit3,
  Plus,
  Trash2
} from 'lucide-react';
import { 
  AIResumeBuilderProps, 
  ResumeData, 
  AIGenerationRequest,
  AIGenerationResponse,
  AISuggestion
} from '../../types/resume-builder';
import { AIService } from '../../services/aiService';
import Button from '../UI/Button';

export const AIResumeBuilder: React.FC<AIResumeBuilderProps> = ({
  initialData,
  onSave,
  onExport,
  aiEnabled = true,
  preferredAIProvider = 'gemini',
  customAIEndpoint,
  onAISuggestion,
  onAIGeneration,
  template = 'modern',
  theme = 'light',
  readOnly = false,
  className = '',
  style = {}
}) => {
  const [resumeData, setResumeData] = useState<ResumeData>({
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
    summary: '',
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    languages: [],
    references: [],
    customSections: [],
    ...initialData
  });

  const [aiService] = useState(() => new AIService());
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestions, setSuggestions] = useState<AISuggestion[]>([]);

  // AI-powered content generation
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
        const generatedData = response.data as Partial<ResumeData>;
        setResumeData(prev => ({ ...prev, ...generatedData }));
        onAIGeneration?.(generatedData);
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
      const newSuggestions = await aiService.suggestImprovements(resumeData, preferredAIProvider);
      setSuggestions(newSuggestions);
      newSuggestions.forEach(suggestion => onAISuggestion?.(suggestion));
    } catch (error) {
      console.error('Failed to get suggestions:', error);
    }
  };

  // Handle save
  const handleSave = () => {
    onSave?.(resumeData);
  };

  // Handle export
  const handleExport = (format: 'pdf' | 'png' | 'print' | 'html') => {
    onExport?.(format);
  };

  // Update personal info
  const updatePersonalInfo = (field: keyof typeof resumeData.personalInfo, value: string) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  };

  // Add experience
  const addExperience = () => {
    const newExperience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      achievements: [],
      technologies: []
    };
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, newExperience]
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
    setResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill]
    }));
  };

  return (
    <div className={`space-y-6  ${className}`} style={style}>
      {/* Header */}
      <div className="glass-card p-6 rounded-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">
            <Sparkles className="inline w-6 h-6 mr-2 text-[#19c973]" />
            AI Resume Builder
          </h2>
          <div className="flex gap-3">
            <Button
              onClick={handleSave}
              variant="primary"
              disabled={readOnly}
            >
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button
              onClick={() => handleExport('pdf')}
              variant="outline"
              disabled={readOnly}
            >
              <Download className="w-4 h-4 mr-2" />
              Export PDF
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
            value={resumeData.personalInfo.firstName}
            onChange={(e) => updatePersonalInfo('firstName', e.target.value)}
            disabled={readOnly}
            className="w-full px-4 py-3 bg-dark-800/50 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#19c973] focus:border-transparent"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={resumeData.personalInfo.lastName}
            onChange={(e) => updatePersonalInfo('lastName', e.target.value)}
            disabled={readOnly}
            className="w-full px-4 py-3 bg-dark-800/50 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#19c973] focus:border-transparent"
          />
          <input
            type="email"
            placeholder="Email"
            value={resumeData.personalInfo.email}
            onChange={(e) => updatePersonalInfo('email', e.target.value)}
            disabled={readOnly}
            className="w-full px-4 py-3 bg-dark-800/50 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#19c973] focus:border-transparent"
          />
          <input
            type="text"
            placeholder="Phone"
            value={resumeData.personalInfo.phone}
            onChange={(e) => updatePersonalInfo('phone', e.target.value)}
            disabled={readOnly}
            className="w-full px-4 py-3 bg-dark-800/50 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#19c973] focus:border-transparent"
          />
          <input
            type="text"
            placeholder="Job Title"
            value={resumeData.personalInfo.title || ''}
            onChange={(e) => updatePersonalInfo('title', e.target.value)}
            disabled={readOnly}
            className="w-full px-4 py-3 bg-dark-800/50 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#19c973] focus:border-transparent md:col-span-2"
          />
          <textarea
            placeholder="Professional Summary"
            value={resumeData.personalInfo.bio || ''}
            onChange={(e) => updatePersonalInfo('bio', e.target.value)}
            disabled={readOnly}
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
            AI-Powered Content Generation
          </h3>
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={() => generateWithAI('resume', { 
                jobTitle: resumeData.personalInfo.title,
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
                'Generate Resume Content'
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

      {/* Experience Section */}
      <div className="glass-card p-6 rounded-xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-white">Experience</h3>
          <Button
            onClick={addExperience}
            variant="outline"
            disabled={readOnly}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Experience
          </Button>
        </div>
        <div className="space-y-4">
          {resumeData.experience.map((exp, index) => (
            <div key={exp.id} className="p-4 bg-dark-800/30 rounded-lg border border-white/5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Company"
                  value={exp.company}
                  onChange={(e) => {
                    const newExp = [...resumeData.experience];
                    newExp[index] = { ...exp, company: e.target.value };
                    setResumeData(prev => ({ ...prev, experience: newExp }));
                  }}
                  disabled={readOnly}
                  className="w-full px-4 py-3 bg-dark-800/50 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#19c973] focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Position"
                  value={exp.position}
                  onChange={(e) => {
                    const newExp = [...resumeData.experience];
                    newExp[index] = { ...exp, position: e.target.value };
                    setResumeData(prev => ({ ...prev, experience: newExp }));
                  }}
                  disabled={readOnly}
                  className="w-full px-4 py-3 bg-dark-800/50 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#19c973] focus:border-transparent"
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
            disabled={readOnly}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Skill
          </Button>
        </div>
        <div className="space-y-4">
          {resumeData.skills.map((skill, index) => (
            <div key={skill.id} className="p-4 bg-dark-800/30 rounded-lg border border-white/5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Skill Name"
                  value={skill.name}
                  onChange={(e) => {
                    const newSkills = [...resumeData.skills];
                    newSkills[index] = { ...skill, name: e.target.value };
                    setResumeData(prev => ({ ...prev, skills: newSkills }));
                  }}
                  disabled={readOnly}
                  className="w-full px-4 py-3 bg-dark-800/50 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#19c973] focus:border-transparent"
                />
                <select
                  value={skill.category}
                  onChange={(e) => {
                    const newSkills = [...resumeData.skills];
                    newSkills[index] = { ...skill, category: e.target.value as any };
                    setResumeData(prev => ({ ...prev, skills: newSkills }));
                  }}
                  disabled={readOnly}
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
