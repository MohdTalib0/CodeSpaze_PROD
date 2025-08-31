import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Palette, 
  Github, 
  Sparkles,
  Download,
  Save,
  Eye,
  Layout,
  Upload
} from 'lucide-react';
import { DynamicFormBuilder, ResumeViewer } from '../../components/AIResumeBuilder';
import { PortfolioBuilder } from '../../components/PortfolioBuilder';
import { GitHubPagesGenerator } from '../../components/GitHubPagesGenerator';
import { ResumeData, PortfolioData } from '../../types/resume-builder';
import { TemplateSelector } from '../../components/AIResumeBuilder/TemplateSelector';
import { ResumeTemplate, RESUME_TEMPLATES } from '../../types/resume-templates';
import { AIService } from '../../services/aiService';
import Button from '../../components/UI/Button';

const AIResumeBuilderPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'resume' | 'portfolio' | 'github'>('resume');
  const [selectedTemplate, setSelectedTemplate] = useState<ResumeTemplate | null>(null);
  const [resumeFormData, setResumeFormData] = useState<any>(null);
  const [showTemplateSelector, setShowTemplateSelector] = useState(true);
  const [aiService] = useState(() => new AIService());
  const [isAIEnhancing, setIsAIEnhancing] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<any[]>([]);
  const [aiEnhancedData, setAiEnhancedData] = useState<any>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [extractionProgress, setExtractionProgress] = useState<string>('');
  const [currentResumeId, setCurrentResumeId] = useState<number | null>(null);
  const [currentStatus, setCurrentStatus] = useState<string>('draft');
  const [statusNotes, setStatusNotes] = useState<string>('');
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
    customSections: []
  });
  const [portfolioData, setPortfolioData] = useState<PortfolioData>({
    id: '',
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
    sections: []
  });
  const tabs = [
    { id: 'resume', label: 'AI Resume Builder', icon: FileText },
    { id: 'portfolio', label: 'Portfolio Builder', icon: Palette },
    { id: 'github', label: 'GitHub Pages', icon: Github }
  ];

  const handleTemplateSelect = (template: ResumeTemplate) => {
    setSelectedTemplate(template);
    setShowTemplateSelector(false);
  };

  const handleResumeSave = (data: any) => {
    setResumeFormData(data);
    console.log('Resume data saved:', data);
  };

  const handleResumePreview = (data: any) => {
    setResumeFormData(data);
    console.log('Resume preview:', data);
  };

  const handleStatusChange = async (status: string, notes?: string) => {
    if (!currentResumeId) return;
    
    try {
      const response = await fetch(`/api/ai-resume/update-status/${currentResumeId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        },
        body: JSON.stringify({ status, notes: notes || statusNotes })
      });

      if (response.ok) {
        setCurrentStatus(status);
        if (notes) setStatusNotes(notes);
        alert(`Resume status updated to ${status}`);
      } else {
        throw new Error('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update resume status');
    }
  };

  const handleExport = async (format: 'pdf' | 'docx') => {
    if (!resumeFormData || !selectedTemplate) {
      alert('Please fill out the resume form before exporting.');
      return;
    }
    
    try {
      // Use a temporary export endpoint that works with form data
      const response = await fetch(`/api/ai-resume/export-${format}-temp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        },
        body: JSON.stringify({ 
          template_id: selectedTemplate.id,
          resume_data: resumeFormData
        })
      });

      if (response.ok) {
        // Create blob and download
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `resume_${resumeFormData.first_name || 'my'}_${resumeFormData.last_name || 'resume'}.${format}`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        throw new Error(`Failed to export to ${format.toUpperCase()}`);
      }
    } catch (error) {
      console.error(`Error exporting to ${format}:`, error);
      alert(`Failed to export resume to ${format.toUpperCase()}`);
    }
  };

  const handleBackToTemplates = () => {
    setShowTemplateSelector(true);
    setSelectedTemplate(null);
    setResumeFormData(null);
    setAiSuggestions([]);
    setAiEnhancedData(null);
  };

  const handleAIEnhancement = async () => {
    if (!resumeFormData) return;
    
    setIsAIEnhancing(true);
    try {
      // Prepare data for AI enhancement
      const aiRequest = {
        type: 'resume' as const,
        input: {
          jobTitle: resumeFormData.title || 'Software Engineer',
          industry: 'Technology',
          experience: resumeFormData.company ? '5+ years' : 'Entry level',
          skills: [
            ...(resumeFormData.technicalSkills || []),
            ...(resumeFormData.softSkills || []),
            ...(resumeFormData.skills || [])
          ].filter(s => s && s.trim()),
          education: resumeFormData.degree || 'Bachelor\'s Degree',
          targetRole: resumeFormData.title || 'Software Engineer'
        },
        preferences: {
          tone: 'professional' as const,
          length: 'standard' as const,
          focus: 'balanced' as const
        }
      };

      console.log('Sending AI enhancement request:', aiRequest);
      
      // Call AI service to enhance content
      const response = await aiService.generateContent(aiRequest, 'gemini');
      
      if (response.success) {
        console.log('AI enhancement successful:', response);
        setAiEnhancedData(response.data);
        setAiSuggestions(response.suggestions || []);
        
        // Update form data with AI enhancements
        const enhancedData = { ...resumeFormData };
        if (response.data && 'summary' in response.data && response.data.summary) {
          enhancedData.summary = response.data.summary;
        }
        if (response.data && 'skills' in response.data && response.data.skills) {
          enhancedData.technicalSkills = response.data.skills
            .filter((s: any) => s.category === 'technical')
            .map((s: any) => s.name);
          enhancedData.softSkills = response.data.skills
            .filter((s: any) => s.category === 'non-technical')
            .map((s: any) => s.name);
        }
        setResumeFormData(enhancedData);
      } else {
        console.error('AI enhancement failed:', response.error);
        alert(`AI enhancement failed: ${response.error}`);
      }
    } catch (error) {
      console.error('AI enhancement error:', error);
      alert('AI enhancement failed. Please try again.');
    } finally {
      setIsAIEnhancing(false);
    }
  };

  const handleAISuggestions = async () => {
    if (!resumeFormData) return;
    
    setIsAIEnhancing(true);
    try {
      const suggestions = await aiService.suggestImprovements(resumeFormData);
      
      console.log('AI suggestions successful:', suggestions);
      setAiSuggestions(suggestions);
    } catch (error) {
      console.error('AI suggestions error:', error);
      alert('AI suggestions failed. Please try again.');
    } finally {
      setIsAIEnhancing(false);
    }
  };

  const handleResumeUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    if (!allowedTypes.includes(file.type)) {
      alert('Please upload a PDF, Word document, or text file.');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB.');
      return;
    }

    setUploadedFile(file);
    setIsUploading(true);
    setExtractionProgress('Uploading file...');

    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('resume', file);

      setExtractionProgress('Processing file and extracting text...');

      // Call backend to extract resume content
      const response = await fetch('/api/ai-resume/extract-resume', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error(`Resume extraction failed: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success) {
        console.log('Resume extracted successfully:', result.data);
        
        setExtractionProgress('Mapping extracted data to form...');
        
        // Auto-select a template if none selected (do this FIRST)
        if (!selectedTemplate) {
          setSelectedTemplate(RESUME_TEMPLATES[0]); // Default to first template
          setShowTemplateSelector(false);
        }
        
        // Map extracted data to form fields (do this AFTER template selection)
        const extractedData = mapExtractedDataToForm(result.data);
        console.log('Setting resume form data:', extractedData);
        setResumeFormData(extractedData);
        
        setExtractionProgress('Extraction completed successfully!');
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50';
        successMessage.innerHTML = `
          <div class="flex items-center gap-2">
            <span>✅</span>
            <span>Resume uploaded and extracted successfully! You can now edit the content.</span>
          </div>
        `;
        document.body.appendChild(successMessage);
        
        // Remove message after 5 seconds
        setTimeout(() => {
          if (successMessage.parentNode) {
            successMessage.parentNode.removeChild(successMessage);
          }
        }, 5000);
      } else {
        throw new Error(result.error || 'Resume extraction failed');
      }
    } catch (error) {
      console.error('Resume upload error:', error);
      alert(`Resume upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsUploading(false);
    }
  };

  const mapExtractedDataToForm = (extractedData: any) => {
    // Map extracted resume data to our form structure
    const mappedData: any = {};
    
    // Personal Information
    if (extractedData.personalInfo) {
      mappedData.firstName = extractedData.personalInfo.firstName || '';
      mappedData.lastName = extractedData.personalInfo.lastName || '';
      mappedData.email = extractedData.personalInfo.email || '';
      mappedData.phone = extractedData.personalInfo.phone || '';
      mappedData.title = extractedData.personalInfo.title || '';
      mappedData.location = extractedData.personalInfo.location || '';
      mappedData.linkedin = extractedData.personalInfo.linkedin || '';
      mappedData.github = extractedData.personalInfo.github || '';
    }

    // Summary
    mappedData.summary = extractedData.summary || '';

    // Experience - handle multiple experiences for DynamicFormBuilder
    if (extractedData.experience && extractedData.experience.length > 0) {
      // Create the experiences array for DynamicFormBuilder
      mappedData.experiences = Array(extractedData.experience.length).fill('');
      
      // Map each experience to indexed fields
      extractedData.experience.forEach((exp: any, index: number) => {
        mappedData[`company_${index}`] = exp.company || '';
        mappedData[`position_${index}`] = exp.position || '';
        mappedData[`startDate_${index}`] = exp.startDate || '';
        mappedData[`endDate_${index}`] = exp.endDate || '';
        mappedData[`description_${index}`] = exp.description || '';
        
        // Map achievements if available
        if (exp.achievements && Array.isArray(exp.achievements)) {
          mappedData[`achievements_${index}`] = exp.achievements;
          exp.achievements.forEach((achievement: any, achievementIndex: number) => {
            mappedData[`achievement_${index}_${achievementIndex}`] = achievement || '';
          });
        }
      });
      
      // Also keep the old format for backward compatibility
      mappedData.companies = extractedData.experience.map((exp: any) => exp.company || '');
      mappedData.positions = extractedData.experience.map((exp: any) => exp.position || '');
      mappedData.startDates = extractedData.experience.map((exp: any) => exp.startDate || '');
      mappedData.endDates = extractedData.experience.map((exp: any) => exp.endDate || '');
      mappedData.descriptions = extractedData.experience.map((exp: any) => exp.description || '');
      
      // First experience for backward compatibility
      const firstExp = extractedData.experience[0];
      mappedData.company = firstExp.company || '';
      mappedData.position = firstExp.position || '';
      mappedData.startDate = firstExp.startDate || '';
      mappedData.endDate = firstExp.endDate || '';
      mappedData.description = firstExp.description || '';
      
      // First experience achievements for backward compatibility
      if (firstExp.achievements && Array.isArray(firstExp.achievements)) {
        mappedData.achievements = firstExp.achievements;
        firstExp.achievements.forEach((achievement: any, index: number) => {
          mappedData[`achievement_${index}`] = achievement || '';
        });
      }
    } else {
      // Initialize with empty experience
      mappedData.experiences = [''];
      mappedData['company_0'] = '';
      mappedData['position_0'] = '';
      mappedData['startDate_0'] = '';
      mappedData['endDate_0'] = '';
      mappedData['description_0'] = '';
      
      // Initialize with empty achievements
      mappedData.achievements = [''];
      mappedData['achievement_0'] = '';
    }

    // Skills
    if (extractedData.skills) {
      mappedData.technicalSkills = extractedData.skills.technical || [];
      mappedData.softSkills = extractedData.skills.soft || [];
      mappedData.skills = [...(extractedData.skills.technical || []), ...(extractedData.skills.soft || [])];
    }

    // Education - handle multiple education entries for DynamicFormBuilder
    if (extractedData.education && extractedData.education.length > 0) {
      // Create the educations array for DynamicFormBuilder
      mappedData.educations = Array(extractedData.education.length).fill('');
      
      // Map each education to indexed fields
      extractedData.education.forEach((edu: any, index: number) => {
        mappedData[`degree_${index}`] = edu.degree || '';
        mappedData[`school_${index}`] = edu.institution || '';
        mappedData[`graduationYear_${index}`] = edu.endDate || '';
        mappedData[`gpa_${index}`] = edu.gpa || '';
      });
      
      // Also keep the old format for backward compatibility
      mappedData.schools = extractedData.education.map((edu: any) => edu.institution || '');
      mappedData.degrees = extractedData.education.map((edu: any) => edu.degree || '');
      mappedData.graduationYears = extractedData.education.map((edu: any) => edu.endDate || '');
      mappedData.gpas = extractedData.education.map((edu: any) => edu.gpa || '');
      
      // First education for backward compatibility
      const firstEdu = extractedData.education[0];
      mappedData.school = firstEdu.institution || '';
      mappedData.degree = firstEdu.degree || '';
      mappedData.graduationYear = firstEdu.endDate || '';
      mappedData.gpa = firstEdu.gpa || '';
    } else {
      // Initialize with empty education
      mappedData.educations = [''];
      mappedData['degree_0'] = '';
      mappedData['school_0'] = '';
      mappedData['graduationYear_0'] = '';
      mappedData['gpa_0'] = '';
    }

    console.log('Mapped form data:', mappedData);
    return mappedData;
  };

  return (
    <div className="min-h-screen bg-dark-950 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold mb-4">
              <Sparkles className="inline w-10 h-10 mr-3 text-[#19c973]" />
              AI Resume & Portfolio Builder
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Create professional resumes and portfolios with AI-powered suggestions. 
              Auto-generate content, get improvement tips, and deploy to GitHub Pages.
            </p>
          </motion.div>
        </div>

      {/* Tab Navigation */}
      <div className="flex justify-center mb-8">
          <div className="flex bg-dark-800 rounded-lg p-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'resume' | 'portfolio' | 'github')}
                  className={`px-6 py-3 rounded-md font-medium transition-all duration-200 flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'bg-[#19c973] text-dark-950 shadow-lg'
                      : 'text-gray-400 hover:text-white hover:bg-dark-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-dark-800 rounded-lg p-6"
        >
          {activeTab === 'resume' && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">AI Resume Builder</h2>
                <p className="text-gray-400">
                  Choose a template, fill in your information, and get AI-powered content suggestions.
                </p>
              </div>

              {/* Back to Templates Button */}
              {!showTemplateSelector && (
                <div className="mb-6">
                  <Button
                    onClick={handleBackToTemplates}
                    variant="outline"
                    className="mb-4"
                  >
                    <Layout className="w-4 h-4 mr-2" />
                    Choose Different Template
                  </Button>
                </div>
              )}
              
                                      {/* Resume Upload Section */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="glass-card p-6 rounded-xl mb-8"
                        >
                          <div className="text-center mb-6">
                            <h3 className="text-xl font-semibold text-white mb-2">
                              <Upload className="inline w-5 h-5 mr-2 text-[#19c973]" />
                              Upload Existing Resume
                            </h3>
                            <p className="text-gray-400">
                              Upload your current resume and we'll extract the content for you to edit
                            </p>
                          </div>

                          <div className="flex flex-col items-center">
                            <div className="relative">
                              <input
                                type="file"
                                id="resume-upload"
                                accept=".pdf,.doc,.docx,.txt"
                                onChange={handleResumeUpload}
                                className="hidden"
                                disabled={isUploading}
                              />
                              <label
                                htmlFor="resume-upload"
                                className={`flex items-center gap-3 px-6 py-3 bg-dark-700 hover:bg-dark-600 text-white rounded-lg cursor-pointer transition-colors duration-200 border-2 border-dashed border-[#19c973]/50 hover:border-[#19c973] ${
                                  isUploading ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                              >
                                <Upload className="w-5 h-5" />
                                {isUploading ? 'Processing...' : 'Choose Resume File'}
                              </label>
                            </div>
                            
                            {uploadedFile && (
                              <div className="mt-4 flex items-center justify-between gap-4 text-sm text-gray-400 bg-dark-800/50 p-3 rounded-lg">
                                <div className="flex items-center gap-2">
                                  <FileText className="w-4 h-4" />
                                  <span>{uploadedFile.name}</span>
                                  {isUploading && (
                                    <div className="flex items-center gap-2">
                                      <div className="w-4 h-4 border-2 border-[#19c973] border-t-transparent rounded-full animate-spin"></div>
                                      <span>{extractionProgress}</span>
                                    </div>
                                  )}
                                </div>
                                {!isUploading && (
                                  <button
                                    onClick={() => {
                                      setUploadedFile(null);
                                      setResumeFormData(null);
                                      setExtractionProgress('');
                                    }}
                                    className="text-red-400 hover:text-red-300 text-xs"
                                  >
                                    Clear
                                  </button>
                                )}
                              </div>
                            )}

                            <div className="mt-4 text-xs text-gray-500 text-center max-w-md">
                              Supported formats: PDF, Word (.doc, .docx), Text (.txt)<br />
                              Maximum file size: 5MB<br />
                              <span className="text-yellow-400">Note: For best results, convert PDF/Word to text format first</span>
                            </div>
                          </div>
                        </motion.div>

                        {/* Template Selection or Form Building */}
                        {showTemplateSelector ? (
                          <TemplateSelector
                            selectedTemplate={selectedTemplate}
                            onTemplateSelect={handleTemplateSelect}
                            onPreview={(template) => {
                              console.log('Template preview:', template);
                            }}
                          />
                        ) : selectedTemplate ? (
                                      <DynamicFormBuilder
              template={selectedTemplate}
              onSave={handleResumeSave}
              onPreview={handleResumePreview}
              initialData={resumeFormData}
              resumeId={currentResumeId}
              currentStatus={currentStatus}
              onStatusChange={handleStatusChange}
              onExport={handleExport}
            />
                        ) : null}

              {/* AI Content Generation Section */}
              {resumeFormData && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-card p-6 rounded-xl mt-6"
                >
                  <h3 className="text-xl font-semibold text-white mb-4">
                    <Sparkles className="inline w-5 h-5 mr-2 text-[#19c973]" />
                    AI-Powered Content Enhancement
                  </h3>
                  <p className="text-gray-400 mb-4">
                    Use AI to improve your resume content and get professional suggestions.
                  </p>
                  
                  <div className="flex flex-wrap gap-3">
                    <Button
                      onClick={handleAIEnhancement}
                      variant="primary"
                      disabled={isAIEnhancing}
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      {isAIEnhancing ? 'Enhancing...' : 'Enhance with AI'}
                    </Button>
                    <Button
                      onClick={handleAISuggestions}
                      variant="outline"
                      disabled={isAIEnhancing}
                    >
                      {isAIEnhancing ? 'Getting Suggestions...' : 'Get AI Suggestions'}
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* AI Suggestions Display */}
              {aiSuggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-card p-6 rounded-xl mt-6"
                >
                  <h3 className="text-xl font-semibold text-white mb-4">
                    <Sparkles className="inline w-5 h-5 mr-2 text-[#19c973]" />
                    AI Suggestions
                  </h3>
                  <div className="space-y-4">
                    {aiSuggestions.map((suggestion, index) => (
                      <div key={index} className="bg-dark-800/50 p-4 rounded-lg border border-[#19c973]/20">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-white">{suggestion.field}</h4>
                          <span className="text-sm text-gray-400">
                            Confidence: {Math.round(suggestion.confidence * 100)}%
                          </span>
                        </div>
                        <p className="text-gray-300 mb-2">{suggestion.suggestion}</p>
                        <p className="text-sm text-gray-500">{suggestion.reasoning}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Note: Live preview is now integrated into the form builder */}
            </div>
          )}

          {activeTab === 'portfolio' && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Portfolio Builder</h2>
                <p className="text-gray-400">
                  Create stunning portfolios with customizable themes and AI content generation.
                </p>
              </div>
              
              {/* Portfolio Builder Component */}
              <PortfolioBuilder
                portfolioData={portfolioData}
                onGenerate={(data: any) => {
                  console.log('Portfolio generated:', data);
                }}
                onSave={(data: any) => {
                  console.log('Portfolio saved:', data);
                  alert('Portfolio saved successfully!');
                }}
                onDeploy={(url: string) => {
                  console.log('Portfolio deployed to:', url);
                  alert(`Portfolio deployed to ${url}`);
                }}
                aiEnabled={true}
                preferredAIProvider="gemini"
              />
            </div>
          )}

          {activeTab === 'github' && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">GitHub Pages Generator</h2>
                <p className="text-gray-400">
                  Deploy your portfolio to GitHub Pages with automatic repository setup.
                </p>
              </div>
              
              {/* GitHub Pages Generator Component */}
              <GitHubPagesGenerator
                portfolioData={portfolioData}
                githubToken="your-github-token-here"
                repository="johndoe-portfolio"
                onDeploy={(url: string) => {
                  console.log('Portfolio deployed to GitHub Pages:', url);
                  alert(`Portfolio deployed to GitHub Pages: ${url}`);
                }}
                onError={(error: string) => {
                  console.error('GitHub Pages deployment failed:', error);
                  alert(`Deployment failed: ${error}`);
                }}
              />
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AIResumeBuilderPage;
