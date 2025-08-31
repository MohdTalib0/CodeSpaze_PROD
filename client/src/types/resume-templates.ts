export interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  category: 'modern' | 'classic' | 'creative' | 'minimal';
  preview: string;
  className: string;
  sections: ResumeSection[];
}

export interface ResumeSection {
  id: string;
  name: string;
  required: boolean;
  order: number;
  fields: ResumeField[];
}

export interface ResumeField {
  id: string;
  name: string;
  type: 'text' | 'textarea' | 'select' | 'array' | 'date';
  required: boolean;
  placeholder: string;
  options?: string[];
  validation?: string;
}

export const RESUME_TEMPLATES: ResumeTemplate[] = [
  {
    id: 'modern-professional',
    name: 'Modern Professional',
    description: 'Clean, contemporary design perfect for tech and corporate roles',
    category: 'modern',
    preview: '🎯',
    className: 'modern-professional',
    sections: [
      {
        id: 'header',
        name: 'Header',
        required: true,
        order: 1,
        fields: [
          { id: 'firstName', name: 'First Name', type: 'text', required: true, placeholder: 'John' },
          { id: 'lastName', name: 'Last Name', type: 'text', required: true, placeholder: 'Doe' },
          { id: 'title', name: 'Professional Title', type: 'text', required: true, placeholder: 'Software Engineer' },
          { id: 'email', name: 'Email', type: 'text', required: true, placeholder: 'john.doe@email.com' },
          { id: 'phone', name: 'Phone', type: 'text', required: true, placeholder: '+1 (555) 123-4567' },
          { id: 'location', name: 'Location', type: 'text', required: false, placeholder: 'San Francisco, CA' },
          { id: 'linkedin', name: 'LinkedIn', type: 'text', required: false, placeholder: 'linkedin.com/in/johndoe' },
          { id: 'github', name: 'GitHub', type: 'text', required: false, placeholder: 'github.com/johndoe' }
        ]
      },
      {
        id: 'summary',
        name: 'Professional Summary',
        required: true,
        order: 2,
        fields: [
          { id: 'summary', name: 'Summary', type: 'textarea', required: true, placeholder: 'Experienced software engineer with 5+ years...' }
        ]
      },
      {
        id: 'experience',
        name: 'Work Experience',
        required: true,
        order: 3,
        fields: [
          { id: 'experiences', name: 'Work Experiences', type: 'array', required: true, placeholder: 'Add your work experience' },
          { id: 'company', name: 'Company', type: 'text', required: true, placeholder: 'Tech Corp' },
          { id: 'position', name: 'Position', type: 'text', required: true, placeholder: 'Senior Developer' },
          { id: 'startDate', name: 'Start Date', type: 'date', required: true, placeholder: '2020-01' },
          { id: 'endDate', name: 'End Date', type: 'date', required: false, placeholder: 'Present' },
          { id: 'description', name: 'Description', type: 'textarea', required: true, placeholder: 'Led development of...' },
          { id: 'achievements', name: 'Key Achievements', type: 'array', required: false, placeholder: 'Increased performance by 40%' }
        ]
      },
      {
        id: 'skills',
        name: 'Skills',
        required: true,
        order: 4,
        fields: [
          { id: 'technicalSkills', name: 'Technical Skills', type: 'array', required: true, placeholder: 'JavaScript, React, Node.js' },
          { id: 'softSkills', name: 'Soft Skills', type: 'array', required: false, placeholder: 'Leadership, Communication' }
        ]
      },
      {
        id: 'education',
        name: 'Education',
        required: true,
        order: 5,
        fields: [
          { id: 'educations', name: 'Education History', type: 'array', required: true, placeholder: 'Add your education' },
          { id: 'degree', name: 'Degree', type: 'text', required: true, placeholder: 'Bachelor of Science in Computer Science' },
          { id: 'school', name: 'School', type: 'text', required: true, placeholder: 'University of Technology' },
          { id: 'graduationYear', name: 'Graduation Year', type: 'text', required: true, placeholder: '2018' },
          { id: 'gpa', name: 'GPA', type: 'text', required: false, placeholder: '3.8/4.0' }
        ]
      }
    ]
  },
  {
    id: 'classic-elegant',
    name: 'Classic Elegant',
    description: 'Traditional format with sophisticated styling for conservative industries',
    category: 'classic',
    preview: '✨',
    className: 'classic-elegant',
    sections: [
      {
        id: 'header',
        name: 'Header',
        required: true,
        order: 1,
        fields: [
          { id: 'firstName', name: 'First Name', type: 'text', required: true, placeholder: 'John' },
          { id: 'lastName', name: 'Last Name', type: 'text', required: true, placeholder: 'Doe' },
          { id: 'title', name: 'Professional Title', type: 'text', required: true, placeholder: 'Senior Manager' },
          { id: 'email', name: 'Email', type: 'text', required: true, placeholder: 'john.doe@email.com' },
          { id: 'phone', name: 'Phone', type: 'text', required: true, placeholder: '+1 (555) 123-4567' },
          { id: 'address', name: 'Address', type: 'textarea', required: false, placeholder: '123 Main St, City, State 12345' }
        ]
      },
      {
        id: 'summary',
        name: 'Professional Summary',
        required: true,
        order: 2,
        fields: [
          { id: 'summary', name: 'Summary', type: 'textarea', required: true, placeholder: 'Results-driven professional with...' }
        ]
      },
      {
        id: 'experience',
        name: 'Work Experience',
        required: true,
        order: 3,
        fields: [
          { id: 'company', name: 'Company', type: 'text', required: true, placeholder: 'Enterprise Inc' },
          { id: 'position', name: 'Position', type: 'text', required: true, placeholder: 'Senior Manager' },
          { id: 'startDate', name: 'Start Date', type: 'date', required: true, placeholder: '2019-03' },
          { id: 'endDate', name: 'End Date', type: 'date', required: false, placeholder: 'Present' },
          { id: 'description', name: 'Description', type: 'textarea', required: true, placeholder: 'Managed team of 15...' },
          { id: 'achievements', name: 'Key Achievements', type: 'array', required: false, placeholder: 'Reduced costs by 25%' }
        ]
      },
      {
        id: 'skills',
        name: 'Skills',
        required: true,
        order: 4,
        fields: [
          { id: 'skills', name: 'Skills', type: 'array', required: true, placeholder: 'Project Management, Team Leadership' }
        ]
      },
      {
        id: 'education',
        name: 'Education',
        required: true,
        order: 5,
        fields: [
          { id: 'degree', name: 'Degree', type: 'text', required: true, placeholder: 'Master of Business Administration' },
          { id: 'school', name: 'School', type: 'text', required: true, placeholder: 'Business University' },
          { id: 'graduationYear', name: 'Graduation Year', type: 'text', required: true, placeholder: '2017' }
        ]
      }
    ]
  },
  {
    id: 'creative-portfolio',
    name: 'Creative Portfolio',
    description: 'Bold, artistic design perfect for creative and design roles',
    category: 'creative',
    preview: '🎨',
    className: 'creative-portfolio',
    sections: [
      {
        id: 'header',
        name: 'Header',
        required: true,
        order: 1,
        fields: [
          { id: 'firstName', name: 'First Name', type: 'text', required: true, placeholder: 'Alex' },
          { id: 'lastName', name: 'Last Name', type: 'text', required: true, placeholder: 'Designer' },
          { id: 'title', name: 'Professional Title', type: 'text', required: true, placeholder: 'UX/UI Designer' },
          { id: 'email', name: 'Email', type: 'text', required: true, placeholder: 'alex@design.com' },
          { id: 'phone', name: 'Phone', type: 'text', required: true, placeholder: '+1 (555) 987-6543' },
          { id: 'portfolio', name: 'Portfolio URL', type: 'text', required: false, placeholder: 'alexdesigner.com' },
          { id: 'behance', name: 'Behance', type: 'text', required: false, placeholder: 'behance.net/alexdesigner' },
          { id: 'dribbble', name: 'Dribbble', type: 'text', required: false, placeholder: 'dribbble.com/alexdesigner' }
        ]
      },
      {
        id: 'summary',
        name: 'Creative Summary',
        required: true,
        order: 2,
        fields: [
          { id: 'summary', name: 'Summary', type: 'textarea', required: true, placeholder: 'Passionate designer creating...' }
        ]
      },
      {
        id: 'projects',
        name: 'Featured Projects',
        required: true,
        order: 3,
        fields: [
          { id: 'projectName', name: 'Project Name', type: 'text', required: true, placeholder: 'E-commerce Redesign' },
          { id: 'projectDescription', name: 'Description', type: 'textarea', required: true, placeholder: 'Complete redesign of...' },
          { id: 'technologies', name: 'Technologies Used', type: 'array', required: true, placeholder: 'Figma, Adobe XD, Sketch' },
          { id: 'projectUrl', name: 'Project URL', type: 'text', required: false, placeholder: 'project-demo.com' }
        ]
      },
      {
        id: 'skills',
        name: 'Design Skills',
        required: true,
        order: 4,
        fields: [
          { id: 'designTools', name: 'Design Tools', type: 'array', required: true, placeholder: 'Figma, Adobe Creative Suite' },
          { id: 'designSkills', name: 'Design Skills', type: 'array', required: true, placeholder: 'User Research, Prototyping' },
          { id: 'technicalSkills', name: 'Technical Skills', type: 'array', required: false, placeholder: 'HTML, CSS, JavaScript' }
        ]
      },
      {
        id: 'experience',
        name: 'Work Experience',
        required: true,
        order: 5,
        fields: [
          { id: 'company', name: 'Company', type: 'text', required: true, placeholder: 'Design Studio' },
          { id: 'position', name: 'Position', type: 'text', required: true, placeholder: 'Senior Designer' },
          { id: 'startDate', name: 'Start Date', type: 'date', required: true, placeholder: '2021-06' },
          { id: 'endDate', name: 'End Date', type: 'date', required: false, placeholder: 'Present' },
          { id: 'description', name: 'Description', type: 'textarea', required: true, placeholder: 'Led design initiatives...' },
          { id: 'achievements', name: 'Key Achievements', type: 'array', required: false, placeholder: 'Increased user engagement by 35%' }
        ]
      }
    ]
  },
  {
    id: 'minimal-clean',
    name: 'Minimal Clean',
    description: 'Simple, focused design that puts content first',
    category: 'minimal',
    preview: '⚡',
    className: 'minimal-clean',
    sections: [
      {
        id: 'header',
        name: 'Header',
        required: true,
        order: 1,
        fields: [
          { id: 'firstName', name: 'First Name', type: 'text', required: true, placeholder: 'Sam' },
          { id: 'lastName', name: 'Last Name', type: 'text', required: true, placeholder: 'Developer' },
          { id: 'title', name: 'Professional Title', type: 'text', required: true, placeholder: 'Full Stack Developer' },
          { id: 'email', name: 'Email', type: 'text', required: true, placeholder: 'sam@dev.com' },
          { id: 'phone', name: 'Phone', type: 'text', required: true, placeholder: '+1 (555) 456-7890' },
          { id: 'website', name: 'Website', type: 'text', required: false, placeholder: 'samdeveloper.com' }
        ]
      },
      {
        id: 'summary',
        name: 'Professional Summary',
        required: true,
        order: 2,
        fields: [
          { id: 'summary', name: 'Summary', type: 'textarea', required: true, placeholder: 'Full stack developer specializing in...' }
        ]
      },
      {
        id: 'experience',
        name: 'Work Experience',
        required: true,
        order: 3,
        fields: [
          { id: 'company', name: 'Company', type: 'text', required: true, placeholder: 'Tech Startup' },
          { id: 'position', name: 'Position', type: 'text', required: true, placeholder: 'Full Stack Developer' },
          { id: 'startDate', name: 'Start Date', type: 'date', required: true, placeholder: '2022-01' },
          { id: 'endDate', name: 'End Date', type: 'date', required: false, placeholder: 'Present' },
          { id: 'description', name: 'Description', type: 'textarea', required: true, placeholder: 'Developed and maintained...' },
          { id: 'achievements', name: 'Key Achievements', type: 'array', required: false, placeholder: 'Improved application performance by 50%' }
        ]
      },
      {
        id: 'skills',
        name: 'Skills',
        required: true,
        order: 4,
        fields: [
          { id: 'frontend', name: 'Frontend', type: 'array', required: true, placeholder: 'React, Vue, Angular' },
          { id: 'backend', name: 'Backend', type: 'array', required: true, placeholder: 'Node.js, Python, Java' },
          { id: 'databases', name: 'Databases', type: 'array', required: false, placeholder: 'PostgreSQL, MongoDB' }
        ]
      },
      {
        id: 'education',
        name: 'Education',
        required: true,
        order: 5,
        fields: [
          { id: 'degree', name: 'Degree', type: 'text', required: true, placeholder: 'Bachelor of Computer Science' },
          { id: 'school', name: 'School', type: 'text', required: true, placeholder: 'Tech University' },
          { id: 'graduationYear', name: 'Graduation Year', type: 'text', required: true, placeholder: '2020' }
        ]
      }
    ]
  }
];

export const getTemplateById = (id: string): ResumeTemplate | undefined => {
  return RESUME_TEMPLATES.find(template => template.id === id);
};

export const getTemplatesByCategory = (category: string): ResumeTemplate[] => {
  return RESUME_TEMPLATES.filter(template => template.category === category);
};
