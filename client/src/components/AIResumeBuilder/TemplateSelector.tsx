import React from 'react';
import { motion } from 'framer-motion';
import { Check, Eye } from 'lucide-react';
import { ResumeTemplate, RESUME_TEMPLATES } from '../../types/resume-templates';
import { TemplatePreview } from './TemplatePreview';

interface TemplateSelectorProps {
  selectedTemplate: ResumeTemplate | null;
  onTemplateSelect: (template: ResumeTemplate) => void;
  onPreview: (template: ResumeTemplate) => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  selectedTemplate,
  onTemplateSelect,
  onPreview
}) => {
  const categories = ['modern', 'classic', 'creative', 'minimal'];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-2">Choose Your Resume Template</h3>
        <p className="text-gray-400">
          Select a template that matches your style and industry
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex justify-center">
        <div className="flex bg-dark-800 rounded-lg p-1">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-md font-medium transition-all duration-200 capitalize ${
                selectedTemplate?.category === category
                  ? 'bg-[#19c973] text-dark-950'
                  : 'text-gray-400 hover:text-white hover:bg-dark-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {RESUME_TEMPLATES.map((template) => (
          <div key={template.id} className="relative">
            {/* Template Preview */}
            <div 
              onClick={() => onTemplateSelect(template)}
              className="cursor-pointer"
            >
              <TemplatePreview 
                template={template} 
                isSelected={selectedTemplate?.id === template.id}
              />
            </div>

            {/* Selection Indicator */}
            {selectedTemplate?.id === template.id && (
              <div className="absolute -top-2 -right-2 bg-[#19c973] text-dark-950 rounded-full p-2 shadow-lg">
                <Check className="w-5 h-5" />
              </div>
            )}

            {/* Template Info */}
            <div className="mt-4 text-center">
              <h4 className="text-lg font-semibold text-white mb-2">{template.name}</h4>
              <p className="text-sm text-gray-400 leading-relaxed">{template.description}</p>
              <div className="flex items-center justify-center gap-4 mt-3 text-xs text-gray-500">
                <span className="capitalize">{template.category}</span>
                <span>•</span>
                <span>{template.sections.length} sections</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Template Info */}
      {selectedTemplate && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-dark-800 rounded-xl p-6 border border-[#19c973]/20"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="text-2xl">{selectedTemplate.preview}</div>
            <div>
              <h4 className="text-xl font-semibold text-white">{selectedTemplate.name}</h4>
              <p className="text-gray-400 capitalize">{selectedTemplate.category} template</p>
            </div>
          </div>
          
          <p className="text-gray-300 mb-4">{selectedTemplate.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-medium text-white mb-2">Template Sections:</h5>
              <ul className="space-y-1">
                {selectedTemplate.sections.map((section) => (
                  <li key={section.id} className="text-sm text-gray-400 flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#19c973] rounded-full"></span>
                    {section.name}
                    {section.required && <span className="text-red-400 text-xs">*</span>}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h5 className="font-medium text-white mb-2">Features:</h5>
              <ul className="space-y-1 text-sm text-gray-400">
                <li>• Professional styling</li>
                <li>• ATS-friendly format</li>
                <li>• Easy customization</li>
                <li>• Print-ready output</li>
              </ul>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

