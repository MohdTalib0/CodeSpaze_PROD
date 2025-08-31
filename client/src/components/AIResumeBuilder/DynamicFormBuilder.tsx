import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Save, Eye } from 'lucide-react';
import { ResumeTemplate, ResumeSection, ResumeField } from '../../types/resume-templates';
import Button from '../UI/Button';

interface DynamicFormBuilderProps {
  template: ResumeTemplate;
  onSave: (data: any) => void;
  onPreview: (data: any) => void;
  initialData?: any;
  resumeId?: number | null;
  currentStatus?: string;
  onStatusChange?: (status: string, notes?: string) => void;
  onExport?: (format: 'pdf' | 'docx') => void;
}

export const DynamicFormBuilder: React.FC<DynamicFormBuilderProps> = ({
  template,
  onSave,
  onPreview,
  initialData,
  resumeId,
  currentStatus,
  onStatusChange,
  onExport
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [resumeStatus, setResumeStatus] = useState<'draft' | 'completed' | 'published'>('draft');
  const [showFullPreview, setShowFullPreview] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [confirmData, setConfirmData] = useState<string>('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [messageContent, setMessageContent] = useState<string>('');
  const [isExporting, setIsExporting] = useState(false);
  const [exportFormat, setExportFormat] = useState<'pdf' | 'docx' | null>(null);

  // Debug: Log form data changes
  React.useEffect(() => {
    console.log('Form data updated:', formData);
  }, [formData]);

  // Handle initialData changes separately
  React.useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      console.log('initialData changed, updating form:', initialData);
      setFormData(initialData);
    }
  }, [initialData]);

  // Initialize form data with initial values or empty values
  React.useEffect(() => {
    console.log('DynamicFormBuilder useEffect triggered:', { initialData, template: template.id, currentFormData: Object.keys(formData) });
    
    if (initialData && Object.keys(initialData).length > 0) {
      // Use provided initial data
      console.log('Setting form data from initialData:', initialData);
      setFormData(initialData);
    } else if (Object.keys(formData).length === 0) {
      // Only initialize with empty values if form is completely empty
      console.log('Initializing with empty data');
      const emptyData: Record<string, any> = {};
      template.sections.forEach(section => {
        section.fields.forEach(field => {
          if (field.type === 'array') {
            if (field.id === 'experiences') {
              emptyData[field.id] = [''];
              // Initialize with one empty experience
              emptyData['company_0'] = '';
              emptyData['position_0'] = '';
              emptyData['startDate_0'] = '';
              emptyData['endDate_0'] = '';
              emptyData['description_0'] = '';
            } else if (field.id === 'educations') {
              emptyData[field.id] = [''];
              // Initialize with one empty education
              emptyData['degree_0'] = '';
              emptyData['school_0'] = '';
              emptyData['graduationYear_0'] = '';
              emptyData['gpa_0'] = '';
            } else if (field.id === 'achievements') {
              emptyData[field.id] = [''];
              // Initialize with one empty achievement
              emptyData['achievement_0'] = '';
            } else {
              emptyData[field.id] = [''];
            }
          } else {
            emptyData[field.id] = '';
          }
        });
      });
      setFormData(emptyData);
    } else {
      console.log('Form already has data, not overriding');
    }
  }, [template, initialData]);

  const handleInputChange = (fieldId: string, value: any, index?: number) => {
    setFormData(prev => {
      if (index !== undefined && Array.isArray(prev[fieldId])) {
        const newArray = [...prev[fieldId]];
        newArray[index] = value;
        return { ...prev, [fieldId]: newArray };
      }
      return { ...prev, [fieldId]: value };
    });

    // Clear error when user starts typing
    if (errors[fieldId]) {
      setErrors(prev => ({ ...prev, [fieldId]: '' }));
    }
  };

  const addArrayItem = (fieldId: string) => {
    setFormData(prev => {
      const newArray = [...(prev[fieldId] || []), ''];
      const newFormData = { ...prev, [fieldId]: newArray };
      
      // Special handling for experiences, educations, and achievements
      if (fieldId === 'experiences') {
        const newIndex = newArray.length - 1;
        newFormData[`company_${newIndex}`] = '';
        newFormData[`position_${newIndex}`] = '';
        newFormData[`startDate_${newIndex}`] = '';
        newFormData[`endDate_${newIndex}`] = '';
        newFormData[`description_${newIndex}`] = '';
      } else if (fieldId === 'educations') {
        const newIndex = newArray.length - 1;
        newFormData[`degree_${newIndex}`] = '';
        newFormData[`school_${newIndex}`] = '';
        newFormData[`graduationYear_${newIndex}`] = '';
        newFormData[`gpa_${newIndex}`] = '';
      } else if (fieldId === 'achievements') {
        const newIndex = newArray.length - 1;
        newFormData[`achievement_${newIndex}`] = '';
      }
      
      return newFormData;
    });
  };

  const removeArrayItem = (fieldId: string, index: number) => {
    setFormData(prev => {
      const newArray = prev[fieldId].filter((_: any, i: number) => i !== index);
      const newFormData = { ...prev, [fieldId]: newArray };
      
      // Special handling for experiences and educations - remove associated fields
      if (fieldId === 'experiences') {
        // Remove the specific experience fields
        delete newFormData[`company_${index}`];
        delete newFormData[`position_${index}`];
        delete newFormData[`startDate_${index}`];
        delete newFormData[`endDate_${index}`];
        delete newFormData[`description_${index}`];
        
        // Renumber remaining fields
        for (let i = index; i < newArray.length; i++) {
          newFormData[`company_${i}`] = newFormData[`company_${i + 1}`] || '';
          newFormData[`position_${i}`] = newFormData[`position_${i + 1}`] || '';
          newFormData[`startDate_${i}`] = newFormData[`startDate_${i + 1}`] || '';
          newFormData[`endDate_${i}`] = newFormData[`endDate_${i + 1}`] || '';
          newFormData[`description_${i}`] = newFormData[`description_${i + 1}`] || '';
        }
        
        // Remove the last set of fields
        const lastIndex = newArray.length;
        delete newFormData[`company_${lastIndex}`];
        delete newFormData[`position_${lastIndex}`];
        delete newFormData[`startDate_${lastIndex}`];
        delete newFormData[`endDate_${lastIndex}`];
        delete newFormData[`description_${lastIndex}`];
      } else if (fieldId === 'educations') {
        // Remove the specific education fields
        delete newFormData[`degree_${index}`];
        delete newFormData[`school_${index}`];
        delete newFormData[`graduationYear_${index}`];
        delete newFormData[`gpa_${index}`];
        
        // Renumber remaining fields
        for (let i = index; i < newArray.length; i++) {
          newFormData[`degree_${i}`] = newFormData[`degree_${i + 1}`] || '';
          newFormData[`school_${i}`] = newFormData[`school_${i + 1}`] || '';
          newFormData[`graduationYear_${i}`] = newFormData[`graduationYear_${i + 1}`] || '';
          newFormData[`gpa_${i}`] = newFormData[`gpa_${i + 1}`] || '';
        }
        
        // Remove the last set of fields
        const lastIndex = newArray.length;
        delete newFormData[`degree_${lastIndex}`];
        delete newFormData[`school_${lastIndex}`];
        delete newFormData[`graduationYear_${lastIndex}`];
        delete newFormData[`gpa_${lastIndex}`];
      } else if (fieldId === 'achievements') {
        // Remove the specific achievement field
        delete newFormData[`achievement_${index}`];
        
        // Renumber remaining fields
        for (let i = index; i < newArray.length; i++) {
          newFormData[`achievement_${i}`] = newFormData[`achievement_${i + 1}`] || '';
        }
        
        // Remove the last set of fields
        const lastIndex = newArray.length;
        delete newFormData[`achievement_${lastIndex}`];
      }
      
      return newFormData;
    });
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    const missingFields: string[] = [];

    template.sections.forEach(section => {
      section.fields.forEach(field => {
        if (field.required) {
          if (field.type === 'array') {
            // For array fields, check if at least one item has required data
            const arrayValue = formData[field.id];
            if (!arrayValue || !Array.isArray(arrayValue) || arrayValue.length === 0) {
              newErrors[field.id] = `${field.name} is required - Add at least one entry`;
              missingFields.push(`${field.name} (add at least one entry)`);
            } else {
              // Check if at least one item has the required fields filled
              let hasValidItem = false;
              let missingDetails: string[] = [];
              
              if (field.id === 'educations') {
                // For education, check if at least one has degree and school
                for (let i = 0; i < arrayValue.length; i++) {
                  const degree = formData[`degree_${i}`];
                  const school = formData[`school_${i}`];
                  if (degree && school && degree.trim() && school.trim()) {
                    hasValidItem = true;
                    break;
                  } else {
                    if (!degree || !degree.trim()) missingDetails.push(`Degree for Education ${i + 1}`);
                    if (!school || !school.trim()) missingDetails.push(`School for Education ${i + 1}`);
                  }
                }
                if (!hasValidItem) {
                  newErrors[field.id] = `Education is incomplete - ${missingDetails.slice(0, 2).join(' and ')} required`;
                  missingFields.push(`Education: ${missingDetails.slice(0, 2).join(', ')}`);
                }
              } else if (field.id === 'experiences') {
                // For experience, check if at least one has company and position
                for (let i = 0; i < arrayValue.length; i++) {
                  const company = formData[`company_${i}`];
                  const position = formData[`position_${i}`];
                  if (company && position && company.trim() && position.trim()) {
                    hasValidItem = true;
                    break;
                  } else {
                    if (!company || !company.trim()) missingDetails.push(`Company for Experience ${i + 1}`);
                    if (!position || !position.trim()) missingDetails.push(`Position for Experience ${i + 1}`);
                  }
                }
                if (!hasValidItem) {
                  newErrors[field.id] = `Work Experience is incomplete - ${missingDetails.slice(0, 2).join(' and ')} required`;
                  missingFields.push(`Work Experience: ${missingDetails.slice(0, 2).join(', ')}`);
                }
              } else {
                // For other array fields, check if at least one item has content
                hasValidItem = arrayValue.some((item: string) => item && typeof item === 'string' && item.trim());
                if (!hasValidItem) {
                  newErrors[field.id] = `${field.name} is required - Add at least one entry`;
                  missingFields.push(`${field.name} (add at least one entry)`);
                }
              }
            }
          } else {
            // For non-array fields, check if they have values
            const value = formData[field.id];
            if (!value || (typeof value === 'string' && !value.trim())) {
              newErrors[field.id] = `${field.name} is required`;
              missingFields.push(field.name);
            }
          }
        }
      });
    });

    setErrors(newErrors);
    
    // Store missing fields for detailed feedback
    if (missingFields.length > 0) {
      console.log('Missing required fields:', missingFields);
    }
    
    return Object.keys(newErrors).length === 0;
  };

  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  const handleSave = async () => {
    if (validateForm()) {
      // Show what's being saved
      const dataSummary = generateDataSummary();
      setConfirmData(dataSummary);
      setShowConfirmDialog(true);
    }
  };

  const confirmAndSave = async () => {
    setIsSaving(true);
    setSaveStatus('saving');
    
    try {
      // Log what's being saved
      console.log('🔄 Saving resume data:', formData);
      console.log('📊 Data summary:', generateDataSummary());
      
      // Call the onSave function
      await onSave(formData);
      
      // Show success feedback
      setSaveStatus('success');
      setErrors({}); // Clear any existing errors
      
      // Change status from draft to completed
      setResumeStatus('completed');
      
      // Update status in parent component if callback exists
      if (onStatusChange) {
        onStatusChange('completed', 'Resume completed and saved');
      }
      
      // Show full preview mode
      setShowFullPreview(true);
      
      // Show success message with summary
      setMessageContent(`✅ Resume saved successfully!\n\n${confirmData}\n\nStatus changed to: COMPLETED\n\nYou can now view the full preview and export your resume.`);
      setShowSuccessMessage(true);
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setSaveStatus('idle');
        setShowSuccessMessage(false);
      }, 5000);
      
    } catch (error) {
      console.error('Error saving resume:', error);
      setSaveStatus('error');
      setMessageContent('❌ Failed to save resume. Please try again.');
      setShowErrorMessage(true);
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setSaveStatus('idle');
        setShowErrorMessage(false);
      }, 5000);
    } finally {
      setIsSaving(false);
    }
    
    // Close the confirmation dialog
    setShowConfirmDialog(false);
  };

  const handleExport = async (format: 'pdf' | 'docx') => {
    if (!formData || Object.keys(formData).length === 0) {
      setMessageContent('❌ Please fill out the resume form before exporting.');
      setShowErrorMessage(true);
      setTimeout(() => setShowErrorMessage(false), 5000);
      return;
    }

    setIsExporting(true);
    setExportFormat(format);
    
    try {
      // Debug: Log what we're sending
      console.log('🔍 Export Debug - Template:', template);
      console.log('🔍 Export Debug - Template ID:', template.id);
      console.log('🔍 Export Debug - Form Data:', formData);
      console.log('🔍 Export Debug - Form Data Keys:', Object.keys(formData));
      
      const exportPayload = { 
        template_id: template.id,
        resume_data: formData
      };
      console.log('🔍 Export Debug - Export Payload:', exportPayload);
      
      const response = await fetch(`/api/ai-resume/export-${format}-temp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        },
        body: JSON.stringify(exportPayload)
      });

      if (response.ok) {
        // Create blob and download
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `resume_${formData.first_name || 'my'}_${formData.last_name || 'resume'}.${format}`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        
        // Show success message
        setMessageContent(`✅ Resume exported to ${format.toUpperCase()} successfully!`);
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 5000);
      } else {
        throw new Error(`Failed to export to ${format.toUpperCase()}`);
      }
    } catch (error) {
      console.error(`Error exporting to ${format}:`, error);
      setMessageContent(`❌ Failed to export resume to ${format.toUpperCase()}. Please try again.`);
      setShowErrorMessage(true);
      setTimeout(() => setShowErrorMessage(false), 5000);
    } finally {
      setIsExporting(false);
      setExportFormat(null);
    }
  };

  const generateDataSummary = (): string => {
    const summary: string[] = [];
    
    // Personal Information
    if (formData.first_name || formData.last_name) {
      summary.push(`👤 ${formData.first_name || ''} ${formData.last_name || ''}`);
    }
    if (formData.email) {
      summary.push(`📧 ${formData.email}`);
    }
    if (formData.title) {
      summary.push(`💼 ${formData.title}`);
    }
    
    // Education
    const educations = formData.educations || [];
    if (educations.length > 0) {
      const educationCount = educations.filter((_: any, i: number) => {
        const degree = formData[`degree_${i}`];
        const school = formData[`school_${i}`];
        return degree && school && degree.trim() && school.trim();
      }).length;
      if (educationCount > 0) {
        summary.push(`🎓 ${educationCount} education entry(ies)`);
      }
    }
    
    // Experience
    const experiences = formData.experiences || [];
    if (experiences.length > 0) {
      const experienceCount = experiences.filter((_: any, i: number) => {
        const company = formData[`company_${i}`];
        const position = formData[`position_${i}`];
        return company && position && company.trim() && position.trim();
      }).length;
      if (experienceCount > 0) {
        summary.push(`💼 ${experienceCount} work experience(s)`);
      }
    }
    
    // Skills
    if (formData.skills && typeof formData.skills === 'string' && formData.skills.trim()) {
      summary.push(`🛠️ Skills included`);
    }
    
    // Summary
    if (formData.summary && typeof formData.summary === 'string' && formData.summary.trim()) {
      summary.push(`📝 Professional summary included`);
    }
    
    return summary.join('\n');
  };

  const showValidationSummary = () => {
    const missingFields: string[] = [];
    
    template.sections.forEach(section => {
      section.fields.forEach(field => {
        if (field.required) {
          if (field.type === 'array') {
            const arrayValue = formData[field.id];
            if (!arrayValue || !Array.isArray(arrayValue) || arrayValue.length === 0) {
              missingFields.push(`${field.name} (add at least one entry)`);
            } else {
              let hasValidItem = false;
              let missingDetails: string[] = [];
              
              if (field.id === 'educations') {
                for (let i = 0; i < arrayValue.length; i++) {
                  const degree = formData[`degree_${i}`];
                  const school = formData[`school_${i}`];
                  if (degree && school && degree.trim() && school.trim()) {
                    hasValidItem = true;
                    break;
                  } else {
                    if (!degree || !degree.trim()) missingDetails.push(`Degree for Education ${i + 1}`);
                    if (!school || !degree.trim()) missingDetails.push(`School for Education ${i + 1}`);
                  }
                }
                if (!hasValidItem) {
                  missingFields.push(`Education: ${missingDetails.slice(0, 2).join(', ')}`);
                }
              } else if (field.id === 'experiences') {
                for (let i = 0; i < arrayValue.length; i++) {
                  const company = formData[`company_${i}`];
                  const position = formData[`position_${i}`];
                  if (company && position && company.trim() && position.trim()) {
                    hasValidItem = true;
                    break;
                  } else {
                    if (!company || !company.trim()) missingDetails.push(`Company for Experience ${i + 1}`);
                    if (!position || !position.trim()) missingDetails.push(`Position for Experience ${i + 1}`);
                  }
                }
                if (!hasValidItem) {
                  missingFields.push(`Work Experience: ${missingDetails.slice(0, 2).join(', ')}`);
                }
              } else {
                hasValidItem = arrayValue.some((item: string) => item && typeof item === 'string' && item.trim());
                if (!hasValidItem) {
                  missingFields.push(`${field.name} (add at least one entry)`);
                }
              }
            }
          } else {
            const value = formData[field.id];
            if (!value || (typeof value === 'string' && !value.trim())) {
              missingFields.push(field.name);
            }
          }
        }
      });
    });

    // Create detailed error message
    const errorMessage = `Resume cannot be saved. Please complete the following required fields:\n\n${missingFields.map(field => `• ${field}`).join('\n')}`;
    
    // Show error message using state
    setMessageContent(errorMessage);
    setShowErrorMessage(true);
    
    // Auto-hide after 8 seconds
    setTimeout(() => {
      setShowErrorMessage(false);
    }, 8000);
  };

  const calculateCompletionPercentage = (): number => {
    let completedFields = 0;
    let totalFields = 0;

    template.sections.forEach(section => {
      section.fields.forEach(field => {
        if (field.required) {
          totalFields++;
          if (field.type === 'array') {
            const arrayValue = formData[field.id];
            if (arrayValue && Array.isArray(arrayValue) && arrayValue.length > 0) {
              // Check if at least one item has required data
              let hasValidItem = false;
              
              if (field.id === 'educations') {
                for (let i = 0; i < arrayValue.length; i++) {
                  const degree = formData[`degree_${i}`];
                  const school = formData[`school_${i}`];
                  if (degree && school && degree.trim() && school.trim()) {
                    hasValidItem = true;
                    break;
                  }
                }
              } else if (field.id === 'experiences') {
                for (let i = 0; i < arrayValue.length; i++) {
                  const company = formData[`company_${i}`];
                  const position = formData[`position_${i}`];
                  if (company && position && company.trim() && position.trim()) {
                    hasValidItem = true;
                    break;
                  }
                }
              } else {
                hasValidItem = arrayValue.some((item: string) => item && typeof item === 'string' && item.trim());
              }
              
              if (hasValidItem) completedFields++;
            }
          } else {
            const value = formData[field.id];
            if (value && (typeof value !== 'string' || value.trim())) {
              completedFields++;
            }
          }
        }
      });
    });

    return totalFields > 0 ? Math.round((completedFields / totalFields) * 100) : 0;
  };

  const renderField = (field: ResumeField, sectionId: string) => {
    const value = formData[field.id] || '';
    const error = errors[field.id];

    switch (field.type) {
      case 'text':
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            className={`w-full px-4 py-3 bg-dark-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#19c973] focus:border-transparent ${
              error ? 'border-red-500' : 'border-white/10'
            }`}
          />
        );

      case 'textarea':
        return (
          <textarea
            value={value}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            rows={4}
            className={`w-full px-4 py-3 bg-dark-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#19c973] focus:border-transparent ${
              error ? 'border-red-500' : 'border-white/10'
            }`}
          />
        );

      case 'date':
        return (
          <input
            type="month"
            value={value}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            className={`w-full px-4 py-3 bg-dark-800/50 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#19c973] focus:border-transparent ${
              error ? 'border-red-500' : 'border-white/10'
            }`}
          />
        );

      case 'array':
        const arrayValue = Array.isArray(value) ? value : [''];
        
        // Special handling for experiences, education, and achievements arrays
        if (field.id === 'experiences') {
          return renderExperienceArray(arrayValue);
        } else if (field.id === 'educations') {
          return renderEducationArray(arrayValue);
        } else if (field.id === 'achievements') {
          return renderAchievementsArray(arrayValue);
        } else {
          // Regular array field (like skills)
          return (
            <div className="space-y-3">
              {arrayValue.map((item: string, index: number) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleInputChange(field.id, e.target.value, index)}
                    placeholder={field.placeholder}
                    className={`flex-1 px-4 py-3 bg-dark-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#19c973] focus:border-transparent ${
                      error ? 'border-red-500' : 'border-white/10'
                    }`}
                  />
                  {arrayValue.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem(field.id, index)}
                      className="px-3 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem(field.id)}
                className="flex items-center gap-2 px-4 py-2 bg-dark-700 hover:bg-dark-600 text-white rounded-lg transition-colors duration-200"
              >
                <Plus className="w-4 h-4" />
                Add {field.name}
              </button>
            </div>
          );
        }

      default:
        return null;
    }
  };

  const renderExperienceArray = (experiences: any[]) => {
    return (
      <div className="space-y-4">
        {experiences.map((experience: any, index: number) => (
          <div key={index} className="bg-dark-800/30 p-4 rounded-lg border border-white/10">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-lg font-medium text-white">Experience {index + 1}</h4>
              {experiences.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayItem('experiences', index)}
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Company</label>
                <input
                  type="text"
                  value={formData[`company_${index}`] || ''}
                  onChange={(e) => handleInputChange(`company_${index}`, e.target.value)}
                  placeholder="Company Name"
                  className="w-full px-3 py-2 bg-dark-800/50 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#19c973] focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Position</label>
                <input
                  type="text"
                  value={formData[`position_${index}`] || ''}
                  onChange={(e) => handleInputChange(`position_${index}`, e.target.value)}
                  placeholder="Job Title"
                  className="w-full px-3 py-2 bg-dark-800/50 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#19c973] focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Start Date</label>
                <input
                  type="month"
                  value={formData[`startDate_${index}`] || ''}
                  onChange={(e) => handleInputChange(`startDate_${index}`, e.target.value)}
                  className="w-full px-3 py-2 bg-dark-800/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#19c973] focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">End Date</label>
                <input
                  type="month"
                  value={formData[`endDate_${index}`] || ''}
                  onChange={(e) => handleInputChange(`endDate_${index}`, e.target.value)}
                  placeholder="Present"
                  className="w-full px-3 py-2 bg-dark-800/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#19c973] focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
              <textarea
                value={formData[`description_${index}`] || ''}
                onChange={(e) => handleInputChange(`description_${index}`, e.target.value)}
                placeholder="Describe your role and achievements..."
                rows={3}
                className="w-full px-3 py-2 bg-dark-800/50 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#19c973] focus:border-transparent"
              />
            </div>
          </div>
        ))}
        
        <button
          type="button"
          onClick={() => addArrayItem('experiences')}
          className="flex items-center gap-2 px-4 py-2 bg-dark-700 hover:bg-dark-600 text-white rounded-lg transition-colors duration-200"
        >
          <Plus className="w-4 h-4" />
          Add Another Experience
        </button>
      </div>
    );
  };

  const renderEducationArray = (educations: any[]) => {
    return (
      <div className="space-y-4">
        {educations.map((education: any, index: number) => (
          <div key={index} className="bg-dark-800/30 p-4 rounded-lg border border-white/10">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-lg font-medium text-white">Education {index + 1}</h4>
              {educations.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayItem('educations', index)}
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Degree</label>
                <input
                  type="text"
                  value={formData[`degree_${index}`] || ''}
                  onChange={(e) => handleInputChange(`degree_${index}`, e.target.value)}
                  placeholder="Bachelor of Science in Computer Science"
                  className="w-full px-3 py-2 bg-dark-800/50 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#19c973] focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">School</label>
                <input
                  type="text"
                  value={formData[`school_${index}`] || ''}
                  onChange={(e) => handleInputChange(`school_${index}`, e.target.value)}
                  placeholder="University Name"
                  className="w-full px-3 py-2 bg-dark-800/50 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#19c973] focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Graduation Year</label>
                <input
                  type="text"
                  value={formData[`graduationYear_${index}`] || ''}
                  onChange={(e) => handleInputChange(`graduationYear_${index}`, e.target.value)}
                  placeholder="2020"
                  className="w-full px-3 py-2 bg-dark-800/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#19c973] focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">GPA</label>
                <input
                  type="text"
                  value={formData[`gpa_${index}`] || ''}
                  onChange={(e) => handleInputChange(`gpa_${index}`, e.target.value)}
                  placeholder="3.8/4.0"
                  className="w-full px-3 py-2 bg-dark-800/50 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#19c973] focus:border-transparent"
                />
              </div>
            </div>
          </div>
        ))}
        
        <button
          type="button"
          onClick={() => addArrayItem('educations')}
          className="flex items-center gap-2 px-4 py-2 bg-dark-700 hover:bg-dark-600 text-white rounded-lg transition-colors duration-200"
        >
          <Plus className="w-4 h-4" />
          Add Another Education
        </button>
      </div>
    );
  };

  const renderAchievementsArray = (achievements: any[]) => {
    return (
      <div className="space-y-4">
        {achievements.map((achievement: any, index: number) => (
          <div key={index} className="bg-dark-800/30 p-4 rounded-lg border border-white/10">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-lg font-medium text-white">Achievement {index + 1}</h4>
              {achievements.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayItem('achievements', index)}
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Achievement Description</label>
              <textarea
                value={formData[`achievement_${index}`] || ''}
                onChange={(e) => handleInputChange(`achievement_${index}`, e.target.value)}
                placeholder="Increased team productivity by 40% through process optimization"
                rows={3}
                className="w-full px-3 py-2 bg-dark-800/50 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#19c973] focus:border-transparent"
              />
            </div>
          </div>
        ))}
        
        <button
          type="button"
          onClick={() => addArrayItem('achievements')}
          className="flex items-center gap-2 px-4 py-2 bg-dark-700 hover:bg-dark-600 text-white rounded-lg transition-colors duration-200"
        >
          <Plus className="w-4 h-4" />
          Add Another Achievement
        </button>
      </div>
    );
  };

  const renderSection = (section: ResumeSection) => {
    return (
      <motion.div
        key={section.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 rounded-xl"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">
            {section.name}
            {section.required && <span className="text-red-400 ml-1">*</span>}
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {section.fields.map((field) => (
            <div key={field.id} className={field.type === 'textarea' ? 'w-full' : ''}>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {field.name}
                {field.required && <span className="text-red-400 ml-1">*</span>}
              </label>
              {renderField(field, section.id)}
              {errors[field.id] && (
                <p className="text-red-400 text-sm mt-1">{errors[field.id]}</p>
              )}
            </div>
          ))}
        </div>
        
        {/* Status Management Section */}
        {resumeId && (
          <div className="mt-8 pt-6 border-t border-white/10">
            <h4 className="text-lg font-medium text-white mb-4">Resume Status & Export</h4>
            
            {/* Status Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                <select
                  value={currentStatus || 'draft'}
                  onChange={(e) => onStatusChange?.(e.target.value)}
                  className="w-full px-4 py-3 bg-dark-800/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#19c973] focus:border-transparent"
                >
                  <option value="draft">Draft</option>
                  <option value="completed">Completed</option>
                  <option value="published">Published</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Notes</label>
                <input
                  type="text"
                  placeholder="Add notes about this version..."
                  className="w-full px-4 py-3 bg-dark-800/50 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#19c973] focus:border-transparent"
                />
              </div>
            </div>
            
            {/* Export Buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => onExport?.('pdf')}
                className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Export to PDF
              </button>
              
              <button
                type="button"
                onClick={() => onExport?.('docx')}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Export to DOCX
              </button>
            </div>
          </div>
        )}
      </motion.div>
    );
  };

  // Real-time preview rendering functions
  const renderPreviewHeader = () => {
    switch (template.id) {
      case 'modern-professional':
        return (
          <div className="text-center pb-4 border-b border-gray-300">
            <h1 className="text-2xl font-bold text-gray-800 mb-1">
              {formData.firstName || 'Your'} {formData.lastName || 'Name'}
            </h1>
            <p className="text-lg text-gray-600 mb-2">{formData.title || 'Professional Title'}</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              {formData.email && <span>{formData.email}</span>}
              {formData.phone && <span>{formData.phone}</span>}
              {formData.location && <span>{formData.location}</span>}
            </div>
            <div className="flex justify-center gap-4 mt-2 text-sm text-blue-600">
              {formData.linkedin && <span>{formData.linkedin}</span>}
              {formData.github && <span>{formData.github}</span>}
            </div>
          </div>
        );

      case 'classic-elegant':
        return (
          <div className="text-center pb-4 border-b-2 border-gray-800">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {formData.firstName || 'Your'} {formData.lastName || 'Name'}
            </h1>
            <p className="text-xl text-gray-700 mb-3">{formData.title || 'Professional Title'}</p>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 max-w-md mx-auto">
              {formData.email && <div>{formData.email}</div>}
              {formData.phone && <div>{formData.phone}</div>}
              {formData.location && <div className="col-span-2">{formData.location}</div>}
            </div>
          </div>
        );

      case 'creative-portfolio':
        return (
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-lg mb-4">
            <h1 className="text-3xl font-bold mb-2">
              {formData.firstName || 'Your'} {formData.lastName || 'Name'}
            </h1>
            <p className="text-xl mb-3">{formData.title || 'Professional Title'}</p>
            <div className="flex flex-wrap gap-4 text-sm">
              {formData.email && <span>{formData.email}</span>}
              {formData.phone && <span>{formData.phone}</span>}
              {formData.location && <span>{formData.location}</span>}
            </div>
          </div>
        );

      case 'minimal-clean':
        return (
          <div className="pb-4 border-b border-gray-400">
            <h1 className="text-2xl font-light text-gray-800 mb-1">
              {formData.firstName || 'Your'} {formData.lastName || 'Name'}
            </h1>
            <p className="text-lg text-gray-600 mb-2">{formData.title || 'Professional Title'}</p>
            <div className="text-sm text-gray-500 space-y-1">
              {formData.email && <div>{formData.email}</div>}
              {formData.phone && <div>{formData.phone}</div>}
              {formData.location && <div>{formData.location}</div>}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderPreviewSummary = () => {
    if (!formData.summary) return null;
    return (
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Professional Summary</h2>
        <p className="text-sm text-gray-600 leading-relaxed">{formData.summary}</p>
      </div>
    );
  };

  const renderPreviewExperience = () => {
    // Check if we have any experience data
    const hasExperience = formData.company || formData.position || 
                         (formData.experiences && formData.experiences.length > 0);
    
    if (!hasExperience) return null;
    
    return (
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Work Experience</h2>
        
        {/* Show multiple experiences if available */}
        {formData.experiences && formData.experiences.length > 0 ? (
          formData.experiences.map((_: any, index: number) => {
            const company = formData[`company_${index}`];
            const position = formData[`position_${index}`];
            const startDate = formData[`startDate_${index}`];
            const endDate = formData[`endDate_${index}`];
            const description = formData[`description_${index}`];
            
            if (!company && !position) return null;
            
            return (
              <div key={index} className="mb-3 pb-3 border-b border-gray-200 last:border-b-0">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-medium text-gray-800">{position || 'Position'}</h3>
                  <span className="text-sm text-gray-500">
                    {startDate || 'Start Date'} - {endDate || 'Present'}
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-700 mb-1">{company || 'Company'}</p>
                {description && (
                  <p className="text-sm text-gray-600">{description}</p>
                )}
                {/* Show achievements if available */}
                {formData.achievements && formData.achievements.length > 0 && (
                  <div className="mt-2">
                    <h4 className="text-xs font-medium text-gray-600 mb-1">Key Achievements:</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {formData.achievements.map((_: any, achievementIndex: number) => {
                        const achievement = formData[`achievement_${achievementIndex}`];
                        return achievement ? (
                          <li key={achievementIndex} className="text-xs text-gray-600">{achievement}</li>
                        ) : null;
                      })}
                    </ul>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          /* Fallback to single experience fields */
          <div className="mb-3">
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-medium text-gray-800">{formData.position}</h3>
              <span className="text-sm text-gray-500">
                {formData.startDate} - {formData.endDate || 'Present'}
              </span>
            </div>
            <p className="text-sm font-medium text-gray-700 mb-1">{formData.company}</p>
            {formData.description && (
              <p className="text-sm text-gray-600">{formData.description}</p>
            )}
            {/* Show achievements if available */}
            {formData.achievements && formData.achievements.length > 0 && (
              <div className="mt-2">
                <h4 className="text-xs font-medium text-gray-600 mb-1">Key Achievements:</h4>
                <ul className="list-disc list-inside space-y-1">
                  {formData.achievements.map((_: any, achievementIndex: number) => {
                    const achievement = formData[`achievement_${achievementIndex}`];
                    return achievement ? (
                      <li key={achievementIndex} className="text-xs text-gray-600">{achievement}</li>
                    ) : null;
                  })}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderPreviewSkills = () => {
    const hasSkills = formData.technicalSkills || formData.skills || formData.frontend || formData.backend;
    if (!hasSkills) return null;

    switch (template.id) {
      case 'modern-professional':
        return (
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Skills</h2>
            <div className="grid grid-cols-2 gap-4">
              {formData.technicalSkills && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-1">Technical Skills</h3>
                  <div className="flex flex-wrap gap-1">
                    {formData.technicalSkills.filter((s: string) => s && typeof s === 'string' && s.trim()).map((skill: string, index: number) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {formData.softSkills && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-1">Soft Skills</h3>
                  <div className="flex flex-wrap gap-1">
                    {formData.softSkills.filter((s: string) => s && typeof s === 'string' && s.trim()).map((skill: string, index: number) => (
                      <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 'classic-elegant':
        return (
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {[...(formData.technicalSkills || []), ...(formData.softSkills || [])]
                .filter((s: string) => s && typeof s === 'string' && s.trim())
                .map((skill: string, index: number) => (
                  <span key={index} className="px-3 py-1 bg-gray-200 text-gray-800 text-sm rounded-full">
                    {skill}
                  </span>
                ))}
            </div>
          </div>
        );

      case 'minimal-clean':
        return (
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Skills</h2>
            <div className="space-y-2">
              {formData.frontend && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-1">Frontend</h3>
                  <p className="text-sm text-gray-600">{formData.frontend.filter((s: string) => s && typeof s === 'string' && s.trim()).join(', ')}</p>
                </div>
              )}
              {formData.backend && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-1">Backend</h3>
                  <p className="text-sm text-gray-600">{formData.backend.filter((s: string) => s && typeof s === 'string' && s.trim()).join(', ')}</p>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderPreviewEducation = () => {
    // Check if we have any education data
    const hasEducation = formData.degree || formData.school || 
                        (formData.educations && formData.educations.length > 0);
    
    if (!hasEducation) return null;
    
    return (
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Education</h2>
        
        {/* Show multiple education entries if available */}
        {formData.educations && formData.educations.length > 0 ? (
          formData.educations.map((_: any, index: number) => {
            const degree = formData[`degree_${index}`];
            const school = formData[`school_${index}`];
            const graduationYear = formData[`graduationYear_${index}`];
            const gpa = formData[`gpa_${index}`];
            
            if (!degree && !school) return null;
            
            return (
              <div key={index} className="mb-2 pb-2 border-b border-gray-200 last:border-b-0">
                <h3 className="font-medium text-gray-800">{degree || 'Degree'}</h3>
                <p className="text-sm text-gray-700 mb-1">{school || 'School'}</p>
                <p className="text-sm text-gray-500">
                  {graduationYear || 'Graduation Year'}
                  {gpa && ` • GPA: ${gpa}`}
                </p>
              </div>
            );
          })
        ) : (
          /* Fallback to single education fields */
          <div className="mb-2">
            <h3 className="font-medium text-gray-800">{formData.degree}</h3>
            <p className="text-sm text-gray-700 mb-1">{formData.school}</p>
            <p className="text-sm text-gray-500">
              {formData.graduationYear}
              {formData.gpa && ` • GPA: ${formData.gpa}`}
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
              <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-2">
            Fill in Your {template.name} Resume
          </h3>
          <p className="text-gray-400">
            Complete the form below to generate your professional resume
          </p>
          
          {/* Status Indicator */}
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium">
            {resumeStatus === 'draft' && (
              <div className="flex items-center gap-2 text-yellow-400 bg-yellow-900/20 px-3 py-1 rounded-full border border-yellow-500/30">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                Draft Mode
              </div>
            )}
            {resumeStatus === 'completed' && (
              <div className="flex items-center gap-2 text-green-400 bg-green-900/20 px-3 py-1 rounded-full border border-green-500/30">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                Completed ✓
              </div>
            )}
            {resumeStatus === 'published' && (
              <div className="flex items-center gap-2 text-blue-400 bg-blue-900/20 px-3 py-1 rounded-full border border-blue-500/30">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                Published ✓
              </div>
            )}
          </div>
        </div>

      {/* Two Column Layout: Form + Live Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side: Form */}
        <div className="space-y-6">
          {template.sections
            .sort((a, b) => a.order - b.order)
            .map(renderSection)}
          
          {/* Status Management & Validation Summary */}
          <div className="space-y-4">
            {/* Status Change Dropdown */}
            <div className="flex items-center gap-4 p-4 bg-dark-800/30 border border-white/10 rounded-lg">
              <label className="text-white font-medium">Resume Status:</label>
              <select
                value={resumeStatus}
                onChange={(e) => {
                  const newStatus = e.target.value as 'draft' | 'completed' | 'published';
                  setResumeStatus(newStatus);
                  if (onStatusChange) {
                    onStatusChange(newStatus, `Status changed to ${newStatus}`);
                  }
                  if (newStatus === 'completed' || newStatus === 'published') {
                    setShowFullPreview(true);
                  }
                }}
                className="px-3 py-2 bg-dark-700 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#19c973]"
              >
                <option value="draft">Draft</option>
                <option value="completed">Completed</option>
                <option value="published">Published</option>
              </select>
              <span className="text-sm text-gray-400">
                {resumeStatus === 'draft' && 'Work in progress'}
                {resumeStatus === 'completed' && 'Ready for review'}
                {resumeStatus === 'published' && 'Final version'}
              </span>
            </div>

            {/* Validation Summary */}
            {Object.keys(errors).length > 0 && (
              <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
                <h3 className="text-lg font-semibold text-red-400 mb-2">⚠️ Resume Incomplete</h3>
                <p className="text-red-300 mb-3">The following required fields need to be completed:</p>
                <ul className="space-y-1">
                  {Object.entries(errors).map(([fieldId, error]) => (
                    <li key={fieldId} className="text-red-300 text-sm flex items-center gap-2">
                      <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                      {error}
                    </li>
                  ))}
                </ul>
                <p className="text-red-200 text-sm mt-3 italic">
                  Complete all required fields to save your resume.
                </p>
              </div>
            )}
          </div>
          
          {/* Action Buttons */}
          <div className="flex justify-center gap-4 pt-6">
            <Button
              onClick={handleSave}
              variant="primary"
              className={`px-8 py-3 transition-all duration-200 ${
                saveStatus === 'saving' ? 'bg-yellow-600 hover:bg-yellow-700' :
                saveStatus === 'success' ? 'bg-green-600 hover:bg-green-700' :
                saveStatus === 'error' ? 'bg-red-600 hover:bg-red-700' :
                'bg-[#19c973] hover:bg-[#16a362]'
              }`}
              disabled={isSaving}
            >
              {saveStatus === 'saving' ? (
                <>
                  <div className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Saving...
                </>
              ) : saveStatus === 'success' ? (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Saved Successfully!
                </>
              ) : saveStatus === 'error' ? (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Save Failed
                </>
              ) : (
                <>
                  <Save className="w-5 h-5 mr-2" />
                  Save Resume Data
                </>
              )}
            </Button>
            
            <Button
              onClick={() => onPreview(formData)}
              variant="outline"
              className="px-8 py-3"
              disabled={isSaving}
            >
              <Eye className="w-5 h-5 mr-2" />
              Preview Resume
            </Button>
            
            {/* Show Full Preview Button - Only when completed */}
            {resumeStatus === 'completed' && (
              <Button
                onClick={() => setShowFullPreview(!showFullPreview)}
                variant="outline"
                className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white border-purple-600"
              >
                {showFullPreview ? 'Hide Full Preview' : 'Show Full Preview'}
              </Button>
            )}
          </div>

          {/* Save Status Indicator */}
          {saveStatus !== 'idle' && (
            <div className={`text-center p-3 rounded-lg transition-all duration-300 ${
              saveStatus === 'saving' ? 'bg-yellow-900/20 border border-yellow-500/30' :
              saveStatus === 'success' ? 'bg-green-900/20 border border-green-500/30' :
              'bg-red-900/20 border border-red-500/30'
            }`}>
              {saveStatus === 'saving' && (
                <div className="flex items-center justify-center gap-2 text-yellow-400">
                  <div className="w-4 h-4 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
                  <span>Saving your resume data...</span>
                </div>
              )}
              {saveStatus === 'success' && (
                <div className="flex items-center justify-center gap-2 text-green-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Resume saved successfully! Your data is now stored.</span>
                </div>
              )}
              {saveStatus === 'error' && (
                <div className="flex items-center justify-center gap-2 text-red-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span>Failed to save resume. Please try again.</span>
                </div>
              )}
            </div>
          )}

          {/* Progress Indicator */}
          <div className="text-center">
            <div className="text-sm text-gray-400 mb-2">
              Form Completion: {calculateCompletionPercentage()}%
            </div>
            <div className="w-full bg-dark-800 rounded-full h-2">
              <div 
                className="bg-[#19c973] h-2 rounded-full transition-all duration-300"
                style={{ 
                  width: `${calculateCompletionPercentage()}%` 
                }}
              ></div>
            </div>
            {Object.keys(errors).length > 0 && (
              <div className="text-xs text-red-400 mt-2">
                {Object.keys(errors).length} field(s) need attention
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Live Preview */}
        <div className="lg:sticky lg:top-6">
          <div className="glass-card p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-white mb-4 text-center">
              <Eye className="inline w-5 h-5 mr-2 text-[#19c973]" />
              Live Preview
            </h3>
            
            <div className="bg-white rounded-lg shadow-lg p-6 max-h-[800px] overflow-y-auto">
              {renderPreviewHeader()}
              {renderPreviewSummary()}
              {renderPreviewExperience()}
              {renderPreviewSkills()}
              {renderPreviewEducation()}
              
              {/* Empty State */}
              {Object.keys(formData).every(key => !formData[key] || 
                (Array.isArray(formData[key]) && formData[key].every((v: string) => !v || typeof v !== 'string' || !v.trim()))) && (
                <div className="text-center py-12 text-gray-400">
                  <div className="text-4xl mb-4">📝</div>
                  <p className="text-sm">Start filling out the form to see your resume preview here</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Custom Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-dark-800 border border-white/20 rounded-xl p-6 max-w-md mx-4">
            <h3 className="text-xl font-bold text-white mb-4">📋 Confirm Resume Save</h3>
            <div className="bg-dark-700/50 border border-white/10 rounded-lg p-4 mb-6">
              <pre className="text-sm text-gray-300 whitespace-pre-wrap">{confirmData}</pre>
            </div>
            <p className="text-gray-400 mb-6">Do you want to save this resume data?</p>
            <div className="flex gap-3">
              <Button
                onClick={() => setShowConfirmDialog(false)}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={confirmAndSave}
                className="flex-1 bg-[#19c973] hover:bg-[#16a362]"
                disabled={isSaving}
              >
                {isSaving ? 'Saving...' : 'Save Resume'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 bg-green-600 border border-green-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 max-w-md">
          <div className="flex items-start gap-3">
            <div className="text-2xl">✅</div>
            <div className="flex-1">
              <h4 className="font-semibold mb-2">Resume Saved Successfully!</h4>
              <pre className="text-sm text-green-100 whitespace-pre-wrap">{messageContent}</pre>
            </div>
            <button
              onClick={() => setShowSuccessMessage(false)}
              className="text-green-200 hover:text-white text-xl font-bold"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Error Message */}
      {showErrorMessage && (
        <div className="fixed top-4 right-4 bg-red-600 border border-red-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 max-w-md">
          <div className="flex items-start gap-3">
            <div className="text-2xl">❌</div>
            <div className="flex-1">
              <h4 className="font-semibold mb-2">Save Failed</h4>
              <pre className="text-sm text-red-100 whitespace-pre-wrap">{messageContent}</pre>
            </div>
            <button
              onClick={() => setShowErrorMessage(false)}
              className="text-red-200 hover:text-white text-xl font-bold"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Full Preview Mode with Export Buttons - Shows after saving */}
      {showFullPreview && resumeStatus === 'completed' && (
        <div className="mt-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">🎉 Resume Completed!</h2>
            <p className="text-gray-400 mb-6">
              Your resume has been saved successfully. Here's the complete preview with export options.
            </p>
            
            {/* Export Buttons */}
            <div className="flex justify-center gap-4 mb-8">
              <Button
                onClick={() => handleExport('pdf')}
                className="flex items-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 text-white text-lg font-semibold rounded-lg transition-colors duration-200"
                disabled={isExporting}
              >
                {isExporting && exportFormat === 'pdf' ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    Exporting...
                  </>
                ) : (
                  <>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Export to PDF
                  </>
                )}
              </Button>
              
              <Button
                onClick={() => handleExport('docx')}
                className="flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-lg transition-colors duration-200"
                disabled={isExporting}
              >
                {isExporting && exportFormat === 'docx' ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    Exporting...
                  </>
                ) : (
                  <>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 01-2-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Export to DOCX
                  </>
                )}
              </Button>
              
              <Button
                onClick={() => setShowFullPreview(false)}
                variant="outline"
                className="px-8 py-4 text-lg font-semibold"
              >
                ← Back to Edit Mode
              </Button>
            </div>
          </div>

          {/* Full Resume Preview - Using Template Design */}
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-4xl mx-auto">
            {/* Template-specific preview rendering */}
            {renderPreviewHeader()}
            {renderPreviewSummary()}
            {renderPreviewExperience()}
            {renderPreviewSkills()}
            {renderPreviewEducation()}
            
            {/* Footer */}
            <div className="text-center pt-8 border-t-2 border-gray-300">
              <p className="text-gray-500 text-sm">
                Generated with CodeSpaze Resume Builder
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
