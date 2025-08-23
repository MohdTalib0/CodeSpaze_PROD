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
  
  // Step 3: Program Selection & Social
  selectedProgram: string;
  telegramUsername: string;
  instagramUsername: string;
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
    telegramUsername: '',
    instagramUsername: '',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const programs = [
    'Internship Program',
    'Fellowship Program', 
    'Summer Tech Accelerator',
    'Winter Tech Accelerator',
    'International Programs'
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
        } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/\s/g, ''))) {
          newErrors.phone = 'Please enter a valid phone number';
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

  const handleInputChange = (field: keyof FormData, value: string | boolean | File | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
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
    // Handle form submission here
    console.log('Form submitted:', formData);
    // You can add API call here
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
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#19c973] focus:outline-none"
            placeholder="Enter your first name"
          />
          {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Last Name *
          </label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none"
            placeholder="Enter your last name"
          />
          {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
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
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#19c973] focus:outline-none"
            placeholder="Enter your email"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#19c973] focus:outline-none"
            placeholder="Enter your phone number"
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
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
          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#19c973] focus:outline-none"
          placeholder="Enter your address"
        />
        {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
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
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#19c973] focus:outline-none"
            placeholder="Enter your city"
          />
          {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            State/Province *
          </label>
          <input
            type="text"
            value={formData.state}
            onChange={(e) => handleInputChange('state', e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#19c973] focus:outline-none"
            placeholder="Enter your state"
          />
          {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Country *
          </label>
          <input
            type="text"
            value={formData.country}
            onChange={(e) => handleInputChange('country', e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#19c973] focus:outline-none"
            placeholder="Enter your country"
          />
          {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
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
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#19c973] focus:outline-none"
            placeholder="Enter your school/university name"
          />
          {errors.school && <p className="text-red-500 text-xs mt-1">{errors.school}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Degree/Program *
          </label>
          <input
            type="text"
            value={formData.degree}
            onChange={(e) => handleInputChange('degree', e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#19c973] focus:outline-none"
            placeholder="e.g., Bachelor's, Master's, Diploma"
          />
          {errors.degree && <p className="text-red-500 text-xs mt-1">{errors.degree}</p>}
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
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#19c973] focus:outline-none"
            placeholder="e.g., Computer Science, Engineering"
          />
          {errors.fieldOfStudy && <p className="text-red-500 text-xs mt-1">{errors.fieldOfStudy}</p>}
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <MessageCircle className="w-4 h-4 inline mr-2 text-blue-400" />
              Telegram Username
            </label>
            <input
              type="text"
              value={formData.telegramUsername}
              onChange={(e) => handleInputChange('telegramUsername', e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#19c973] focus:outline-none"
              placeholder="@username or username"
            />
            <p className="text-xs text-gray-400 mt-1">Join our Telegram group for updates</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Instagram className="w-4 h-4 inline mr-2 text-pink-400" />
              Instagram Username
            </label>
            <input
              type="text"
              value={formData.instagramUsername}
              onChange={(e) => handleInputChange('instagramUsername', e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#19c973] focus:outline-none"
              placeholder="username"
            />
            <p className="text-xs text-gray-400 mt-1">Follow @codespaze for program updates</p>
          </div>
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
    <div className="min-h-screen py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900">
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
                  className="flex items-center"
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
