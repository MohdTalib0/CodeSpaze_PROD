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
  Zap,
  Trophy,
  Star,
  Target,
  TrendingUp,
  AlertCircle,
  Bell,
  Settings,
  Award,
  Flame,
  Rocket,
  Crown,
  Medal,
  Sparkles,
  Activity,
  Timer,
  Play,
  Pause,
  RotateCcw,
  X
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
  experience: number;
  level: number;
  streak: number;
  achievements: string[];
  notifications: Notification[];
  isPlaying: boolean;
  sessionTime: number;
  totalScore: number;
}

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'achievement';
  message: string;
  timestamp: Date;
}

interface Task {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: number;
  xpReward: number;
  requirements: string[];
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
    teamCollaboration: 0,
    experience: 0,
    level: 1,
    streak: 0,
    achievements: [],
    notifications: [],
    isPlaying: false,
    sessionTime: 0,
    totalScore: 0
  });

  const [showTaskModal, setShowTaskModal] = useState(false);
  const [currentTaskDetails, setCurrentTaskDetails] = useState<any>(null);
  const [showGitWorkflow, setShowGitWorkflow] = useState(false);
  const [showCICD, setShowCICD] = useState(false);
  const [showJiraBoard, setShowJiraBoard] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [taskStartTime, setTaskStartTime] = useState<Date | null>(null);

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

  const availableTasks: Task[] = [
    {
      id: 'auth-feature',
      title: 'Implement User Authentication',
      description: 'Create a secure login system with JWT tokens and password hashing',
      difficulty: 'medium',
      estimatedTime: 120,
      xpReward: 150,
      requirements: ['React', 'Node.js', 'JWT']
    },
    {
      id: 'api-integration',
      title: 'Build REST API',
      description: 'Design and implement a RESTful API with proper error handling',
      difficulty: 'hard',
      estimatedTime: 180,
      xpReward: 200,
      requirements: ['Express', 'PostgreSQL', 'Swagger']
    },
    {
      id: 'ui-component',
      title: 'Create Reusable Components',
      description: 'Build a component library with Storybook documentation',
      difficulty: 'easy',
      estimatedTime: 90,
      xpReward: 100,
      requirements: ['React', 'TypeScript', 'Storybook']
    },
    {
      id: 'deployment',
      title: 'Setup CI/CD Pipeline',
      description: 'Configure automated testing and deployment pipeline',
      difficulty: 'hard',
      estimatedTime: 240,
      xpReward: 250,
      requirements: ['Docker', 'GitHub Actions', 'AWS']
    },
    {
      id: 'testing',
      title: 'Write Unit Tests',
      description: 'Achieve 90% code coverage with comprehensive test suite',
      difficulty: 'medium',
      estimatedTime: 150,
      xpReward: 175,
      requirements: ['Jest', 'React Testing Library']
    }
  ];

  const achievements = [
    { id: 'first-commit', name: 'First Commit', description: 'Make your first git commit', icon: <GitCommit className="w-4 h-4" />, unlocked: false },
    { id: 'bug-hunter', name: 'Bug Hunter', description: 'Fix 10 bugs', icon: <Bug className="w-4 h-4" />, unlocked: false },
    { id: 'deployment-master', name: 'Deployment Master', description: 'Deploy 5 times successfully', icon: <Rocket className="w-4 h-4" />, unlocked: false },
    { id: 'team-player', name: 'Team Player', description: 'Collaborate 100% with team', icon: <Users className="w-4 h-4" />, unlocked: false },
    { id: 'sprint-champion', name: 'Sprint Champion', description: 'Complete a full sprint', icon: <Trophy className="w-4 h-4" />, unlocked: false },
    { id: 'streak-master', name: 'Streak Master', description: 'Maintain a 7-day streak', icon: <Flame className="w-4 h-4" />, unlocked: false }
  ];

  // Enhanced functions with XP, achievements, and notifications
  const addNotification = (type: Notification['type'], message: string) => {
    const notification: Notification = {
      id: Date.now().toString(),
      type,
      message,
      timestamp: new Date()
    };
    setSimulatorState(prev => ({
      ...prev,
      notifications: [notification, ...prev.notifications.slice(0, 4)]
    }));
  };

  const addExperience = (xp: number) => {
    setSimulatorState(prev => {
      const newXP = prev.experience + xp;
      const newLevel = Math.floor(newXP / 100) + 1;
      const leveledUp = newLevel > prev.level;
      
      if (leveledUp) {
        addNotification('achievement', `🎉 Level Up! You're now level ${newLevel}!`);
      }
      
      return {
        ...prev,
        experience: newXP,
        level: newLevel,
        totalScore: prev.totalScore + xp
      };
    });
  };

  const checkAchievements = () => {
    const newAchievements: string[] = [];
    
    if (simulatorState.gitCommits >= 1 && !simulatorState.achievements.includes('first-commit')) {
      newAchievements.push('first-commit');
    }
    if (simulatorState.bugsFixed >= 10 && !simulatorState.achievements.includes('bug-hunter')) {
      newAchievements.push('bug-hunter');
    }
    if (simulatorState.deployments >= 5 && !simulatorState.achievements.includes('deployment-master')) {
      newAchievements.push('deployment-master');
    }
    if (simulatorState.teamCollaboration >= 100 && !simulatorState.achievements.includes('team-player')) {
      newAchievements.push('team-player');
    }
    if (simulatorState.sprintProgress >= 100 && !simulatorState.achievements.includes('sprint-champion')) {
      newAchievements.push('sprint-champion');
    }
    if (simulatorState.streak >= 7 && !simulatorState.achievements.includes('streak-master')) {
      newAchievements.push('streak-master');
    }

    if (newAchievements.length > 0) {
      setSimulatorState(prev => ({
        ...prev,
        achievements: [...prev.achievements, ...newAchievements]
      }));
      
      newAchievements.forEach(achievementId => {
        const achievement = achievements.find(a => a.id === achievementId);
        if (achievement) {
          addNotification('achievement', `🏆 Achievement Unlocked: ${achievement.name}!`);
        }
      });
    }
  };

  const handleRoleChange = (role: 'developer' | 'devops' | 'qa' | 'pm') => {
    setSimulatorState(prev => ({ ...prev, currentRole: role }));
    addNotification('info', `Switched to ${roles.find(r => r.id === role)?.name} role`);
  };

  const handleGitAction = (action: 'commit' | 'push' | 'pull' | 'merge') => {
    setSimulatorState(prev => ({
      ...prev,
      gitCommits: action === 'commit' ? prev.gitCommits + 1 : prev.gitCommits,
      prReviews: action === 'merge' ? prev.prReviews + 1 : prev.prReviews
    }));
    
    if (action === 'commit') {
      addExperience(10);
      addNotification('success', 'Code committed successfully! +10 XP');
    } else if (action === 'merge') {
      addExperience(15);
      addNotification('success', 'Pull request merged! +15 XP');
    }
    
    checkAchievements();
  };

  const handleDeploy = () => {
    setSimulatorState(prev => ({
      ...prev,
      deployments: prev.deployments + 1,
      sprintProgress: Math.min(100, prev.sprintProgress + 10)
    }));
    
    addExperience(25);
    addNotification('success', 'Deployment successful! +25 XP');
    checkAchievements();
  };

  const handleBugFix = () => {
    setSimulatorState(prev => ({
      ...prev,
      bugsFixed: prev.bugsFixed + 1,
      testsPassed: prev.testsPassed + 1
    }));
    
    addExperience(20);
    addNotification('success', 'Bug fixed! +20 XP');
    checkAchievements();
  };

  const handleTestRun = () => {
    setSimulatorState(prev => ({
      ...prev,
      testsPassed: prev.testsPassed + 1,
      sprintProgress: Math.min(100, prev.sprintProgress + 5)
    }));
    
    addExperience(15);
    addNotification('success', 'Tests passed! +15 XP');
  };

  const handleCollaboration = () => {
    setSimulatorState(prev => ({
      ...prev,
      teamCollaboration: Math.min(100, prev.teamCollaboration + 15)
    }));
    
    addExperience(10);
    addNotification('info', 'Team collaboration improved! +10 XP');
    checkAchievements();
  };

  const startTask = (task: Task) => {
    setCurrentTask(task);
    setTaskStartTime(new Date());
    setSimulatorState(prev => ({ ...prev, isPlaying: true }));
    addNotification('info', `Started task: ${task.title}`);
  };

  const completeTask = () => {
    if (currentTask && taskStartTime) {
      const timeSpent = Math.floor((new Date().getTime() - taskStartTime.getTime()) / 1000 / 60);
      addExperience(currentTask.xpReward);
      addNotification('success', `Task completed! +${currentTask.xpReward} XP (${timeSpent} min)`);
      
      setSimulatorState(prev => ({
        ...prev,
        sprintProgress: Math.min(100, prev.sprintProgress + 20),
        streak: prev.streak + 1
      }));
      
      setCurrentTask(null);
      setTaskStartTime(null);
      setSimulatorState(prev => ({ ...prev, isPlaying: false }));
      checkAchievements();
    }
  };

  const resetSimulator = () => {
    setSimulatorState({
      currentRole: 'developer',
      currentTask: 'Implement user authentication feature',
      gitCommits: 0,
      prReviews: 0,
      deployments: 0,
      bugsFixed: 0,
      testsPassed: 0,
      sprintProgress: 0,
      teamCollaboration: 0,
      experience: 0,
      level: 1,
      streak: 0,
      achievements: [],
      notifications: [],
      isPlaying: false,
      sessionTime: 0,
      totalScore: 0
    });
    setCurrentTask(null);
    setTaskStartTime(null);
    addNotification('info', 'Simulator reset! Start fresh!');
  };

  return (
    <div className="p-3 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-4 md:mb-6 gap-4">
            <div className="flex items-center space-x-2 md:space-x-4">
              <button
                onClick={() => setShowAchievements(true)}
                className="flex items-center space-x-1 md:space-x-2 bg-primary-500/20 text-primary-500 px-2 md:px-4 py-2 rounded-lg hover:bg-primary-500/30 transition-colors text-sm md:text-base"
              >
                <Trophy className="w-4 h-4 md:w-5 md:h-5" />
                <span className="hidden sm:inline">Achievements ({simulatorState.achievements.length})</span>
                <span className="sm:hidden">Awards ({simulatorState.achievements.length})</span>
              </button>
              <button
                onClick={() => setShowSettings(true)}
                className="flex items-center space-x-1 md:space-x-2 bg-gray-500/20 text-gray-300 px-2 md:px-4 py-2 rounded-lg hover:bg-gray-500/30 transition-colors text-sm md:text-base"
              >
                <Settings className="w-4 h-4 md:w-5 md:h-5" />
                <span className="hidden sm:inline">Settings</span>
                <span className="sm:hidden">Config</span>
              </button>
            </div>
            
            <div className="flex items-center space-x-3 md:space-x-6">
              <div className="text-center">
                <div className="flex items-center space-x-1 md:space-x-2">
                  <Crown className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" />
                  <span className="text-white font-bold text-sm md:text-base">Level {simulatorState.level}</span>
                </div>
                <div className="w-24 md:w-32 bg-gray-700 rounded-full h-2 mt-1">
                  <div 
                    className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(simulatorState.experience % 100)}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-400">{simulatorState.experience % 100}/100 XP</span>
              </div>
              
              <div className="text-center">
                <div className="flex items-center space-x-1 md:space-x-2">
                  <Flame className="w-4 h-4 md:w-5 md:h-5 text-orange-500" />
                  <span className="text-white font-bold text-sm md:text-base">{simulatorState.streak}</span>
                </div>
                <span className="text-xs text-gray-400">Day Streak</span>
              </div>
              
              <div className="text-center">
                <div className="flex items-center space-x-1 md:space-x-2">
                  <Star className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" />
                  <span className="text-white font-bold text-sm md:text-base">{simulatorState.totalScore}</span>
                </div>
                <span className="text-xs text-gray-400">Total Score</span>
              </div>
            </div>
          </div>
          
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-4">
            🚀 CodeSpaze <span className="gradient-text">Stack Simulator</span>
          </h1>
          <p className="text-sm md:text-lg text-gray-300 max-w-3xl mx-auto px-4">
            Experience real-world tech company workflows! Practice Git operations, CI/CD pipelines, 
            Jira boards, and team collaboration in a safe, interactive environment.
          </p>
        </div>

        {/* Role Selection */}
        <div className="glass-card p-4 md:p-6 rounded-xl mb-6 md:mb-8">
          <h2 className="text-lg md:text-xl font-semibold text-white mb-4">Choose Your Role</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
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
                <div className={`${role.color} w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center text-white mx-auto mb-2 md:mb-3`}>
                  {role.icon}
                </div>
                <h3 className="font-semibold text-white mb-1 md:mb-2 text-sm md:text-base">{role.name}</h3>
                <p className="text-xs md:text-sm text-gray-400">{role.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Task Selection */}
        <div className="glass-card p-4 md:p-6 rounded-xl mb-6 md:mb-8">
          <h2 className="text-lg md:text-xl font-semibold text-white mb-4">Available Tasks</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {availableTasks.map((task) => (
              <div key={task.id} className="p-3 md:p-4 bg-black/20 rounded-lg border border-white/10 hover:border-primary-500/50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-white text-sm md:text-base">{task.title}</h3>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    task.difficulty === 'easy' ? 'bg-green-500/20 text-green-400' :
                    task.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {task.difficulty}
                  </span>
                </div>
                <p className="text-xs md:text-sm text-gray-300 mb-3">{task.description}</p>
                <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                  <span>⏱️ {task.estimatedTime} min</span>
                  <span>⭐ {task.xpReward} XP</span>
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                  {task.requirements.map((req) => (
                    <span key={req} className="px-2 py-1 bg-primary-500/20 text-primary-400 text-xs rounded">
                      {req}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => startTask(task)}
                  disabled={simulatorState.isPlaying}
                  className="w-full bg-primary-500 text-dark-950 py-2 rounded-lg hover:bg-primary-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {simulatorState.isPlaying ? 'Task in Progress...' : 'Start Task'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Current Task Progress */}
        {currentTask && (
          <div className="glass-card p-4 md:p-6 rounded-xl mb-6 md:mb-8">
            <h2 className="text-lg md:text-xl font-semibold text-white mb-4">Current Task Progress</h2>
            <div className="bg-black/20 p-4 rounded-lg border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-primary-500">{currentTask.title}</h3>
                <div className="flex items-center space-x-2">
                  <Timer className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-400">
                    {taskStartTime ? Math.floor((new Date().getTime() - taskStartTime.getTime()) / 1000 / 60) : 0} min
                  </span>
                </div>
              </div>
              <p className="text-gray-300 text-sm mb-4">{currentTask.description}</p>
              <div className="flex items-center space-x-4">
                <button
                  onClick={completeTask}
                  className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-400 transition-colors"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Complete Task</span>
                </button>
                <button
                  onClick={() => {
                    setCurrentTask(null);
                    setTaskStartTime(null);
                    setSimulatorState(prev => ({ ...prev, isPlaying: false }));
                  }}
                  className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-400 transition-colors"
                >
                  <X className="w-4 h-4" />
                  <span>Cancel Task</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tech Stack Overview */}
        <div className="glass-card p-4 md:p-6 rounded-xl mb-6 md:mb-8">
          <h2 className="text-lg md:text-xl font-semibold text-white mb-4">Company Tech Stack</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
            {techStack.map((stack) => (
              <div key={stack.name} className="text-center p-3 md:p-4 bg-black/20 rounded-lg border border-white/10">
                <div className="text-primary-500 mb-2 flex justify-center">{stack.icon}</div>
                <h3 className="font-semibold text-white mb-2 text-sm md:text-base">{stack.name}</h3>
                <div className="space-y-1">
                  {stack.tech.map((tech) => (
                    <span key={tech} className="block text-xs md:text-sm text-gray-300 bg-dark-800 px-2 py-1 rounded border border-white/10">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Simulator Dashboard */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {/* Left Column - Current Task & Actions */}
          <div className="xl:col-span-2 space-y-4 md:space-y-6">
            {/* Current Task */}
            <div className="glass-card p-4 md:p-6 rounded-xl">
              <h2 className="text-lg md:text-xl font-semibold text-white mb-4">Current Task</h2>
              <div className="bg-black/20 p-3 md:p-4 rounded-lg border border-white/10">
                <h3 className="font-semibold text-primary-500 mb-2 text-sm md:text-base">{simulatorState.currentTask}</h3>
                <p className="text-gray-300 text-xs md:text-sm">
                  As a {roles.find(r => r.id === simulatorState.currentRole)?.name}, 
                  you need to complete this feature for the upcoming sprint.
                </p>
              </div>
              
              <div className="mt-4 flex flex-col sm:flex-row gap-2 md:gap-3">
                <button
                  onClick={() => setShowGitWorkflow(true)}
                  className="flex items-center justify-center gap-2 bg-primary-500 text-dark-950 px-3 md:px-4 py-2 rounded-lg hover:bg-primary-400 transition-colors text-sm md:text-base"
                >
                  <GitBranch className="w-4 h-4" />
                  <span className="hidden sm:inline">Git Workflow</span>
                  <span className="sm:hidden">Git</span>
                </button>
                <button
                  onClick={() => setShowCICD(true)}
                  className="flex items-center justify-center gap-2 bg-primary-500 text-dark-950 px-3 md:px-4 py-2 rounded-lg hover:bg-primary-400 transition-colors text-sm md:text-base"
                >
                  <Zap className="w-4 h-4" />
                  <span className="hidden sm:inline">CI/CD Pipeline</span>
                  <span className="sm:hidden">CI/CD</span>
                </button>
                <button
                  onClick={() => setShowJiraBoard(true)}
                  className="flex items-center justify-center gap-2 bg-primary-500 text-dark-950 px-3 md:px-4 py-2 rounded-lg hover:bg-primary-400 transition-colors text-sm md:text-base"
                >
                  <BarChart3 className="w-4 h-4" />
                  <span className="hidden sm:inline">Jira Board</span>
                  <span className="sm:hidden">Jira</span>
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="glass-card p-4 md:p-6 rounded-xl">
              <h2 className="text-lg md:text-xl font-semibold text-white mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
                <button
                  onClick={() => handleGitAction('commit')}
                  className="flex flex-col items-center gap-1 md:gap-2 p-2 md:p-4 bg-black/20 rounded-lg hover:bg-white/5 transition-colors border border-white/10"
                >
                  <GitCommit className="w-5 h-5 md:w-6 md:h-6 text-primary-500" />
                  <span className="text-xs md:text-sm font-medium text-white">Commit</span>
                </button>
                <button
                  onClick={() => handleDeploy()}
                  className="flex flex-col items-center gap-1 md:gap-2 p-2 md:p-4 bg-black/20 rounded-lg hover:bg-white/5 transition-colors border border-white/10"
                >
                  <Server className="w-5 h-5 md:w-6 md:h-6 text-primary-500" />
                  <span className="text-xs md:text-sm font-medium text-white">Deploy</span>
                </button>
                <button
                  onClick={() => handleBugFix()}
                  className="flex flex-col items-center gap-1 md:gap-2 p-2 md:p-4 bg-black/20 rounded-lg hover:bg-white/5 transition-colors border border-white/10"
                >
                  <Bug className="w-5 h-5 md:w-6 md:h-6 text-primary-500" />
                  <span className="text-xs md:text-sm font-medium text-white">Fix Bug</span>
                </button>
                <button
                  onClick={() => handleTestRun()}
                  className="flex flex-col items-center gap-1 md:gap-2 p-2 md:p-4 bg-black/20 rounded-lg hover:bg-white/5 transition-colors border border-white/10"
                >
                  <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-primary-500" />
                  <span className="text-xs md:text-sm font-medium text-white">Run Tests</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Stats & Progress */}
          <div className="space-y-4 md:space-y-6">
            {/* Notifications */}
            <div className="glass-card p-4 md:p-6 rounded-xl">
              <h2 className="text-lg md:text-xl font-semibold text-white mb-4 flex items-center">
                <Bell className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                Notifications
              </h2>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {simulatorState.notifications.length === 0 ? (
                  <p className="text-gray-400 text-sm">No notifications yet</p>
                ) : (
                  simulatorState.notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-3 rounded-lg border-l-4 ${
                        notification.type === 'success' ? 'bg-green-500/10 border-green-500' :
                        notification.type === 'warning' ? 'bg-yellow-500/10 border-yellow-500' :
                        notification.type === 'achievement' ? 'bg-purple-500/10 border-purple-500' :
                        'bg-blue-500/10 border-blue-500'
                      }`}
                    >
                      <p className="text-sm text-white">{notification.message}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {notification.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Role Stats */}
            <div className="glass-card p-4 md:p-6 rounded-xl">
              <h2 className="text-lg md:text-xl font-semibold text-white mb-4">Your Stats</h2>
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
            <div className="glass-card p-4 md:p-6 rounded-xl">
              <h2 className="text-lg md:text-xl font-semibold text-white mb-4">Sprint Progress</h2>
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
              
              <button
                onClick={resetSimulator}
                className="w-full mt-3 bg-red-500/20 text-red-400 py-2 rounded-lg hover:bg-red-500/30 transition-colors flex items-center justify-center"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset Simulator
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

        {/* Achievements Modal */}
        {showAchievements && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 md:p-4">
            <div className="bg-gray-900 rounded-xl p-4 md:p-6 max-w-2xl w-full mx-2 md:mx-4 max-h-[90vh] md:max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-white flex items-center">
                  <Trophy className="w-5 h-5 md:w-6 md:h-6 mr-2 text-yellow-500" />
                  Achievements
                </h2>
                <button
                  onClick={() => setShowAchievements(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement) => {
                  const isUnlocked = simulatorState.achievements.includes(achievement.id);
                  return (
                    <div
                      key={achievement.id}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        isUnlocked
                          ? 'border-yellow-500 bg-yellow-500/10'
                          : 'border-gray-600 bg-gray-800/50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${
                          isUnlocked ? 'bg-yellow-500 text-white' : 'bg-gray-600 text-gray-400'
                        }`}>
                          {achievement.icon}
                        </div>
                        <div>
                          <h3 className={`font-semibold ${
                            isUnlocked ? 'text-yellow-400' : 'text-gray-400'
                          }`}>
                            {achievement.name}
                          </h3>
                          <p className="text-sm text-gray-300">{achievement.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Settings Modal */}
        {showSettings && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 md:p-4">
            <div className="bg-gray-900 rounded-xl p-4 md:p-6 max-w-md w-full mx-2 md:mx-4">
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-white flex items-center">
                  <Settings className="w-5 h-5 md:w-6 md:h-6 mr-2" />
                  Settings
                </h2>
                <button
                  onClick={() => setShowSettings(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Sound Effects
                  </label>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm text-gray-400">Enable sound effects</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Notifications
                  </label>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm text-gray-400">Enable notifications</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Auto-save Progress
                  </label>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm text-gray-400">Automatically save progress</span>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-700">
                  <button
                    onClick={resetSimulator}
                    className="w-full bg-red-500/20 text-red-400 py-2 rounded-lg hover:bg-red-500/30 transition-colors flex items-center justify-center"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset All Progress
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StackSimulatorPage;
