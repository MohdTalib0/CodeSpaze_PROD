import { AIGenerationRequest, AIGenerationResponse, AISuggestion, ResumeData, PortfolioData } from '../types/resume-builder';
import { getApiUrl, getAuthHeaders } from '../config/api';

export class AIService {

  async generateContent(request: AIGenerationRequest, provider: 'gemini' | 'mistral' | 'perplexity' = 'gemini'): Promise<AIGenerationResponse> {
    try {
      const response = await fetch(getApiUrl('/ai-resume/generate-content'), {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          ...request,
          provider
        })
      });

      if (!response.ok) {
        throw new Error(`AI generation failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      // Log fallback information if available
      if (data.fallback) {
        console.log(`🔄 AI service used fallback: ${data.originalProvider} → ${data.provider}`);
      }
      
      return data;
    } catch (error) {
      console.error(`AI generation failed with ${provider}:`, error);
      return {
        success: false,
        error: `AI generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }

  async suggestImprovements(data: ResumeData | PortfolioData, provider: 'gemini' | 'mistral' | 'perplexity' = 'gemini'): Promise<AISuggestion[]> {
    try {
      const response = await fetch(getApiUrl('/ai-resume/suggest-improvements'), {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          data,
          provider
        })
      });

      if (!response.ok) {
        throw new Error(`AI suggestions failed: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      
      if (result.success && result.suggestions) {
        return result.suggestions;
      }

      // Fallback suggestions if AI fails
      return [
        {
          type: 'skill',
          field: 'Technical Skills',
          suggestion: 'Consider adding more specific technical skills relevant to your target role',
          confidence: 0.8,
          reasoning: 'Technical skills are highly valued by employers'
        },
        {
          type: 'experience',
          field: 'Work Experience',
          suggestion: 'Quantify your achievements with specific metrics and numbers',
          confidence: 0.9,
          reasoning: 'Quantified achievements demonstrate impact and value'
        }
      ];
    } catch (error) {
      console.error('Failed to get AI suggestions:', error);
      return [];
    }
  }


}
