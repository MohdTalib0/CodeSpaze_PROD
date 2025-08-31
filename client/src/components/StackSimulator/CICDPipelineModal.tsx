import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  CheckCircle, 
  X, 
  Play, 
  Pause, 
  RotateCcw,
  Clock,
  AlertTriangle,
  GitBranch,
  Server,
  Globe,
  Database
} from 'lucide-react';

interface CICDPipelineModalProps {
  onClose: () => void;
  onDeploy: () => void;
}

interface PipelineStage {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'success' | 'failed' | 'skipped';
  duration: number;
  logs: string[];
}

const CICDPipelineModal: React.FC<CICDPipelineModalProps> = ({ onClose, onDeploy }) => {
  const [pipelineStatus, setPipelineStatus] = useState<'idle' | 'running' | 'completed' | 'failed'>('idle');
  const [currentStage, setCurrentStage] = useState(0);
  const [pipelineStages, setPipelineStages] = useState<PipelineStage[]>([
    {
      id: 'lint',
      name: 'Lint & Format',
      status: 'pending',
      duration: 0,
      logs: []
    },
    {
      id: 'test',
      name: 'Run Tests',
      status: 'pending',
      duration: 0,
      logs: []
    },
    {
      id: 'build',
      name: 'Build Application',
      status: 'pending',
      duration: 0,
      logs: []
    },
    {
      id: 'security',
      name: 'Security Scan',
      status: 'pending',
      duration: 0,
      logs: []
    },
    {
      id: 'deploy-staging',
      name: 'Deploy to Staging',
      status: 'pending',
      duration: 0,
      logs: []
    },
    {
      id: 'deploy-prod',
      name: 'Deploy to Production',
      status: 'pending',
      duration: 0,
      logs: []
    }
  ]);

  const [deploymentEnvironments] = useState([
    { name: 'Staging', url: 'https://staging.app.com', status: 'healthy', icon: <Globe className="w-4 h-4" /> },
    { name: 'Production', url: 'https://app.com', status: 'healthy', icon: <Server className="w-4 h-4" /> },
    { name: 'Database', url: 'postgresql://db.app.com', status: 'healthy', icon: <Database className="w-4 h-4" /> }
  ]);

  const startPipeline = () => {
    setPipelineStatus('running');
    setCurrentStage(0);
    runPipelineStage(0);
  };

  const runPipelineStage = (stageIndex: number) => {
    if (stageIndex >= pipelineStages.length) {
      setPipelineStatus('completed');
      return;
    }

    setCurrentStage(stageIndex);
    const updatedStages = [...pipelineStages];
    updatedStages[stageIndex].status = 'running';
    updatedStages[stageIndex].logs = [];
    setPipelineStages(updatedStages);

    // Simulate stage execution
    const stage = updatedStages[stageIndex];
    let logIndex = 0;
    
    const stageLogs = getStageLogs(stage.id);
    const interval = setInterval(() => {
      if (logIndex < stageLogs.length) {
        updatedStages[stageIndex].logs.push(stageLogs[logIndex]);
        setPipelineStages([...updatedStages]);
        logIndex++;
      } else {
        clearInterval(interval);
        
        // Mark stage as completed
        setTimeout(() => {
          const finalStages = [...pipelineStages];
          finalStages[stageIndex].status = 'success';
          finalStages[stageIndex].duration = Math.floor(Math.random() * 30) + 10;
          setPipelineStages(finalStages);
          
          // Move to next stage
          if (stageIndex < pipelineStages.length - 1) {
            setTimeout(() => runPipelineStage(stageIndex + 1), 1000);
          } else {
            setPipelineStatus('completed');
            onDeploy();
          }
        }, 1000);
      }
    }, 200);
  };

  const getStageLogs = (stageId: string): string[] => {
    const logsMap: { [key: string]: string[] } = {
      lint: [
        'Running ESLint...',
        'Checking code formatting with Prettier...',
        'Found 0 errors and 2 warnings',
        'Code quality checks passed ✓'
      ],
      test: [
        'Installing dependencies...',
        'Running Jest test suite...',
        'Running 127 tests...',
        '127 tests passed ✓',
        'Test coverage: 89.5%'
      ],
      build: [
        'Building application...',
        'Compiling TypeScript...',
        'Bundling with Webpack...',
        'Optimizing assets...',
        'Build completed successfully ✓'
      ],
      security: [
        'Running npm audit...',
        'Scanning for vulnerabilities...',
        'Checking dependencies...',
        'Security scan completed ✓',
        'No critical vulnerabilities found'
      ],
      'deploy-staging': [
        'Deploying to staging environment...',
        'Building Docker container...',
        'Pushing to staging registry...',
        'Updating staging deployment...',
        'Staging deployment successful ✓'
      ],
      'deploy-prod': [
        'Deploying to production...',
        'Running health checks...',
        'Updating production deployment...',
        'Production deployment successful ✓',
        'Application is live! 🚀'
      ]
    };
    
    return logsMap[stageId] || [];
  };

  const resetPipeline = () => {
    setPipelineStatus('idle');
    setCurrentStage(0);
    setPipelineStages(pipelineStages.map(stage => ({
      ...stage,
      status: 'pending',
      duration: 0,
      logs: []
    })));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-gray-400" />;
      case 'running':
        return <RotateCcw className="w-4 h-4 text-blue-500 animate-spin" />;
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'failed':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-gray-700 text-gray-300';
      case 'running':
        return 'bg-blue-900 text-blue-400';
      case 'success':
        return 'bg-green-900 text-green-400';
      case 'failed':
        return 'bg-red-900 text-red-400';
      default:
        return 'bg-gray-700 text-gray-300';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
      <div className="bg-black border border-gray-800 rounded-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <Zap className="w-6 h-6 text-blue-500" />
            <h3 className="text-xl font-semibold text-white">CI/CD Pipeline Simulator</h3>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={resetPipeline}
              className="px-3 py-1 bg-gray-900 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors text-sm border border-gray-700"
            >
              Reset
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex h-[calc(90vh-120px)]">
          {/* Left Panel - Pipeline Stages */}
          <div className="w-2/3 p-6 border-r border-gray-800 overflow-y-auto">
            <div className="space-y-4">
              {/* Pipeline Controls */}
              <div className="flex items-center gap-3 mb-6">
                <button
                  onClick={startPipeline}
                  disabled={pipelineStatus === 'running'}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Play className="w-4 h-4" />
                  Start Pipeline
                </button>
                <div className="text-sm text-gray-300">
                  Status: <span className="font-semibold capitalize text-white">{pipelineStatus}</span>
                </div>
              </div>

              {/* Pipeline Stages */}
              {pipelineStages.map((stage, index) => (
                <div key={stage.id} className="border border-gray-700 rounded-lg overflow-hidden">
                  <div className={`p-4 ${index === currentStage ? 'bg-gray-900 border-l-4 border-l-blue-500' : 'bg-gray-800'}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(stage.status)}
                        <h4 className="font-semibold text-white">{stage.name}</h4>
                      </div>
                      <div className="flex items-center gap-2">
                        {stage.duration > 0 && (
                          <span className="text-sm text-gray-400">{stage.duration}s</span>
                        )}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(stage.status)}`}>
                          {stage.status}
                        </span>
                      </div>
                    </div>
                    
                    {/* Stage Logs */}
                    {stage.logs.length > 0 && (
                      <div className="mt-3 bg-black rounded-lg p-3 border border-gray-700">
                        <div className="font-mono text-xs text-green-400 space-y-1 max-h-32 overflow-y-auto">
                          {stage.logs.map((log, logIndex) => (
                            <div key={logIndex} className="whitespace-pre-wrap">{log}</div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel - Deployment Info */}
          <div className="w-1/3 p-6 bg-gray-900">
            <h4 className="font-semibold text-white mb-4">Deployment Environments</h4>
            <div className="space-y-3">
              {deploymentEnvironments.map((env) => (
                <div key={env.name} className="bg-gray-800 p-3 rounded-lg border border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {env.icon}
                      <span className="font-medium text-white">{env.name}</span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      env.status === 'healthy' ? 'bg-green-900 text-green-400' : 'bg-red-900 text-red-400'
                    }`}>
                      {env.status}
                    </span>
                  </div>
                  <div className="text-xs text-gray-400 mt-1 font-mono">{env.url}</div>
                </div>
              ))}
            </div>

            {/* Pipeline Summary */}
            <div className="mt-6 bg-gray-800 p-4 rounded-lg border border-gray-700">
              <h5 className="font-semibold text-white mb-3">Pipeline Summary</h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-300">Total Stages:</span>
                  <span className="font-medium text-white">{pipelineStages.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Completed:</span>
                  <span className="font-medium text-green-400">
                    {pipelineStages.filter(s => s.status === 'success').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Running:</span>
                  <span className="font-medium text-blue-400">
                    {pipelineStages.filter(s => s.status === 'running').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Pending:</span>
                  <span className="font-medium text-gray-400">
                    {pipelineStages.filter(s => s.status === 'pending').length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CICDPipelineModal;
