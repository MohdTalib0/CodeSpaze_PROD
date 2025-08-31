import React, { useState } from 'react';
import { 
  BarChart3, 
  CheckCircle, 
  X, 
  Plus,
  Clock,
  AlertTriangle,
  User,
  Calendar,
  Tag,
  MessageSquare,
  Paperclip,
  Eye
} from 'lucide-react';

interface JiraBoardModalProps {
  onClose: () => void;
  onTaskComplete: () => void;
}

interface JiraTask {
  id: string;
  title: string;
  description: string;
  type: 'story' | 'bug' | 'task' | 'epic';
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'to-do' | 'in-progress' | 'in-review' | 'done';
  assignee: string;
  reporter: string;
  created: string;
  updated: string;
  storyPoints?: number;
  labels: string[];
  comments: string[];
  attachments: number;
}

const JiraBoardModal: React.FC<JiraBoardModalProps> = ({ onClose, onTaskComplete }) => {
  const [selectedTask, setSelectedTask] = useState<JiraTask | null>(null);
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    type: 'story' as const,
    priority: 'medium' as const,
    assignee: '',
    storyPoints: 3
  });

  const [tasks, setTasks] = useState<JiraTask[]>([
    {
      id: 'PROJ-101',
      title: 'Implement user authentication',
      description: 'Create login, register, and password reset functionality with JWT tokens',
      type: 'story',
      priority: 'high',
      status: 'in-progress',
      assignee: 'John Developer',
      reporter: 'Product Manager',
      created: '2024-01-15',
      updated: '2024-01-20',
      storyPoints: 8,
      labels: ['frontend', 'auth', 'security'],
      comments: ['Started working on the login form', 'Need to add password validation'],
      attachments: 2
    },
    {
      id: 'PROJ-102',
      title: 'Fix login button not responding',
      description: 'Users report that the login button is not clickable on mobile devices',
      type: 'bug',
      priority: 'critical',
      status: 'to-do',
      assignee: 'Sarah QA',
      reporter: 'Customer Support',
      created: '2024-01-19',
      updated: '2024-01-19',
      labels: ['bug', 'mobile', 'frontend'],
      comments: ['Reproduced on iPhone 12', 'Also affects Android devices'],
      attachments: 3
    },
    {
      id: 'PROJ-103',
      title: 'Add unit tests for auth service',
      description: 'Increase test coverage for authentication service to 90%',
      type: 'task',
      priority: 'medium',
      status: 'to-do',
      assignee: 'Mike Tester',
      reporter: 'Tech Lead',
      created: '2024-01-18',
      updated: '2024-01-18',
      storyPoints: 5,
      labels: ['testing', 'backend', 'coverage'],
      comments: ['Current coverage is 65%'],
      attachments: 1
    },
    {
      id: 'PROJ-104',
      title: 'Design system implementation',
      description: 'Create and implement a comprehensive design system for the application',
      type: 'epic',
      priority: 'high',
      status: 'in-progress',
      assignee: 'Lisa Designer',
      reporter: 'Product Manager',
      created: '2024-01-10',
      updated: '2024-01-20',
      storyPoints: 13,
      labels: ['design', 'frontend', 'ui/ux'],
      comments: ['Completed color palette', 'Working on component library'],
      attachments: 5
    }
  ]);

  const columns = [
    { id: 'to-do', title: 'To Do', color: 'bg-gray-100' },
    { id: 'in-progress', title: 'In Progress', color: 'bg-blue-100' },
    { id: 'in-review', title: 'In Review', color: 'bg-yellow-100' },
    { id: 'done', title: 'Done', color: 'bg-green-100' }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low':
        return 'bg-gray-700 text-gray-300';
      case 'medium':
        return 'bg-blue-900 text-blue-400';
      case 'high':
        return 'bg-orange-900 text-orange-400';
      case 'critical':
        return 'bg-red-900 text-red-400';
      default:
        return 'bg-gray-700 text-gray-300';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'story':
        return <div className="w-3 h-3 bg-blue-500 rounded-full" />;
      case 'bug':
        return <div className="w-3 h-3 bg-red-500 rounded-full" />;
      case 'task':
        return <div className="w-3 h-3 bg-gray-500 rounded-full" />;
      case 'epic':
        return <div className="w-3 h-3 bg-purple-500 rounded-full" />;
      default:
        return <div className="w-3 h-3 bg-gray-500 rounded-full" />;
    }
  };

  const moveTask = (taskId: string, newStatus: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, status: newStatus as any } : task
    ));
  };

  const createTask = () => {
    if (!newTask.title || !newTask.description) return;

    const task: JiraTask = {
      id: `PROJ-${Math.floor(Math.random() * 1000) + 200}`,
      title: newTask.title,
      description: newTask.description,
      type: newTask.type,
      priority: newTask.priority,
      status: 'to-do',
      assignee: newTask.assignee || 'Unassigned',
      reporter: 'Current User',
      created: new Date().toISOString().split('T')[0],
      updated: new Date().toISOString().split('T')[0],
      storyPoints: newTask.storyPoints,
      labels: [],
      comments: [],
      attachments: 0
    };

    setTasks(prev => [...prev, task]);
    setShowCreateTask(false);
    setNewTask({
      title: '',
      description: '',
      type: 'story',
      priority: 'medium',
      assignee: '',
      storyPoints: 3
    });
  };

  const completeTask = (taskId: string) => {
    moveTask(taskId, 'done');
    onTaskComplete();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
      <div className="bg-black border border-gray-800 rounded-xl max-w-7xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-6 h-6 text-blue-500" />
            <h3 className="text-xl font-semibold text-white">Jira Board Simulator</h3>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowCreateTask(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Create Task
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
          {/* Main Board */}
          <div className="flex-1 p-6 overflow-x-auto">
            <div className="flex gap-4 min-w-max">
              {columns.map((column) => (
                <div key={column.id} className="w-80">
                  <div className="bg-gray-900 p-3 rounded-t-lg border border-gray-700">
                    <h4 className="font-semibold text-white">{column.title}</h4>
                    <span className="text-sm text-gray-300">
                      {tasks.filter(task => task.status === column.id).length} tasks
                    </span>
                  </div>
                  
                  <div className="bg-gray-800 border border-gray-700 rounded-b-lg p-3 min-h-[500px]">
                    {tasks
                      .filter(task => task.status === column.id)
                      .map((task) => (
                        <div
                          key={task.id}
                          onClick={() => setSelectedTask(task)}
                          className="bg-gray-900 p-3 rounded-lg border border-gray-600 mb-3 cursor-pointer hover:shadow-md transition-shadow hover:border-gray-500"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              {getTypeIcon(task.type)}
                              <span className="text-sm font-mono text-gray-400">{task.id}</span>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                              {task.priority}
                            </span>
                          </div>
                          
                          <h5 className="font-medium text-white mb-2 line-clamp-2">{task.title}</h5>
                          
                          <div className="flex items-center justify-between text-xs text-gray-400">
                            <div className="flex items-center gap-2">
                              <User className="w-3 h-3" />
                              <span>{task.assignee}</span>
                            </div>
                            {task.storyPoints && (
                              <span className="bg-gray-700 px-2 py-1 rounded text-gray-300">{task.storyPoints} SP</span>
                            )}
                          </div>
                          
                          {task.labels.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {task.labels.slice(0, 2).map((label, index) => (
                                <span key={index} className="bg-gray-700 px-2 py-1 rounded text-xs text-gray-300">
                                  {label}
                                </span>
                              ))}
                              {task.labels.length > 2 && (
                                <span className="text-xs text-gray-500">+{task.labels.length - 2}</span>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel - Task Details */}
          <div className="w-96 border-l border-gray-800 p-6 overflow-y-auto bg-gray-900">
            {selectedTask ? (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-white">Task Details</h4>
                  <button
                    onClick={() => setSelectedTask(null)}
                    className="p-1 hover:bg-gray-800 rounded text-gray-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      {getTypeIcon(selectedTask.type)}
                      <span className="text-sm font-mono text-gray-400">{selectedTask.id}</span>
                    </div>
                    <h5 className="font-semibold text-white">{selectedTask.title}</h5>
                  </div>
                  
                  <div>
                    <h6 className="font-medium text-gray-300 mb-2">Description</h6>
                    <p className="text-sm text-gray-400">{selectedTask.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Priority:</span>
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(selectedTask.priority)}`}>
                        {selectedTask.priority}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400">Status:</span>
                      <span className="ml-2 font-medium text-white">{selectedTask.status}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Assignee:</span>
                      <span className="ml-2 font-medium text-white">{selectedTask.assignee}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Reporter:</span>
                      <span className="ml-2 font-medium text-white">{selectedTask.reporter}</span>
                    </div>
                    {selectedTask.storyPoints && (
                      <div>
                        <span className="text-gray-400">Story Points:</span>
                        <span className="ml-2 font-medium text-white">{selectedTask.storyPoints}</span>
                      </div>
                    )}
                  </div>
                  
                  {selectedTask.labels.length > 0 && (
                    <div>
                      <h6 className="font-medium text-gray-300 mb-2">Labels</h6>
                      <div className="flex flex-wrap gap-1">
                        {selectedTask.labels.map((label, index) => (
                          <span key={index} className="bg-gray-700 px-2 py-1 rounded text-xs text-gray-300">
                            {label}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {selectedTask.comments.length > 0 && (
                    <div>
                      <h6 className="font-medium text-gray-300 mb-2">Comments</h6>
                      <div className="space-y-2">
                        {selectedTask.comments.map((comment, index) => (
                          <div key={index} className="bg-gray-800 p-2 rounded text-sm text-gray-300">
                            {comment}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex gap-2">
                    {selectedTask.status !== 'done' && (
                      <button
                        onClick={() => completeTask(selectedTask.id)}
                        className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Mark Complete
                      </button>
                    )}
                    <button
                      onClick={() => moveTask(selectedTask.id, 
                        selectedTask.status === 'to-do' ? 'in-progress' : 
                        selectedTask.status === 'in-progress' ? 'in-review' : 'done'
                      )}
                      className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Move Forward
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                <BarChart3 className="w-12 h-12 mx-auto mb-3 text-gray-600" />
                <p>Select a task to view details</p>
              </div>
            )}
          </div>
        </div>

        {/* Create Task Modal */}
        {showCreateTask && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
            <div className="bg-black border border-gray-800 rounded-xl p-6 max-w-md w-full mx-4">
              <h4 className="text-lg font-semibold text-white mb-4">Create New Task</h4>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Task title"
                  value={newTask.title}
                  onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full p-2 border border-gray-700 rounded-lg bg-gray-900 text-white placeholder-gray-400"
                />
                <textarea
                  placeholder="Task description"
                  value={newTask.description}
                  onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full p-2 border border-gray-700 rounded-lg resize-none bg-gray-900 text-white placeholder-gray-400"
                  rows={3}
                />
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={newTask.type}
                    onChange={(e) => setNewTask(prev => ({ ...prev, type: e.target.value as any }))}
                    className="p-2 border border-gray-700 rounded-lg bg-gray-900 text-white"
                  >
                    <option value="story">Story</option>
                    <option value="bug">Bug</option>
                    <option value="task">Task</option>
                    <option value="epic">Epic</option>
                  </select>
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask(prev => ({ ...prev, priority: e.target.value as any }))}
                    className="p-2 border border-gray-700 rounded-lg bg-gray-900 text-white"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
                <input
                  type="text"
                  placeholder="Assignee (optional)"
                  value={newTask.assignee}
                  onChange={(e) => setNewTask(prev => ({ ...prev, assignee: e.target.value }))}
                  className="w-full p-2 border border-gray-700 rounded-lg bg-gray-900 text-white placeholder-gray-400"
                />
                <input
                  type="number"
                  placeholder="Story Points"
                  value={newTask.storyPoints}
                  onChange={(e) => setNewTask(prev => ({ ...prev, storyPoints: parseInt(e.target.value) || 0 }))}
                  className="w-full p-2 border border-gray-700 rounded-lg bg-gray-900 text-white placeholder-gray-400"
                />
                <div className="flex gap-2">
                  <button
                    onClick={createTask}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Create Task
                  </button>
                  <button
                    onClick={() => setShowCreateTask(false)}
                    className="flex-1 bg-gray-700 text-gray-300 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Cancel
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

export default JiraBoardModal;
