import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Globe,
  Instagram,
  MessageCircle
} from 'lucide-react';
import Button from '../UI/Button';

interface FormData {
  // Step 1: Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  linkedin: string;
  github: string;
  resume: File | null;
  
  // Step 2: Educational & Technical Details
  school: string;
  degree: string;
  fieldOfStudy: string;
  graduationYear: string;
  currentYear: string;
  technologies: string[];
  
  // Step 3: Program Selection & Terms
  selectedProgram: string;
  agreeToTerms: boolean;
}

interface FormErrors {
  [key: string]: string;
}

const EnrollmentForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: '',
    linkedin: '',
    github: '',
    resume: null,
    school: '',
    degree: '',
    fieldOfStudy: '',
    graduationYear: '',
    currentYear: '',
    technologies: [],
    selectedProgram: '',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const programs = [
    'Internship Program',
    'Fellowship Program', 
    'Global - International Internships (Remote, Cross-Border)',
    'Global - Remote Apprenticeship Residency',
    'Global - Global Career Accelerator',
    'Global - International Hackathon Series'
  ];

  const technologyOptions = [
    'Web Development',
    'Web Designing', 
    'Python',
    'Artificial Intelligence',
    'Machine Learning',
    'Deep Learning',
    'DevOps',
    'Full Stack',
    'Graphic Design',
    'Content Writing',
    'SEO',
    'Mobile Development',
    'Data Science',
    'Cloud Computing',
    'Cybersecurity',
    'Blockchain',
    'Game Development',
    'UI/UX Design',
    'Digital Marketing',
    'Video Editing'
  ];

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};
    
    switch (step) {
      case 1:
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.email.trim()) {
          newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = 'Please enter a valid email address';
        }
        if (!formData.phone.trim()) {
          newErrors.phone = 'Phone number is required';
        } else {
          // Remove all non-digit characters to check actual digit count
          const digitsOnly = formData.phone.replace(/\D/g, '');
          if (digitsOnly.length < 10) {
            newErrors.phone = 'Phone number must contain at least 10 digits';
          } else if (digitsOnly.length > 15) {
            newErrors.phone = 'Phone number cannot exceed 15 digits';
          }
        }
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.state.trim()) newErrors.state = 'State/Province is required';
        if (!formData.country.trim()) newErrors.country = 'Country is required';
        if (!formData.resume) newErrors.resume = 'Resume/CV is required';
        break;
        
      case 2:
        if (!formData.school.trim()) newErrors.school = 'School/University is required';
        if (!formData.degree.trim()) newErrors.degree = 'Degree/Program is required';
        if (!formData.fieldOfStudy.trim()) newErrors.fieldOfStudy = 'Field of study is required';
        if (!formData.graduationYear) newErrors.graduationYear = 'Graduation year is required';
        if (!formData.currentYear) newErrors.currentYear = 'Current year is required';
        if (formData.technologies.length === 0) {
          newErrors.technologies = 'Please select at least one technology/skill';
        }
        break;
        
      case 3:
        if (!formData.selectedProgram) newErrors.selectedProgram = 'Please select a program';
        if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms and conditions';
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isStepValid = useMemo(() => {
    switch (currentStep) {
      case 1:
        return !!(formData.firstName.trim() && formData.lastName.trim() && 
                 formData.email.trim() && formData.phone.trim() && 
                 formData.address.trim() && formData.city.trim() && 
                 formData.state.trim() && formData.country.trim() && formData.resume);
      case 2:
        return !!(formData.school.trim() && formData.degree.trim() && 
                 formData.fieldOfStudy.trim() && formData.graduationYear && 
                 formData.currentYear && formData.technologies.length > 0);
      case 3:
        return !!(formData.selectedProgram && formData.agreeToTerms);
      default:
        return false;
    }
  }, [currentStep, formData]);

  const validateField = (field: keyof FormData, value: string): string => {
    switch (field) {
      case 'firstName':
        return !value.trim() ? 'First name is required' : '';
      
      case 'lastName':
        return !value.trim() ? 'Last name is required' : '';
      
      case 'email':
        if (!value.trim()) {
          return 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return 'Please enter a valid email address';
        }
        return '';
      
      case 'phone':
        if (!value.trim()) {
          return 'Phone number is required';
        } else {
          // Remove all non-digit characters to check actual digit count
          const digitsOnly = value.replace(/\D/g, '');
          if (digitsOnly.length < 10) {
            return 'Phone number must contain at least 10 digits';
          } else if (digitsOnly.length > 15) {
            return 'Phone number cannot exceed 15 digits';
          }
        }
        return '';
      
      case 'address':
        return !value.trim() ? 'Address is required' : '';
      
      case 'city':
        return !value.trim() ? 'City is required' : '';
      
      case 'state':
        return !value.trim() ? 'State/Province is required' : '';
      
      case 'country':
        return !value.trim() ? 'Country is required' : '';
      
      case 'school':
        return !value.trim() ? 'School/University is required' : '';
      
      case 'degree':
        return !value.trim() ? 'Degree/Program is required' : '';
      
      case 'fieldOfStudy':
        return !value.trim() ? 'Field of study is required' : '';
      
      default:
        return '';
    }
  };

  const handleInputChange = (field: keyof FormData, value: string | boolean | File | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Real-time validation for text fields
    if (typeof value === 'string') {
      const fieldError = validateField(field, value);
      setErrors(prev => ({ ...prev, [field]: fieldError }));
    } else {
      // Clear error when user starts typing for non-text fields
      if (errors[field]) {
        setErrors(prev => ({ ...prev, [field]: '' }));
      }
    }
  };

  const handleTechnologyToggle = (tech: string) => {
    setFormData(prev => {
      if (prev.technologies.includes(tech)) {
        return {
          ...prev,
          technologies: prev.technologies.filter(t => t !== tech)
        };
      } else if (prev.technologies.length < 3) {
        return {
          ...prev,
          technologies: [...prev.technologies, tech]
        };
      }
      return prev; // Don't add if already at max
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, resume: file }));
  };

  const nextStep = () => {
    if (isStepValid) {
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1);
      }
    } else {
      validateStep(currentStep);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(3)) {
      return;
    }
    
    setIsSubmitting(true);
    setErrors({}); // Clear any previous errors
    
    try {
      // Create FormData for file upload
      const formDataToSend = new FormData();
      
      // Add all form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'resume' && value instanceof File) {
          formDataToSend.append('resume', value);
        } else if (key === 'technologies') {
          // Send technologies as individual array items
          if (Array.isArray(value)) {
            value.forEach(tech => {
              formDataToSend.append('technologies[]', tech);
            });
          }
        } else if (key === 'fieldOfStudy') {
          // Map fieldOfStudy to match backend expectation
          formDataToSend.append('fieldOfStudy', value.toString());
        } else if (typeof value === 'boolean') {
          formDataToSend.append(key, value.toString());
        } else if (value !== null && value !== undefined) {
          formDataToSend.append(key, value.toString());
        }
      });

      // Debug: Log the form data being sent
      console.log('📤 Submitting enrollment form:', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        selectedProgram: formData.selectedProgram,
        technologies: formData.technologies,
        hasResume: !!formData.resume
      });

      // Create AbortController for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      // Make API call to submit enrollment
      const apiUrl = `${process.env.REACT_APP_API_URL || 'https://codespaze-prod-1.onrender.com/api'}/enrollment/submit`;
      console.log('🌐 Making API call to:', apiUrl);
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formDataToSend,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      
      console.log('📥 Response received:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok
      });
      
      if (!response.ok) {
        let errorMessage = 'Failed to submit enrollment';
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorData.message || errorMessage;
          console.error('❌ API Error Response:', errorData);
        } catch (parseError) {
          console.error('❌ Failed to parse error response:', parseError);
          errorMessage = `Server error (${response.status}): ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }
      
      const result = await response.json();
      console.log('✅ Success response:', result);
      
      if (result.success) {
        setSubmitSuccess(true);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          address: '',
          city: '',
          state: '',
          country: '',
          linkedin: '',
          github: '',
          resume: null,
          school: '',
          degree: '',
          fieldOfStudy: '',
          graduationYear: '',
          currentYear: '',
          technologies: [],
          selectedProgram: '',
          agreeToTerms: false
        });
        
        // Reset success message after 5 seconds
        setTimeout(() => setSubmitSuccess(false), 5000);
      } else {
        throw new Error(result.message || 'Submission was not successful');
      }
      
    } catch (error) {
      console.error('❌ Submission error:', error);
      
      let errorMessage = 'Failed to send enrollment. Please try again.';
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          errorMessage = 'Request timed out. Please check your internet connection and try again.';
        } else {
          errorMessage = error.message;
        }
      }
      
      setErrors({ submit: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3].map((step) => (
        <div key={step} className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
            step <= currentStep 
              ? 'bg-[#19c973] text-white' 
              : 'bg-gray-600 text-gray-300'
          }`}>
            {step < currentStep ? <CheckCircle className="w-5 h-5" /> : step}
          </div>
          {step < 3 && (
            <div className={`w-16 h-1 mx-2 ${
              step < currentStep ? 'bg-[#19c973]' : 'bg-gray-600'
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-white mb-6">Personal Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            First Name *
          </label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none ${
              errors.firstName ? 'border-red-500 focus:border-red-500' : 'border-gray-600 focus:border-[#19c973]'
            }`}
            placeholder="Enter your first name"
          />
          {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
          {!errors.firstName && formData.firstName && (
            <p className="text-green-400 text-xs mt-1">✓ First name is valid</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Last Name *
          </label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none ${
              errors.lastName ? 'border-red-500 focus:border-red-500' : 'border-gray-600 focus:border-[#19c973]'
            }`}
            placeholder="Enter your last name"
          />
          {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
          {!errors.lastName && formData.lastName && (
            <p className="text-green-400 text-xs mt-1">✓ Last name is valid</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none ${
              errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-600 focus:border-[#19c973]'
            }`}
            placeholder="Enter your email"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          {!errors.email && formData.email && (
            <p className="text-green-400 text-xs mt-1">✓ Email format is valid</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none ${
              errors.phone ? 'border-red-500 focus:border-red-500' : 'border-gray-600 focus:border-[#19c973]'
            }`}
            placeholder="Enter your phone number"
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          {!errors.phone && formData.phone && (
            <p className="text-green-400 text-xs mt-1">✓ Phone number format is valid</p>
          )}
          <p className="text-xs text-gray-400 mt-1">
            Enter your phone number with country code (e.g., +1-555-123-4567 or 5551234567)
          </p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Address *
        </label>
        <input
          type="text"
          value={formData.address}
          onChange={(e) => handleInputChange('address', e.target.value)}
          className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none ${
            errors.address ? 'border-red-500 focus:border-red-500' : 'border-gray-600 focus:border-[#19c973]'
          }`}
          placeholder="Enter your address"
        />
        {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
        {!errors.address && formData.address && (
          <p className="text-green-400 text-xs mt-1">✓ Address is valid</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            City *
          </label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
            className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none ${
              errors.city ? 'border-red-500 focus:border-red-500' : 'border-gray-600 focus:border-[#19c973]'
            }`}
            placeholder="Enter your city"
          />
          {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
          {!errors.city && formData.city && (
            <p className="text-green-400 text-xs mt-1">✓ City is valid</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            State/Province *
          </label>
          <input
            type="text"
            value={formData.state}
            onChange={(e) => handleInputChange('state', e.target.value)}
            className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none ${
              errors.state ? 'border-red-500 focus:border-red-500' : 'border-gray-600 focus:border-[#19c973]'
            }`}
            placeholder="Enter your state"
          />
          {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
          {!errors.state && formData.state && (
            <p className="text-green-400 text-xs mt-1">✓ State/Province is valid</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Country *
          </label>
          <input
            type="text"
            value={formData.country}
            onChange={(e) => handleInputChange('country', e.target.value)}
            className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none ${
              errors.country ? 'border-red-500 focus:border-red-500' : 'border-gray-600 focus:border-[#19c973]'
            }`}
            placeholder="Enter your country"
          />
          {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
          {!errors.country && formData.country && (
            <p className="text-green-400 text-xs mt-1">✓ Country is valid</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            LinkedIn Profile
          </label>
          <input
            type="url"
            value={formData.linkedin}
            onChange={(e) => handleInputChange('linkedin', e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#19c973] focus:outline-none"
            placeholder="https://linkedin.com/in/yourprofile"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            GitHub Profile
          </label>
          <input
            type="url"
            value={formData.github}
            onChange={(e) => handleInputChange('github', e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#19c973] focus:outline-none"
            placeholder="https://github.com/yourusername"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Resume/CV *
        </label>
        <input
          type="file"
          onChange={handleFileChange}
          accept=".pdf,.doc,.docx"
          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#19c973] file:text-white hover:file:bg-[#16a362]"
        />
        {errors.resume && <p className="text-red-500 text-xs mt-1">{errors.resume}</p>}
        <p className="text-xs text-gray-400 mt-1">Accepted formats: PDF, DOC, DOCX (Max 5MB)</p>
      </div>
    </motion.div>
  );

  const renderStep2 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-white mb-6">Educational & Technical Details</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            School/University *
          </label>
          <input
            type="text"
            value={formData.school}
            onChange={(e) => handleInputChange('school', e.target.value)}
            className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none ${
              errors.school ? 'border-red-500 focus:border-red-500' : 'border-gray-600 focus:border-[#19c973]'
            }`}
            placeholder="Enter your school/university name"
          />
          {errors.school && <p className="text-red-500 text-xs mt-1">{errors.school}</p>}
          {!errors.school && formData.school && (
            <p className="text-green-400 text-xs mt-1">✓ School/University is valid</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Degree/Program *
          </label>
          <input
            type="text"
            value={formData.degree}
            onChange={(e) => handleInputChange('degree', e.target.value)}
            className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none ${
              errors.degree ? 'border-red-500 focus:border-red-500' : 'border-gray-600 focus:border-[#19c973]'
            }`}
            placeholder="e.g., Bachelor's, Master's, Diploma"
          />
          {errors.degree && <p className="text-red-500 text-xs mt-1">{errors.degree}</p>}
          {!errors.degree && formData.degree && (
            <p className="text-green-400 text-xs mt-1">✓ Degree/Program is valid</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Field of Study *
          </label>
          <input
            type="text"
            value={formData.fieldOfStudy}
            onChange={(e) => handleInputChange('fieldOfStudy', e.target.value)}
            className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none ${
              errors.fieldOfStudy ? 'border-red-500 focus:border-red-500' : 'border-gray-600 focus:border-[#19c973]'
            }`}
            placeholder="e.g., Computer Science, Engineering"
          />
          {errors.fieldOfStudy && <p className="text-red-500 text-xs mt-1">{errors.fieldOfStudy}</p>}
          {!errors.fieldOfStudy && formData.fieldOfStudy && (
            <p className="text-green-400 text-xs mt-1">✓ Field of study is valid</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Current Year *
          </label>
          <select
            value={formData.currentYear}
            onChange={(e) => handleInputChange('currentYear', e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-[#19c973] focus:outline-none"
          >
            <option value="">Select current year</option>
            <option value="1st Year">1st Year</option>
            <option value="2nd Year">2nd Year</option>
            <option value="3rd Year">3rd Year</option>
            <option value="4th Year">4th Year</option>
            <option value="Graduated">Graduated</option>
            <option value="Working Professional">Working Professional</option>
          </select>
          {errors.currentYear && <p className="text-red-500 text-xs mt-1">{errors.currentYear}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Expected/Actual Graduation Year *
        </label>
        <select
          value={formData.graduationYear}
          onChange={(e) => handleInputChange('graduationYear', e.target.value)}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-[#19c973] focus:outline-none"
        >
          <option value="">Select graduation year</option>
          {Array.from({ length: 15 }, (_, i) => new Date().getFullYear() - 5 + i).map(year => (
            <option key={year} value={year.toString()}>{year}</option>
          ))}
        </select>
        {errors.graduationYear && <p className="text-red-500 text-xs mt-1">{errors.graduationYear}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Skills You're Interested In * (Select up to 3)
        </label>
        <p className="text-sm text-gray-400 mb-4">
          {formData.technologies.length}/3 selected
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {technologyOptions.map((tech) => {
            const isSelected = formData.technologies.includes(tech);
            const isDisabled = !isSelected && formData.technologies.length >= 3;
            
            return (
              <button
                key={tech}
                type="button"
                onClick={() => handleTechnologyToggle(tech)}
                disabled={isDisabled}
                className={`
                  relative p-4 rounded-xl border-2 transition-all duration-200 text-left
                  ${isSelected 
                    ? 'border-[#19c973] bg-[#19c973]/10 text-[#19c973] shadow-lg shadow-[#19c973]/20' 
                    : 'border-gray-600 bg-gray-800/50 text-gray-300 hover:border-gray-500 hover:bg-gray-700/50'
                  }
                  ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-105'}
                `}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{tech}</span>
                  {isSelected && (
                    <div className="w-5 h-5 bg-[#19c973] rounded-full flex items-center justify-center">
                      <CheckCircle className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
                
                {/* Skill category indicator */}
                <div className="mt-2">
                  <span className={`
                    text-xs px-2 py-1 rounded-full
                    ${tech.includes('Development') || tech.includes('Design') 
                      ? 'bg-blue-500/20 text-blue-400' 
                      : tech.includes('AI') || tech.includes('Machine') || tech.includes('Deep') || tech.includes('Data')
                      ? 'bg-purple-500/20 text-purple-400'
                      : tech.includes('DevOps') || tech.includes('Cloud') || tech.includes('Security')
                      ? 'bg-orange-500/20 text-orange-400'
                      : tech.includes('Content') || tech.includes('SEO') || tech.includes('Marketing')
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-gray-500/20 text-gray-400'
                    }
                  `}>
                    {tech.includes('Development') || tech.includes('Design') ? 'Tech' :
                     tech.includes('AI') || tech.includes('Machine') || tech.includes('Deep') || tech.includes('Data') ? 'AI/ML' :
                     tech.includes('DevOps') || tech.includes('Cloud') || tech.includes('Security') ? 'Infra' :
                     tech.includes('Content') || tech.includes('SEO') || tech.includes('Marketing') ? 'Creative' : 'Other'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
        
        {formData.technologies.length > 0 && (
          <div className="mt-6 p-4 bg-gray-800/30 rounded-xl border border-gray-600">
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Selected Skills:
            </label>
            <div className="flex flex-wrap gap-2">
              {formData.technologies.map((tech, index) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-[#19c973]/20 text-[#19c973] text-sm rounded-full flex items-center border border-[#19c973]/30"
                >
                  <span className="mr-2 text-xs bg-[#19c973] text-white rounded-full w-5 h-5 flex items-center justify-center">
                    {index + 1}
                  </span>
                  {tech}
                  <button
                    type="button"
                    onClick={() => handleTechnologyToggle(tech)}
                    className="ml-3 text-[#19c973] hover:text-[#16a362] transition-colors duration-200"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}
        
        <p className="text-xs text-gray-400 mt-3">
          💡 Select the skills that best match your interests and career goals
        </p>
        {errors.technologies && <p className="text-red-500 text-xs mt-2">{errors.technologies}</p>}
      </div>
    </motion.div>
  );

  const renderStep3 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-white mb-6">Program Selection & Community</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Select Program to Apply For *
        </label>
        
        {/* Program Availability Note */}
        <div className="mb-3 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
          <p className="text-blue-400 text-sm">
            <strong>Note:</strong> Summer and Winter Tech Accelerator programs are currently not accepting new enrollments. 
            Please select from our available programs below.
          </p>
        </div>
        
        <select
          value={formData.selectedProgram}
          onChange={(e) => handleInputChange('selectedProgram', e.target.value)}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-[#19c973] focus:outline-none"
        >
          <option value="">Choose a program</option>
          {programs.map((program) => (
            <option key={program} value={program}>{program}</option>
          ))}
        </select>
        {errors.selectedProgram && <p className="text-red-500 text-xs mt-1">{errors.selectedProgram}</p>}
      </div>

      <div className="border border-gray-600 rounded-lg p-6 bg-gray-800/50">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Globe className="w-5 h-5 mr-2 text-[#19c973]" />
          Join Our Community
        </h3>
        <p className="text-gray-300 mb-4">
          Connect with fellow learners and stay updated with the latest opportunities! Follow our social media accounts to get updates about programs, events, and opportunities.
        </p>
        
        {/* Social Media Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="https://t.me/codespaze_community"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-200 hover:scale-105"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Join Our Telegram Group
          </a>
          
          <a
            href="https://instagram.com/codespaze"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-lg transition-all duration-200 hover:scale-105"
          >
            <Instagram className="w-5 h-5 mr-2" />
            Follow on Instagram
          </a>
        </div>
        

          

      </div>

      <div className="flex items-start space-x-3">
        <input
          type="checkbox"
          id="agreeToTerms"
          checked={formData.agreeToTerms}
          onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
          className="w-5 h-5 text-[#19c973] bg-gray-800 border-gray-600 rounded focus:ring-[#19c973] focus:ring-2 mt-1"
        />
        <label htmlFor="agreeToTerms" className="text-sm text-gray-300">
          I agree to the <a href="/terms" className="text-[#19c973] hover:underline">Terms and Conditions</a> and 
          <a href="/privacy" className="text-[#19c973] hover:underline"> Privacy Policy</a>. I consent to receive 
          communications about my application and future opportunities. *
        </label>
        {errors.agreeToTerms && <p className="text-red-500 text-xs mt-1">{errors.agreeToTerms}</p>}
      </div>
    </motion.div>
  );

  useEffect(() => {
    // Smooth scroll to top when component mounts
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, []);

  return (
    <div className="min-h-screen py-20 bg-black relative">
      {/* Loading Overlay */}
      {isSubmitting && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-gray-800 p-8 rounded-xl border border-gray-600 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#19c973] mx-auto mb-4"></div>
            <h3 className="text-white text-lg font-semibold mb-2">Submitting Application</h3>
            <p className="text-gray-300 text-sm">Please wait while we process your enrollment...</p>
          </div>
        </div>
      )}
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Enroll in <span className="gradient-text">CodeSpaze</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Take the first step towards your tech career. Complete the form below to apply for our programs.
          </p>
        </div>

        <div className="glass-card p-8 rounded-2xl border border-[#19c973]/30">
          {renderStepIndicator()}
          
          {submitSuccess && (
            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                <p className="text-green-400 text-sm">Enrollment submitted successfully! We'll review your application and get back to you soon.</p>
              </div>
            </div>
          )}
          
          {errors.submit && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-red-400 text-sm">{errors.submit}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}
            </AnimatePresence>

            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-600">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              {currentStep < 3 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  disabled={!isStepValid}
                  className="flex items-center"
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={!isStepValid || isSubmitting}
                  className="flex items-center min-w-[180px] justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Application
                      <CheckCircle className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentForm;
