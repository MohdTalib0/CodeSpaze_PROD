import { neon } from '@neondatabase/serverless';
import { promises as fs } from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const sql = neon(process.env.NEON_DATABASE_URL!);

export interface ResumeFile {
  id?: number;
  user_id: number;
  original_filename: string;
  stored_filename: string;
  file_path: string;
  file_size: number;
  mime_type: string;
  extraction_status: 'pending' | 'completed' | 'failed';
  extracted_text?: string;
  ai_processing_status: 'pending' | 'completed' | 'failed';
}

export interface ResumeDetail {
  id?: number;
  user_id: number;
  resume_file_id?: number;
  template_id: string;
  template_name: string;
  status: 'draft' | 'completed' | 'archived';
  version: number;
  is_current: boolean;
  
  // Personal Information
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  title?: string;
  location?: string;
  linkedin_url?: string;
  github_url?: string;
  website_url?: string;
  
  // Content
  summary?: string;
  experiences?: any[];
  education?: any[];
  skills?: any;
  projects?: any[];
  certifications?: any[];
  languages?: any[];
  resume_references?: any[];
  custom_sections?: any[];
  
  // AI Enhancement
  ai_enhanced: boolean;
  ai_suggestions?: any[];
  ai_enhancement_date?: Date;
  
  // Metadata
  completion_percentage: number;
  tags?: string[];
  notes?: string;
}

export interface ResumeHistory {
  id?: number;
  user_id: number;
  resume_detail_id: number;
  action: string;
  action_details?: any;
  previous_data?: any;
  new_data?: any;
  changed_fields?: string[];
  version_before?: number;
  version_after?: number;
  status_before?: string;
  status_after?: string;
  template_id_before?: string;
  template_id_after?: string;
  ai_enhancement_applied?: boolean;
  processing_time_ms?: number;
}

export class ResumeService {
  
  // File Operations
  async saveResumeFile(fileData: ResumeFile): Promise<number> {
    try {
      const result = await sql`
        INSERT INTO resume_files (
          user_id, original_filename, stored_filename, file_path, 
          file_size, mime_type, extraction_status, ai_processing_status
        ) VALUES (
          ${fileData.user_id}, ${fileData.original_filename}, 
          ${fileData.stored_filename}, ${fileData.file_path},
          ${fileData.file_size}, ${fileData.mime_type}, 
          ${fileData.extraction_status}, ${fileData.ai_processing_status}
        ) RETURNING id
      `;
      
      return (result[0] as any).id;
    } catch (error) {
      console.error('Error saving resume file:', error);
      throw new Error('Failed to save resume file');
    }
  }

  async updateResumeFileExtraction(fileId: number, extractedText: string, status: string): Promise<void> {
    try {
      await sql`
        UPDATE resume_files 
        SET extracted_text = ${extractedText}, 
            extraction_status = ${status},
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ${fileId}
      `;
    } catch (error) {
      console.error('Error updating resume file extraction:', error);
      throw new Error('Failed to update resume file extraction');
    }
  }

  async getResumeFile(fileId: number): Promise<ResumeFile | null> {
    try {
      const result = await sql`
        SELECT * FROM resume_files WHERE id = ${fileId}
      `;
      
      return result.length > 0 ? (result[0] as ResumeFile) : null;
    } catch (error) {
      console.error('Error getting resume file:', error);
      throw new Error('Failed to get resume file');
    }
  }

  async getUserResumeFiles(userId: number): Promise<ResumeFile[]> {
    try {
      const result = await sql`
        SELECT * FROM resume_files 
        WHERE user_id = ${userId} 
        ORDER BY created_at DESC
      `;
      
      return result as ResumeFile[];
    } catch (error) {
      console.error('Error getting user resume files:', error);
      throw new Error('Failed to get user resume files');
    }
  }

  // Resume Details Operations
  async saveResumeDetail(resumeData: ResumeDetail): Promise<number> {
    try {
      // If this is a new version, mark previous versions as not current
      if (resumeData.is_current) {
        await sql`
          UPDATE resume_details 
          SET is_current = false 
          WHERE user_id = ${resumeData.user_id} AND template_id = ${resumeData.template_id}
        `;
      }

      // Ensure JSON fields are properly formatted
      const safeExperiences = resumeData.experiences ? JSON.stringify(resumeData.experiences) : null;
      const safeEducation = resumeData.education ? JSON.stringify(resumeData.education) : null;
      const safeSkills = resumeData.skills ? JSON.stringify(resumeData.skills) : null;
      const safeProjects = resumeData.projects ? JSON.stringify(resumeData.projects) : null;
      const safeCertifications = resumeData.certifications ? JSON.stringify(resumeData.certifications) : null;
      const safeLanguages = resumeData.languages ? JSON.stringify(resumeData.languages) : null;
      const safeReferences = resumeData.resume_references ? JSON.stringify(resumeData.resume_references) : null;
      const safeCustomSections = resumeData.custom_sections ? JSON.stringify(resumeData.custom_sections) : null;
      const safeAiSuggestions = resumeData.ai_suggestions ? JSON.stringify(resumeData.ai_suggestions) : null;
      const safeTags = resumeData.tags ? JSON.stringify(resumeData.tags) : null;

      console.log('Safe experiences JSON:', safeExperiences);
      console.log('Safe education JSON:', safeEducation);

      const result = await sql`
        INSERT INTO resume_details (
          user_id, resume_file_id, template_id, template_name, status, version, is_current,
          first_name, last_name, email, phone, title, location, linkedin_url, github_url, website_url,
          summary, experiences, education, skills, projects, certifications, languages, resume_references, custom_sections,
          ai_enhanced, ai_suggestions, ai_enhancement_date, completion_percentage, tags, notes
        ) VALUES (
          ${resumeData.user_id}, ${resumeData.resume_file_id}, ${resumeData.template_id}, 
          ${resumeData.template_name}, ${resumeData.status}, ${resumeData.version}, ${resumeData.is_current},
          ${resumeData.first_name}, ${resumeData.last_name}, ${resumeData.email}, ${resumeData.phone}, 
          ${resumeData.title}, ${resumeData.location}, ${resumeData.linkedin_url}, ${resumeData.github_url}, 
          ${resumeData.website_url}, ${resumeData.summary}, ${safeExperiences}, ${safeEducation}, 
          ${safeSkills}, ${safeProjects}, ${safeCertifications}, ${safeLanguages}, 
          ${safeReferences}, ${safeCustomSections}, ${resumeData.ai_enhanced}, 
          ${safeAiSuggestions}, ${resumeData.ai_enhancement_date}, ${resumeData.completion_percentage}, 
          ${safeTags}, ${resumeData.notes}
        ) RETURNING id
      `;
      
      return (result[0] as any).id;
    } catch (error) {
      console.error('Error saving resume detail:', error);
      console.error('Resume data that failed:', JSON.stringify(resumeData, null, 2));
      throw new Error('Failed to save resume detail');
    }
  }

  async updateResumeDetail(resumeId: number, updateData: Partial<ResumeDetail>): Promise<void> {
    try {
      // For now, we'll use a simple approach with specific field updates
      // This can be enhanced later with a more sophisticated dynamic update system
      
      if (updateData.first_name !== undefined) {
        await sql`UPDATE resume_details SET first_name = ${updateData.first_name}, updated_at = CURRENT_TIMESTAMP WHERE id = ${resumeId}`;
      }
      
      if (updateData.last_name !== undefined) {
        await sql`UPDATE resume_details SET last_name = ${updateData.last_name}, updated_at = CURRENT_TIMESTAMP WHERE id = ${resumeId}`;
      }
      
      if (updateData.email !== undefined) {
        await sql`UPDATE resume_details SET email = ${updateData.email}, updated_at = CURRENT_TIMESTAMP WHERE id = ${resumeId}`;
      }
      
      if (updateData.phone !== undefined) {
        await sql`UPDATE resume_details SET phone = ${updateData.phone}, updated_at = CURRENT_TIMESTAMP WHERE id = ${resumeId}`;
      }
      
      if (updateData.title !== undefined) {
        await sql`UPDATE resume_details SET title = ${updateData.title}, updated_at = CURRENT_TIMESTAMP WHERE id = ${resumeId}`;
      }
      
      if (updateData.location !== undefined) {
        await sql`UPDATE resume_details SET location = ${updateData.location}, updated_at = CURRENT_TIMESTAMP WHERE id = ${resumeId}`;
      }
      
      if (updateData.summary !== undefined) {
        await sql`UPDATE resume_details SET summary = ${updateData.summary}, updated_at = CURRENT_TIMESTAMP WHERE id = ${resumeId}`;
      }
      
      if (updateData.experiences !== undefined) {
        await sql`UPDATE resume_details SET experiences = ${updateData.experiences}, updated_at = CURRENT_TIMESTAMP WHERE id = ${resumeId}`;
      }
      
      if (updateData.education !== undefined) {
        await sql`UPDATE resume_details SET education = ${updateData.education}, updated_at = CURRENT_TIMESTAMP WHERE id = ${resumeId}`;
      }
      
      if (updateData.skills !== undefined) {
        await sql`UPDATE resume_details SET skills = ${updateData.skills}, updated_at = CURRENT_TIMESTAMP WHERE id = ${resumeId}`;
      }
      
      if (updateData.status !== undefined) {
        await sql`UPDATE resume_details SET status = ${updateData.status}, updated_at = CURRENT_TIMESTAMP WHERE id = ${resumeId}`;
      }
      
      if (updateData.completion_percentage !== undefined) {
        await sql`UPDATE resume_details SET completion_percentage = ${updateData.completion_percentage}, updated_at = CURRENT_TIMESTAMP WHERE id = ${resumeId}`;
      }
      
    } catch (error) {
      console.error('Error updating resume detail:', error);
      throw new Error('Failed to update resume detail');
    }
  }

  async getResumeDetail(resumeId: number): Promise<ResumeDetail | null> {
    try {
      const result = await sql`
        SELECT * FROM resume_details WHERE id = ${resumeId}
      `;
      
      return result.length > 0 ? (result[0] as ResumeDetail) : null;
    } catch (error) {
      console.error('Error getting resume detail:', error);
      throw new Error('Failed to get resume detail');
    }
  }

  async getUserResumes(userId: number): Promise<ResumeDetail[]> {
    try {
      const result = await sql`
        SELECT * FROM resume_details 
        WHERE user_id = ${userId} 
        ORDER BY updated_at DESC
      `;
      
      return result as ResumeDetail[];
    } catch (error) {
      console.error('Error getting user resumes:', error);
      throw new Error('Failed to get user resumes');
    }
  }

  async getCurrentResume(userId: number, templateId: string): Promise<ResumeDetail | null> {
    try {
      const result = await sql`
        SELECT * FROM resume_details 
        WHERE user_id = ${userId} AND template_id = ${templateId} AND is_current = true
        ORDER BY version DESC
        LIMIT 1
      `;
      
      return result.length > 0 ? (result[0] as ResumeDetail) : null;
    } catch (error) {
      console.error('Error getting current resume:', error);
      throw new Error('Failed to get current resume');
    }
  }

  // History Operations
  async addResumeHistory(historyData: ResumeHistory): Promise<number> {
    try {
      const result = await sql`
        INSERT INTO resume_history (
          user_id, resume_detail_id, action, action_details, previous_data, new_data,
          changed_fields, version_before, version_after, status_before, status_after,
          template_id_before, template_id_after, ai_enhancement_applied, processing_time_ms
        ) VALUES (
          ${historyData.user_id}, ${historyData.resume_detail_id}, ${historyData.action},
          ${historyData.action_details}, ${historyData.previous_data}, ${historyData.new_data},
          ${historyData.changed_fields}, ${historyData.version_before}, ${historyData.version_after},
          ${historyData.status_before}, ${historyData.status_after}, ${historyData.template_id_before},
          ${historyData.template_id_after}, ${historyData.ai_enhancement_applied}, ${historyData.processing_time_ms}
        ) RETURNING id
      `;
      
      return (result[0] as any).id;
    } catch (error) {
      console.error('Error adding resume history:', error);
      throw new Error('Failed to add resume history');
    }
  }

  async getResumeHistory(resumeId: number): Promise<ResumeHistory[]> {
    try {
      const result = await sql`
        SELECT * FROM resume_history 
        WHERE resume_detail_id = ${resumeId} 
        ORDER BY created_at DESC
      `;
      
      return result as ResumeHistory[];
    } catch (error) {
      console.error('Error getting resume history:', error);
      throw new Error('Failed to get resume history');
    }
  }

  // File Storage Operations
  async saveFileToDisk(buffer: Buffer, originalFilename: string, userId: number): Promise<{ storedFilename: string; filePath: string }> {
    try {
      const uploadsDir = path.join(process.cwd(), 'uploads', 'resumes', userId.toString());
      
      // Create directory if it doesn't exist
      await fs.mkdir(uploadsDir, { recursive: true });
      
      // Generate unique filename
      const fileExtension = path.extname(originalFilename);
      const storedFilename = `${uuidv4()}${fileExtension}`;
      const filePath = path.join(uploadsDir, storedFilename);
      
      // Save file to disk
      await fs.writeFile(filePath, buffer);
      
      return { storedFilename, filePath };
    } catch (error) {
      console.error('Error saving file to disk:', error);
      throw new Error('Failed to save file to disk');
    }
  }

  async deleteFileFromDisk(filePath: string): Promise<void> {
    try {
      await fs.unlink(filePath);
    } catch (error) {
      console.error('Error deleting file from disk:', error);
      // Don't throw error for file deletion failures
    }
  }

  // Utility Functions
  async calculateCompletionPercentage(resumeData: Partial<ResumeDetail>): Promise<number> {
    let completedFields = 0;
    let totalFields = 0;

    // Personal Information (7 fields)
    totalFields += 7;
    if (resumeData.first_name) completedFields++;
    if (resumeData.last_name) completedFields++;
    if (resumeData.email) completedFields++;
    if (resumeData.phone) completedFields++;
    if (resumeData.title) completedFields++;
    if (resumeData.location) completedFields++;
    if (resumeData.summary) completedFields++;

    // Experiences
    if (resumeData.experiences && resumeData.experiences.length > 0) {
      totalFields += 1;
      completedFields++;
    }

    // Education
    if (resumeData.education && resumeData.education.length > 0) {
      totalFields += 1;
      completedFields++;
    }

    // Skills
    if (resumeData.skills && Object.keys(resumeData.skills).length > 0) {
      totalFields += 1;
      completedFields++;
    }

    return totalFields > 0 ? Math.round((completedFields / totalFields) * 100) : 0;
  }

  async createNewVersion(userId: number, templateId: string, templateName: string): Promise<number> {
    try {
      // Get current version number
      const currentResult = await sql`
        SELECT COALESCE(MAX(version), 0) as max_version 
        FROM resume_details 
        WHERE user_id = ${userId} AND template_id = ${templateId}
      `;
      
      const newVersion = ((currentResult[0] as any)?.max_version || 0) + 1;

      // Create new resume detail
      const newResume: ResumeDetail = {
        user_id: userId,
        template_id: templateId,
        template_name: templateName,
        status: 'draft',
        version: newVersion,
        is_current: true,
        ai_enhanced: false,
        completion_percentage: 0
      };

      return await this.saveResumeDetail(newResume);
    } catch (error) {
      console.error('Error creating new version:', error);
      throw new Error('Failed to create new version');
    }
  }

  // Update resume status
  async updateResumeStatus(resumeId: number, userId: number, status: string, notes?: string): Promise<void> {
    try {
      await sql`
        UPDATE resume_details 
        SET status = ${status}, notes = ${notes || null}, updated_at = CURRENT_TIMESTAMP
        WHERE id = ${resumeId} AND user_id = ${userId}
      `;
    } catch (error) {
      console.error('Error updating resume status:', error);
      throw new Error('Failed to update resume status');
    }
  }

}

export const resumeService = new ResumeService();
