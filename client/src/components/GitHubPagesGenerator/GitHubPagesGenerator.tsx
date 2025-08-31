import React, { useState } from 'react';
import { Github, Globe, Settings, Upload } from 'lucide-react';
import { GitHubPagesGeneratorProps, PortfolioData } from '../../types/resume-builder';
import Button from '../UI/Button';

export const GitHubPagesGenerator: React.FC<GitHubPagesGeneratorProps> = ({
  portfolioData,
  githubToken,
  repository,
  branch = 'main',
  onDeploy,
  onError,
  className = '',
  style = {}
}) => {
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentStatus, setDeploymentStatus] = useState<'idle' | 'deploying' | 'success' | 'error'>('idle');
  const [deploymentUrl, setDeploymentUrl] = useState('');

  const handleDeploy = async () => {
    if (!githubToken || !repository) {
      onError?.('GitHub token and repository are required');
      return;
    }

    setIsDeploying(true);
    setDeploymentStatus('deploying');

    try {
      // Mock deployment process - in real app, this would call GitHub API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const url = `https://${portfolioData.personalInfo.firstName.toLowerCase()}-${portfolioData.personalInfo.lastName.toLowerCase()}.github.io`;
      setDeploymentUrl(url);
      setDeploymentStatus('success');
      onDeploy?.(url);
    } catch (error) {
      setDeploymentStatus('error');
      onError?.(error instanceof Error ? error.message : 'Deployment failed');
    } finally {
      setIsDeploying(false);
    }
  };

  const getStatusIcon = () => {
    switch (deploymentStatus) {
      case 'deploying':
        return <Upload className="w-5 h-5 animate-spin text-[#19c973]" />;
      case 'success':
        return <Globe className="w-5 h-5 text-[#19c973]" />;
      case 'error':
        return <Settings className="w-5 h-5 text-red-400" />;
      default:
        return <Github className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusText = () => {
    switch (deploymentStatus) {
      case 'deploying':
        return 'Deploying to GitHub Pages...';
      case 'success':
        return 'Successfully deployed!';
      case 'error':
        return 'Deployment failed';
      default:
        return 'Ready to deploy';
    }
  };

  return (
    <div className={`space-y-6 ${className}`} style={style}>
      {/* Header */}
      <div className="glass-card p-6 rounded-xl">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-4">
            <Github className="inline w-5 h-5 mr-2" />
            GitHub Pages Deployment
          </h3>
        </div>
      </div>

      {/* Configuration Section */}
      <div className="glass-card p-6 rounded-xl">
        <h4 className="text-lg font-semibold text-white mb-6">Repository Configuration</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">Repository Name</label>
            <input
              type="text"
              value={repository}
              placeholder="username/repository-name"
              className="w-full px-4 py-3 bg-dark-800/50 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#19c973] focus:border-transparent"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">Branch</label>
            <input
              type="text"
              value={branch}
              placeholder="main"
              className="w-full px-4 py-3 bg-dark-800/50 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#19c973] focus:border-transparent"
              readOnly
            />
          </div>
        </div>
      </div>

      {/* Portfolio Preview */}
      <div className="glass-card p-6 rounded-xl">
        <h4 className="text-lg font-semibold text-white mb-6">Portfolio Preview</h4>
        <div className="p-4 bg-dark-800/30 rounded-lg border border-white/5">
          <div className="mb-4">
            <h5 className="text-lg font-medium text-white">{portfolioData.title || 'Portfolio Title'}</h5>
            <p className="text-gray-400">{portfolioData.description || 'Portfolio description'}</p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#19c973]">{portfolioData.skills.length}</div>
              <div className="text-sm text-gray-400">Skills</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#19c973]">{portfolioData.projects.length}</div>
              <div className="text-sm text-gray-400">Projects</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#19c973]">{portfolioData.experience.length}</div>
              <div className="text-sm text-gray-400">Experience</div>
            </div>
          </div>
        </div>
      </div>

      {/* Deployment Section */}
      <div className="glass-card p-6 rounded-xl">
        <h4 className="text-lg font-semibold text-white mb-6">Deployment</h4>
        <div className="space-y-4">
          <Button
            onClick={handleDeploy}
            disabled={isDeploying || !githubToken || !repository}
            variant="primary"
            className="w-full"
          >
            {getStatusIcon()}
            {isDeploying ? 'Deploying...' : 'Deploy to GitHub Pages'}
          </Button>
          
          <div className="text-center">
            <p className={`text-sm ${deploymentStatus === 'success' ? 'text-[#19c973]' : deploymentStatus === 'error' ? 'text-red-400' : 'text-gray-400'}`}>
              {getStatusText()}
            </p>
            {deploymentUrl && (
              <a
                href={deploymentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center mt-2 text-[#19c973] hover:text-[#16a362] transition-colors"
              >
                <Globe className="w-4 h-4 mr-2" />
                View Live Site
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="glass-card p-6 rounded-xl">
        <h4 className="text-lg font-semibold text-white mb-6">Deployment Instructions</h4>
        <div className="space-y-2 text-sm text-gray-300">
          <ol className="list-decimal list-inside space-y-2">
            <li>Ensure your GitHub repository is public</li>
            <li>Go to repository Settings → Pages</li>
            <li>Select source branch (usually main)</li>
            <li>Choose folder (usually /root)</li>
            <li>Click Save to enable GitHub Pages</li>
            <li>Wait for deployment to complete</li>
          </ol>
        </div>
      </div>
    </div>
  );
};
