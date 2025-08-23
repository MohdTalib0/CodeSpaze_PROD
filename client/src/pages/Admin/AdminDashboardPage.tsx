import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  DollarSign, 
  AlertCircle,
  CheckCircle,
  Clock,
  BarChart3,
  Settings,
  Plus,
  Eye,
  Edit,
  Trash2,
  Download,
  Filter
} from 'lucide-react';
import Button from '../../components/UI/Button';

const AdminDashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data - in real app this would come from API
  const platformStats = {
    totalUsers: 12450,
    activeUsers: 8920,
    totalCourses: 45,
    totalRevenue: 1250000,
    monthlyGrowth: 12.5,
    completionRate: 78.3
  };

  const recentUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active', joinDate: '2024-12-01', program: 'AI/ML Internship' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'active', joinDate: '2024-11-30', program: 'Full-Stack Fellowship' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', status: 'pending', joinDate: '2024-11-29', program: 'Data Science Bootcamp' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', status: 'active', joinDate: '2024-11-28', program: 'Cybersecurity Certification' }
  ];

  const recentActivities = [
    { action: 'New user registered', user: 'John Doe', time: '2 hours ago', type: 'user' },
    { action: 'Course completed', user: 'Jane Smith', time: '4 hours ago', type: 'course' },
    { action: 'Payment received', user: 'Mike Johnson', time: '6 hours ago', type: 'payment' },
    { action: 'Support ticket opened', user: 'Sarah Wilson', time: '8 hours ago', type: 'support' }
  ];

  const quickActions = [
    { title: 'Add New Course', icon: Plus, action: 'course', color: 'primary' },
    { title: 'Manage Users', icon: Users, action: 'users', color: 'secondary' },
    { title: 'View Analytics', icon: BarChart3, action: 'analytics', color: 'outline' },
    { title: 'Platform Settings', icon: Settings, action: 'settings', color: 'ghost' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-500';
      case 'pending': return 'text-yellow-500';
      case 'inactive': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return CheckCircle;
      case 'pending': return Clock;
      case 'inactive': return AlertCircle;
      default: return Clock;
    }
  };

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Admin <span className="gradient-text">Dashboard</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl">
            Manage programs, users, and platform analytics.
          </p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {quickActions.map((action, index) => (
            <button
              key={index}
              className="glass-card p-4 rounded-xl text-center hover:bg-white/5 transition-colors"
            >
              <action.icon className={`w-8 h-8 mx-auto mb-2 text-${action.color}-500`} />
              <div className="text-sm font-medium text-white">{action.title}</div>
            </button>
          ))}
        </motion.div>

        {/* Platform Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8"
        >
          <div className="glass-card p-4 rounded-xl text-center">
            <Users className="w-8 h-8 text-[#19c973] mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{platformStats.totalUsers.toLocaleString()}</div>
            <div className="text-sm text-gray-400">Total Users</div>
          </div>
          
          <div className="glass-card p-4 rounded-xl text-center">
            <TrendingUp className="w-8 h-8 text-[#19c973] mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{platformStats.activeUsers.toLocaleString()}</div>
            <div className="text-sm text-gray-400">Active Users</div>
          </div>
          
          <div className="glass-card p-4 rounded-xl text-center">
            <BookOpen className="w-8 h-8 text-[#19c973] mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{platformStats.totalCourses}</div>
            <div className="text-sm text-gray-400">Total Courses</div>
          </div>
          
          <div className="glass-card p-4 rounded-xl text-center">
            <DollarSign className="w-8 h-8 text-[#19c973] mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">₹{(platformStats.totalRevenue / 100000).toFixed(1)}L</div>
            <div className="text-sm text-gray-400">Total Revenue</div>
          </div>
          
          <div className="glass-card p-4 rounded-xl text-center">
            <BarChart3 className="w-8 h-8 text-[#19c973] mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">+{platformStats.monthlyGrowth}%</div>
            <div className="text-sm text-gray-400">Monthly Growth</div>
          </div>
          
          <div className="glass-card p-4 rounded-xl text-center">
            <CheckCircle className="w-8 h-8 text-[#19c973] mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{platformStats.completionRate}%</div>
            <div className="text-sm text-gray-400">Completion Rate</div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Users */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="glass-card p-6 rounded-xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-white">Recent Users</h2>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
              
              <div className="space-y-4">
                {recentUsers.map((user) => {
                  const StatusIcon = getStatusIcon(user.status);
                  return (
                    <div key={user.id} className="flex items-center justify-between p-3 border border-white/10 rounded-lg hover:bg-white/5 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-[#19c973] to-[#16a362] rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">
                            {user.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-white">{user.name}</div>
                          <div className="text-sm text-gray-400">{user.email}</div>
                          <div className="text-xs text-gray-500">{user.program}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <div className={`flex items-center ${getStatusColor(user.status)}`}>
                          <StatusIcon className="w-4 h-4 mr-1" />
                          <span className="text-sm capitalize">{user.status}</span>
                        </div>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-6 text-center">
                <Button variant="outline" size="sm">
                  View All Users
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Recent Activities */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <div className="glass-card p-6 rounded-xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-white">Recent Activities</h2>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
              
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 border border-white/10 rounded-lg hover:bg-white/5 transition-colors">
                    <div className="w-8 h-8 bg-primary-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="w-4 h-4 text-primary-500" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-white">{activity.action}</div>
                      <div className="text-xs text-gray-400">by {activity.user}</div>
                      <div className="text-xs text-gray-500 mt-1">{activity.time}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <Button variant="outline" size="sm">
                  View All Activities
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quick Management */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-8"
        >
          <div className="glass-card p-8 rounded-2xl text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Platform Management
            </h2>
            <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto">
              Manage courses, users, and platform settings to ensure smooth operation and growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg">
                <Plus className="w-5 h-5 mr-2" />
                Add New Course
              </Button>
              <Button variant="outline" size="lg">
                <Users className="w-5 h-5 mr-2" />
                Manage Users
              </Button>
              <Button variant="outline" size="lg">
                <Settings className="w-5 h-5 mr-2" />
                Platform Settings
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
