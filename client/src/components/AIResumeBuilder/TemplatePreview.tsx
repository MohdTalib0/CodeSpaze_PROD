import React from 'react';
import { motion } from 'framer-motion';
import { ResumeTemplate } from '../../types/resume-templates';

interface TemplatePreviewProps {
  template: ResumeTemplate;
  isSelected?: boolean;
}

export const TemplatePreview: React.FC<TemplatePreviewProps> = ({ 
  template, 
  isSelected = false 
}) => {
  // Sample data for preview
  const sampleData = {
    firstName: 'John',
    lastName: 'Doe',
    title: 'Software Engineer',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/johndoe',
    github: 'github.com/johndoe',
    summary: 'Experienced software engineer with 5+ years of expertise in full-stack development, specializing in React, Node.js, and cloud technologies.',
    company: 'Tech Corp',
    position: 'Senior Developer',
    startDate: '2020-01',
    endDate: 'Present',
    description: 'Led development of scalable web applications using modern technologies. Mentored junior developers and implemented best practices.',
    technicalSkills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS'],
    softSkills: ['Leadership', 'Communication', 'Problem Solving'],
    degree: 'Bachelor of Science in Computer Science',
    school: 'University of Technology',
    graduationYear: '2018',
    gpa: '3.8/4.0'
  };

  const renderHeader = () => {
    switch (template.id) {
      case 'modern-professional':
        return (
          <div className="text-center pb-4 border-b border-gray-300">
            <h1 className="text-2xl font-bold text-gray-800 mb-1">
              {sampleData.firstName} {sampleData.lastName}
            </h1>
            <p className="text-lg text-gray-600 mb-2">{sampleData.title}</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              <span>{sampleData.email}</span>
              <span>{sampleData.phone}</span>
              <span>{sampleData.location}</span>
            </div>
            <div className="flex justify-center gap-4 mt-2 text-sm text-blue-600">
              <span>{sampleData.linkedin}</span>
              <span>{sampleData.github}</span>
            </div>
          </div>
        );

      case 'classic-elegant':
        return (
          <div className="text-center pb-4 border-b-2 border-gray-800">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {sampleData.firstName} {sampleData.lastName}
            </h1>
            <p className="text-xl text-gray-700 mb-3">{sampleData.title}</p>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 max-w-md mx-auto">
              <div>{sampleData.email}</div>
              <div>{sampleData.phone}</div>
              <div className="col-span-2">{sampleData.location}</div>
            </div>
          </div>
        );

      case 'creative-portfolio':
        return (
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-lg mb-4">
            <h1 className="text-3xl font-bold mb-2">
              {sampleData.firstName} {sampleData.lastName}
            </h1>
            <p className="text-xl mb-3">{sampleData.title}</p>
            <div className="flex flex-wrap gap-4 text-sm">
              <span>{sampleData.email}</span>
              <span>{sampleData.phone}</span>
              <span>{sampleData.location}</span>
            </div>
          </div>
        );

      case 'minimal-clean':
        return (
          <div className="pb-4 border-b border-gray-400">
            <h1 className="text-2xl font-light text-gray-800 mb-1">
              {sampleData.firstName} {sampleData.lastName}
            </h1>
            <p className="text-lg text-gray-600 mb-2">{sampleData.title}</p>
            <div className="text-sm text-gray-500 space-y-1">
              <div>{sampleData.email}</div>
              <div>{sampleData.phone}</div>
              <div>{sampleData.location}</div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderSummary = () => {
    return (
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Professional Summary</h2>
        <p className="text-sm text-gray-600 leading-relaxed">{sampleData.summary}</p>
      </div>
    );
  };

  const renderExperience = () => {
    return (
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Work Experience</h2>
        <div className="mb-3">
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-medium text-gray-800">{sampleData.position}</h3>
            <span className="text-sm text-gray-500">{sampleData.startDate} - {sampleData.endDate}</span>
          </div>
          <p className="text-sm font-medium text-gray-700 mb-1">{sampleData.company}</p>
          <p className="text-sm text-gray-600">{sampleData.description}</p>
        </div>
      </div>
    );
  };

  const renderSkills = () => {
    switch (template.id) {
      case 'modern-professional':
        return (
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Skills</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-1">Technical Skills</h3>
                <div className="flex flex-wrap gap-1">
                  {sampleData.technicalSkills.map((skill, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-1">Soft Skills</h3>
                <div className="flex flex-wrap gap-1">
                  {sampleData.softSkills.map((skill, index) => (
                    <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'classic-elegant':
        return (
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {[...sampleData.technicalSkills, ...sampleData.softSkills].map((skill, index) => (
                <span key={index} className="px-3 py-1 bg-gray-200 text-gray-800 text-sm rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        );

      case 'creative-portfolio':
        return (
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Design Skills</h2>
            <div className="space-y-2">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-1">Design Tools</h3>
                <div className="flex flex-wrap gap-1">
                  {['Figma', 'Adobe XD', 'Sketch'].map((tool, index) => (
                    <span key={index} className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'minimal-clean':
        return (
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Skills</h2>
            <div className="space-y-2">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-1">Frontend</h3>
                <p className="text-sm text-gray-600">{sampleData.technicalSkills.slice(0, 3).join(', ')}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-1">Backend</h3>
                <p className="text-sm text-gray-600">{sampleData.technicalSkills.slice(3).join(', ')}</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderEducation = () => {
    return (
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Education</h2>
        <div className="mb-2">
          <h3 className="font-medium text-gray-800">{sampleData.degree}</h3>
          <p className="text-sm text-gray-700 mb-1">{sampleData.school}</p>
          <p className="text-sm text-gray-500">{sampleData.graduationYear} • GPA: {sampleData.gpa}</p>
        </div>
      </div>
    );
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transition-all duration-200 ${
        isSelected ? 'ring-2 ring-[#19c973] ring-offset-2' : 'hover:shadow-xl'
      }`}
    >
      {/* Template Header */}
      <div className="bg-gray-100 px-4 py-2 border-b">
        <div className="flex items-center justify-between">
          <span className="text-lg">{template.preview}</span>
          <span className="text-sm font-medium text-gray-600 capitalize">{template.category}</span>
        </div>
      </div>

      {/* Resume Content Preview */}
      <div className="p-4 space-y-3">
        {renderHeader()}
        {renderSummary()}
        {renderExperience()}
        {renderSkills()}
        {renderEducation()}
      </div>

      {/* Template Name */}
      <div className="bg-gray-50 px-4 py-3 border-t">
        <h3 className="font-semibold text-gray-800 text-center">{template.name}</h3>
        <p className="text-xs text-gray-500 text-center mt-1">{template.description}</p>
      </div>
    </motion.div>
  );
};
