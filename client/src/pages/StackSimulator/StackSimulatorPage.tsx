import React, { useState, useEffect } from 'react';
import { 
  GitBranch, 
  GitCommit, 
  GitPullRequest, 
  GitMerge, 
  Bug, 
  CheckCircle, 
  Clock, 
  Users,
  BarChart3,
  Code,
  Database,
  Server,
  Globe,
  Smartphone,
  Zap
} from 'lucide-react';
import { GitWorkflowModal, CICDPipelineModal, JiraBoardModal } from '../../components/StackSimulator';

interface SimulatorState {
  currentRole: 'developer' | 'devops' | 'qa' | 'pm';
  currentTask: string;
  gitCommits: number;
  prReviews: number;
  deployments: number;
  bugsFixed: number;
  testsPassed: number;
  sprintProgress: number;
  teamCollaboration: number;
}

const StackSimulatorPage: React.FC = () => {
  const [simulatorState, setSimulatorState] = useState<SimulatorState>({
    currentRole: 'developer',
    currentTask: 'Implement user authentication feature',
    gitCommits: 0,
    prReviews: 0,
    deployments: 0,
    bugsFixed: 0,
    testsPassed: 0,
    sprintProgress: 0,
    teamCollaboration: 0
  });

  const [showTaskModal, setShowTaskModal] = useState(false);
  const [currentTaskDetails, setCurrentTaskDetails] = useState<any>(null);
  const [showGitWorkflow, setShowGitWorkflow] = useState(false);
  const [showCICD, setShowCICD] = useState(false);
  const [showJiraBoard, setShowJiraBoard] = useState(false);

  const roles = [
    {
      id: 'developer',
      name: 'Full Stack Developer',
      icon: <Code className="w-6 h-6" />,
      description: 'Write code, review PRs, fix bugs',
      color: 'bg-blue-500'
    },
    {
      id: 'devops',
      name: 'DevOps Engineer',
      icon: <Server className="w-6 h-6" />,
      description: 'Manage deployments, CI/CD pipelines',
      color: 'bg-green-500'
    },
    {
      id: 'qa',
      name: 'QA Engineer',
      icon: <Bug className="w-6 h-6" />,
      description: 'Test features, report bugs, ensure quality',
      color: 'bg-purple-500'
    },
    {
      id: 'pm',
      name: 'Product Manager',
      icon: <BarChart3 className="w-6 h-6" />,
      description: 'Plan sprints, prioritize features, track progress',
      color: 'bg-orange-500'
    }
  ];

  const techStack = [
    { name: 'Frontend', icon: <Globe className="w-5 h-5" />, tech: ['React', 'TypeScript', 'Tailwind CSS'] },
    { name: 'Backend', icon: <Database className="w-5 h-5" />, tech: ['Node.js', 'Express', 'PostgreSQL'] },
    { name: 'DevOps', icon: <Server className="w-5 h-5" />, tech: ['Docker', 'GitHub Actions', 'AWS'] },
    { name: 'Mobile', icon: <Smartphone className="w-5 h-5" />, tech: ['React Native', 'Expo'] },
    { name: 'Testing', icon: <CheckCircle className="w-5 h-5" />, tech: ['Jest', 'Cypress', 'Postman'] }
  ];

  const handleRoleChange = (role: 'developer' | 'devops' | 'qa' | 'pm') => {
    setSimulatorState(prev => ({ ...prev, currentRole: role }));
  };

  const handleGitAction = (action: 'commit' | 'push' | 'pull' | 'merge') => {
    setSimulatorState(prev => ({
      ...prev,
      gitCommits: action === 'commit' ? prev.gitCommits + 1 : prev.gitCommits,
      prReviews: action === 'merge' ? prev.prReviews + 1 : prev.prReviews
    }));
  };

  const handleDeploy = () => {
    setSimulatorState(prev => ({
      ...prev,
      deployments: prev.deployments + 1,
      sprintProgress: Math.min(100, prev.sprintProgress + 10)
    }));
  };

  const handleBugFix = () => {
    setSimulatorState(prev => ({
      ...prev,
      bugsFixed: prev.bugsFixed + 1,
      testsPassed: prev.testsPassed + 1
    }));
  };

  const handleTestRun = () => {
    setSimulatorState(prev => ({
      ...prev,
      testsPassed: prev.testsPassed + 1,
      sprintProgress: Math.min(100, prev.sprintProgress + 5)
    }));
  };

  const handleCollaboration = () => {
    setSimulatorState(prev => ({
      ...prev,
      teamCollaboration: Math.min(100, prev.teamCollaboration + 15)
    }));
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            🚀 CodeSpaze <span className="gradient-text">Stack Simulator</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Experience real-world tech company workflows! Practice Git operations, CI/CD pipelines, 
            Jira boards, and team collaboration in a safe, interactive environment.
          </p>
        </div>

        {/* Role Selection */}
        <div className="glass-card p-6 rounded-xl mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Choose Your Role</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => handleRoleChange(role.id as any)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                  simulatorState.currentRole === role.id
                    ? 'border-primary-500 bg-primary-500/20'
                    : 'border-white/10 hover:border-white/20 bg-black/20'
                }`}
              >
                <div className={`${role.color} w-12 h-12 rounded-lg flex items-center justify-center text-white mx-auto mb-3`}>
                  {role.icon}
                </div>
                <h3 className="font-semibold text-white mb-2">{role.name}</h3>
                <p className="text-sm text-gray-400">{role.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Tech Stack Overview */}
        <div className="glass-card p-6 rounded-xl mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Company Tech Stack</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {techStack.map((stack) => (
              <div key={stack.name} className="text-center p-4 bg-black/20 rounded-lg border border-white/10">
                <div className="text-primary-500 mb-2 flex justify-center">{stack.icon}</div>
                <h3 className="font-semibold text-white mb-2">{stack.name}</h3>
                <div className="space-y-1">
                  {stack.tech.map((tech) => (
                    <span key={tech} className="block text-sm text-gray-300 bg-dark-800 px-2 py-1 rounded border border-white/10">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Simulator Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Current Task & Actions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Task */}
            <div className="glass-card p-6 rounded-xl">
              <h2 className="text-xl font-semibold text-white mb-4">Current Task</h2>
              <div className="bg-black/20 p-4 rounded-lg border border-white/10">
                <h3 className="font-semibold text-primary-500 mb-2">{simulatorState.currentTask}</h3>
                <p className="text-gray-300 text-sm">
                  As a {roles.find(r => r.id === simulatorState.currentRole)?.name}, 
                  you need to complete this feature for the upcoming sprint.
                </p>
              </div>
              
              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  onClick={() => setShowGitWorkflow(true)}
                  className="flex items-center gap-2 bg-primary-500 text-dark-950 px-4 py-2 rounded-lg hover:bg-primary-400 transition-colors"
                >
                  <GitBranch className="w-4 h-4" />
                  Git Workflow
                </button>
                <button
                  onClick={() => setShowCICD(true)}
                  className="flex items-center gap-2 bg-primary-500 text-dark-950 px-4 py-2 rounded-lg hover:bg-primary-400 transition-colors"
                >
                  <Zap className="w-4 h-4" />
                  CI/CD Pipeline
                </button>
                <button
                  onClick={() => setShowJiraBoard(true)}
                  className="flex items-center gap-2 bg-primary-500 text-dark-950 px-4 py-2 rounded-lg hover:bg-primary-400 transition-colors"
                >
                  <BarChart3 className="w-4 h-4" />
                  Jira Board
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="glass-card p-6 rounded-xl">
              <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button
                  onClick={() => handleGitAction('commit')}
                  className="flex flex-col items-center gap-2 p-4 bg-black/20 rounded-lg hover:bg-white/5 transition-colors border border-white/10"
                >
                  <GitCommit className="w-6 h-6 text-primary-500" />
                  <span className="text-sm font-medium text-white">Commit</span>
                </button>
                <button
                  onClick={() => handleDeploy()}
                  className="flex flex-col items-center gap-2 p-4 bg-black/20 rounded-lg hover:bg-white/5 transition-colors border border-white/10"
                >
                  <Server className="w-6 h-6 text-primary-500" />
                  <span className="text-sm font-medium text-white">Deploy</span>
                </button>
                <button
                  onClick={() => handleBugFix()}
                  className="flex flex-col items-center gap-2 p-4 bg-black/20 rounded-lg hover:bg-white/5 transition-colors border border-white/10"
                >
                  <Bug className="w-6 h-6 text-primary-500" />
                  <span className="text-sm font-medium text-white">Fix Bug</span>
                </button>
                <button
                  onClick={() => handleTestRun()}
                  className="flex flex-col items-center gap-2 p-4 bg-black/20 rounded-lg hover:bg-white/5 transition-colors border border-white/10"
                >
                  <CheckCircle className="w-6 h-6 text-primary-500" />
                  <span className="text-sm font-medium text-white">Run Tests</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Stats & Progress */}
          <div className="space-y-6">
            {/* Role Stats */}
            <div className="glass-card p-6 rounded-xl">
              <h2 className="text-xl font-semibold text-white mb-4">Your Stats</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Git Commits</span>
                  <span className="font-semibold text-primary-500">{simulatorState.gitCommits}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">PR Reviews</span>
                  <span className="font-semibold text-primary-500">{simulatorState.prReviews}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Deployments</span>
                  <span className="font-semibold text-primary-500">{simulatorState.deployments}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Bugs Fixed</span>
                  <span className="font-semibold text-primary-500">{simulatorState.bugsFixed}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Tests Passed</span>
                  <span className="font-semibold text-primary-500">{simulatorState.testsPassed}</span>
                </div>
              </div>
            </div>

            {/* Sprint Progress */}
            <div className="glass-card p-6 rounded-xl">
              <h2 className="text-xl font-semibold text-white mb-4">Sprint Progress</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400">Overall Progress</span>
                    <span className="font-semibold text-primary-500">{simulatorState.sprintProgress}%</span>
                  </div>
                  <div className="w-full bg-dark-800 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${simulatorState.sprintProgress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400">Team Collaboration</span>
                    <span className="font-semibold text-primary-500">{simulatorState.teamCollaboration}%</span>
                  </div>
                  <div className="w-full bg-dark-800 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${simulatorState.teamCollaboration}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleCollaboration}
                className="w-full mt-4 bg-primary-500 text-dark-950 py-2 rounded-lg hover:bg-primary-400 transition-colors"
              >
                <Users className="w-4 h-4 inline mr-2" />
                Collaborate with Team
              </button>
            </div>
          </div>
        </div>

        {/* Modals */}
        {showGitWorkflow && (
          <GitWorkflowModal 
            onClose={() => setShowGitWorkflow(false)}
            onAction={(action: string) => handleGitAction(action as any)}
          />
        )}
        
        {showCICD && (
          <CICDPipelineModal 
            onClose={() => setShowCICD(false)}
            onDeploy={handleDeploy}
          />
        )}
        
        {showJiraBoard && (
          <JiraBoardModal 
            onClose={() => setShowJiraBoard(false)}
            onTaskComplete={() => {
              setSimulatorState(prev => ({
                ...prev,
                sprintProgress: Math.min(100, prev.sprintProgress + 20)
              }));
            }}
          />
        )}
      </div>
    </div>
  );
};

export default StackSimulatorPage;
