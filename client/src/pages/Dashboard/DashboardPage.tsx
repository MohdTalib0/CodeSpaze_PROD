import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Clock, 
  Award, 
  TrendingUp, 
  Calendar,
  Play,
  CheckCircle,
  Target,
  BarChart3,
  Users,
  Star,
  ArrowRight
} from 'lucide-react';
import Button from '../../components/UI/Button';

const DashboardPage: React.FC = () => {
  // Mock data - in real app this would come from API
  const userStats = {
    totalCourses: 12,
    completedCourses: 8,
    currentStreak: 15,
    totalHours: 127,
    averageScore: 87,
    certificates: 3
  };

  const currentCourses = [
    {
      title: 'AI/ML Fundamentals',
      progress: 75,
      nextLesson: 'Neural Networks Basics',
      timeSpent: '12h 30m',
      lastAccessed: '2 hours ago'
    },
    {
      title: 'Full-Stack Development',
      progress: 45,
      nextLesson: 'API Integration',
      timeSpent: '8h 15m',
      lastAccessed: '1 day ago'
    },
    {
      title: 'Data Structures & Algorithms',
      progress: 90,
      nextLesson: 'Advanced Sorting',
      timeSpent: '15h 45m',
      lastAccessed: '3 hours ago'
    }
  ];

  const recentAchievements = [
    {
      title: 'First Course Completed',
      description: 'Completed Introduction to Programming',
      date: '2 days ago',
      icon: Award
    },
    {
      title: '7-Day Streak',
      description: 'Maintained learning streak for 7 days',
      date: '1 week ago',
      icon: TrendingUp
    },
    {
      title: 'Perfect Score',
      description: 'Scored 100% on JavaScript Basics Quiz',
      date: '3 days ago',
      icon: Star
    }
  ];

  const upcomingDeadlines = [
    {
      title: 'AI/ML Project Submission',
      course: 'AI/ML Fundamentals',
      dueDate: 'Dec 15, 2024',
      priority: 'high'
    },
    {
      title: 'Code Review Assignment',
      course: 'Full-Stack Development',
      dueDate: 'Dec 18, 2024',
      priority: 'medium'
    },
    {
      title: 'Final Exam',
      course: 'Data Structures & Algorithms',
      dueDate: 'Dec 20, 2024',
      priority: 'high'
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Welcome back, <span className="gradient-text">Learner!</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl">
            Continue your learning journey from where you left off.
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12"
        >
          <div className="glass-card p-4 rounded-xl text-center">
            <BookOpen className="w-8 h-8 text-[#19c973] mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{userStats.totalCourses}</div>
            <div className="text-sm text-gray-400">Total Courses</div>
          </div>
          
          <div className="glass-card p-4 rounded-xl text-center">
            <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{userStats.completedCourses}</div>
            <div className="text-sm text-gray-400">Completed</div>
          </div>
          
          <div className="glass-card p-4 rounded-xl text-center">
            <TrendingUp className="w-8 h-8 text-[#19c973] mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{userStats.currentStreak}</div>
            <div className="text-sm text-gray-400">Day Streak</div>
          </div>
          
          <div className="glass-card p-4 rounded-xl text-center">
            <Clock className="w-8 h-8 text-[#19c973] mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{userStats.totalHours}h</div>
            <div className="text-sm text-gray-400">Total Hours</div>
          </div>
          
          <div className="glass-card p-4 rounded-xl text-center">
            <Target className="w-8 h-8 text-[#19c973] mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{userStats.averageScore}%</div>
            <div className="text-sm text-gray-400">Avg Score</div>
          </div>
          
          <div className="glass-card p-4 rounded-xl text-center">
            <Award className="w-8 h-8 text-[#19c973] mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{userStats.certificates}</div>
            <div className="text-sm text-gray-400">Certificates</div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Current Courses */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="glass-card p-6 rounded-xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-white">Continue Learning</h2>
                <Link to="/programs">
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </Link>
              </div>
              
              <div className="space-y-4">
                {currentCourses.map((course, index) => (
                  <div key={index} className="border border-white/10 rounded-lg p-4 hover:bg-white/5 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-medium text-white">{course.title}</h3>
                      <span className="text-sm text-primary-500">{course.progress}%</span>
                    </div>
                    
                    <div className="mb-3">
                      <div className="w-full bg-dark-800 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-[#19c973] to-[#16a362] h-2 rounded-full transition-all duration-300"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center text-sm text-gray-400">
                      <span>Next: {course.nextLesson}</span>
                      <span>{course.timeSpent}</span>
                    </div>
                    
                    <div className="mt-3 flex justify-between items-center">
                      <span className="text-xs text-gray-500">Last accessed: {course.lastAccessed}</span>
                      <Button variant="primary" size="sm">
                        <Play className="w-4 h-4 mr-2" />
                        Continue
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="space-y-6"
          >
            {/* Recent Achievements */}
            <div className="glass-card p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-4">Recent Achievements</h3>
              <div className="space-y-3">
                {recentAchievements.map((achievement, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-primary-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <achievement.icon className="w-4 h-4 text-primary-500" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-white">{achievement.title}</div>
                      <div className="text-xs text-gray-400">{achievement.description}</div>
                      <div className="text-xs text-gray-500 mt-1">{achievement.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Deadlines */}
            <div className="glass-card p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-4">Upcoming Deadlines</h3>
              <div className="space-y-3">
                {upcomingDeadlines.map((deadline, index) => (
                  <div key={index} className="border-l-2 border-primary-500 pl-3">
                    <div className="text-sm font-medium text-white">{deadline.title}</div>
                    <div className="text-xs text-gray-400">{deadline.course}</div>
                    <div className="text-xs text-gray-500 mt-1">{deadline.dueDate}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-12"
        >
          <div className="glass-card p-8 rounded-2xl text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Ready for Your Next Challenge?
            </h2>
            <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto">
              Explore new courses, join study groups, or take on advanced projects to accelerate your learning.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/programs">
                <Button variant="primary" size="lg">
                  Explore New Courses
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/products">
                <Button variant="outline" size="lg">
                  View Learning Tools
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;
