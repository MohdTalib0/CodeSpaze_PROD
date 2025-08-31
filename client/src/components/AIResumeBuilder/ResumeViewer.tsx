import React from 'react';
import { motion } from 'framer-motion';
import { Download, Eye, Edit, Share2 } from 'lucide-react';

interface ResumeViewerProps {
  resume: any;
  template: any;
  onEdit: () => void;
  onExport: (format: 'pdf' | 'docx') => void;
  onShare: () => void;
}

export const ResumeViewer: React.FC<ResumeViewerProps> = ({
  resume,
  template,
  onEdit,
  onExport,
  onShare
}) => {
  const renderPersonalInfo = () => (
    <div className="text-center pb-6 border-b border-gray-300 mb-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        {resume.first_name || 'Your'} {resume.last_name || 'Name'}
      </h1>
      <p className="text-xl text-gray-600 mb-3">{resume.title || 'Professional Title'}</p>
      
      <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 mb-3">
        {resume.email && <span>{resume.email}</span>}
        {resume.phone && <span>{resume.phone}</span>}
        {resume.location && <span>{resume.location}</span>}
      </div>
      
      <div className="flex justify-center gap-4 text-sm text-blue-600">
        {resume.linkedin_url && (
          <a href={resume.linkedin_url} target="_blank" rel="noopener noreferrer" className="hover:underline">
            LinkedIn
          </a>
        )}
        {resume.github_url && (
          <a href={resume.github_url} target="_blank" rel="noopener noreferrer" className="hover:underline">
            GitHub
          </a>
        )}
        {resume.website_url && (
          <a href={resume.website_url} target="_blank" rel="noopener noreferrer" className="hover:underline">
            Website
          </a>
        )}
      </div>
    </div>
  );

  const renderSummary = () => (
    resume.summary && (
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Professional Summary</h2>
        <p className="text-gray-600 leading-relaxed">{resume.summary}</p>
      </div>
    )
  );

  const renderExperience = () => {
    if (!resume.experiences || resume.experiences.length === 0) return null;

    return (
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Work Experience</h2>
        <div className="space-y-4">
          {resume.experiences.map((_: any, index: number) => {
            const company = resume[`company_${index}`];
            const position = resume[`position_${index}`];
            const startDate = resume[`startDate_${index}`];
            const endDate = resume[`endDate_${index}`];
            const description = resume[`description_${index}`];
            const achievements = resume[`achievements_${index}`];

            if (!company && !position) return null;

            return (
              <div key={index} className="border-l-4 border-blue-500 pl-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-medium text-gray-800">{position || 'Position'}</h3>
                  <span className="text-sm text-gray-500">
                    {startDate || 'Start Date'} - {endDate || 'Present'}
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-700 mb-2">{company || 'Company'}</p>
                {description && (
                  <p className="text-sm text-gray-600 mb-2">{description}</p>
                )}
                {achievements && Array.isArray(achievements) && achievements.length > 0 && (
                  <div>
                    <h4 className="text-xs font-medium text-gray-600 mb-1">Key Achievements:</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {achievements.map((achievement: any, achievementIndex: number) => (
                        <li key={achievementIndex} className="text-xs text-gray-600">
                          {resume[`achievement_${index}_${achievementIndex}`] || achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderEducation = () => {
    if (!resume.educations || resume.educations.length === 0) return null;

    return (
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Education</h2>
        <div className="space-y-3">
          {resume.educations.map((_: any, index: number) => {
            const degree = resume[`degree_${index}`];
            const school = resume[`school_${index}`];
            const graduationYear = resume[`graduationYear_${index}`];
            const gpa = resume[`gpa_${index}`];

            if (!degree && !school) return null;

            return (
              <div key={index} className="border-l-4 border-green-500 pl-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-800">{degree || 'Degree'}</h3>
                    <p className="text-sm text-gray-700">{school || 'School'}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-gray-500">{graduationYear || 'Year'}</span>
                    {gpa && <p className="text-xs text-gray-500">GPA: {gpa}</p>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderSkills = () => {
    if (!resume.skills) return null;

    const technicalSkills = resume.skills.technical || [];
    const softSkills = resume.skills.soft || [];

    if (technicalSkills.length === 0 && softSkills.length === 0) return null;

    return (
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {technicalSkills.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Technical Skills</h3>
              <div className="flex flex-wrap gap-2">
                {technicalSkills.map((skill: string, index: number) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
          {softSkills.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Soft Skills</h3>
              <div className="flex flex-wrap gap-2">
                {softSkills.map((skill: string, index: number) => (
                  <span key={index} className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header with Actions */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Resume Preview</h1>
              <p className="text-gray-600">Template: {template?.name || 'Unknown'}</p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <button
                onClick={onEdit}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
              >
                <Edit className="w-4 h-4" />
                Edit Resume
              </button>
              
              <button
                onClick={() => onExport('pdf')}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
              >
                <Download className="w-4 h-4" />
                Export PDF
              </button>
              
              <button
                onClick={() => onExport('docx')}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
              >
                <Download className="w-4 h-4" />
                Export DOCX
              </button>
              
              <button
                onClick={onShare}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>
          </div>
        </div>

        {/* Resume Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto"
        >
          {renderPersonalInfo()}
          {renderSummary()}
          {renderExperience()}
          {renderEducation()}
          {renderSkills()}
        </motion.div>
      </div>
    </div>
  );
};
