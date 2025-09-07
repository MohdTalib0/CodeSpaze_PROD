import React, { useState, useEffect } from 'react';
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
  Filter,
  Loader2,
  XCircle
} from 'lucide-react';
import Button from '../../components/UI/Button';
import apiService from '../../services/api';

interface AdminStats {
  totals: {
    users: number;
    programs: number;
    projects: number;
    enrollments: number;
  };
  recentActivity: {
    users: Array<{
      id: number;
      name: string;
      email: string;
      created_at: string;
    }>;
    projects: Array<{
      id: number;
      title: string;
      status: string;
      user_name: string;
      program_title: string;
    }>;
  };
  programStats: Array<{
    title: string;
    enrollment_count: number;
  }>;
  projectStatusStats: Array<{
    status: string;
    count: number;
  }>;
}

interface EnrollmentData {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  linkedin_url?: string;
  github_url?: string;
  resume_url: string;
  school: string;
  degree: string;
  field_of_study: string;
  graduation_year: string;
  current_year: string;
  technologies: string;
  selected_program: string;
  created_at: string;
  program_title?: string;
  program_id?: number;
}

interface EnrollmentResponse {
  enrollments: EnrollmentData[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
  stats: {
    total_enrollments: number;
    recent_enrollments: number;
    monthly_enrollments: number;
  };
  enrollments_by_program: Array<{
    program_name: string;
    count: number;
  }>;
  enrollments_by_year: Array<{
    graduation_year: string;
    count: number;
  }>;
}

const AdminDashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [adminStats, setAdminStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Enrollment data state
  const [enrollmentData, setEnrollmentData] = useState<EnrollmentResponse | null>(null);
  const [enrollmentLoading, setEnrollmentLoading] = useState(false);
  const [enrollmentError, setEnrollmentError] = useState<string | null>(null);
  const [enrollmentPage, setEnrollmentPage] = useState(1);
  const [enrollmentFilters, setEnrollmentFilters] = useState({
    search: '',
    program: '',
    status: ''
  });
  
  // Modal states
  const [selectedEnrollment, setSelectedEnrollment] = useState<EnrollmentData | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // Fetch admin dashboard data
  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        setLoading(true);
        const response = await apiService.get('/admin/dashboard') as { data: AdminStats };
        setAdminStats(response.data);
      } catch (err: any) {
        console.error('Failed to fetch admin data:', err);
        setError(err.response?.data?.error || 'Failed to load admin data');
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  // Fetch enrollment data
  const fetchEnrollmentData = async (page = 1, filters = enrollmentFilters) => {
    try {
      setEnrollmentLoading(true);
      setEnrollmentError(null);
      
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '20'
      });
      
      if (filters.search) params.append('search', filters.search);
      if (filters.program) params.append('program', filters.program);
      if (filters.status) params.append('status', filters.status);
      
      const response = await apiService.get(`/admin/enrollments?${params.toString()}`) as { data: EnrollmentResponse };
      console.log('📊 Enrollment API response:', response.data);
      setEnrollmentData(response.data);
      setEnrollmentPage(page);
    } catch (err: any) {
      console.error('Failed to fetch enrollment data:', err);
      setEnrollmentError(err.response?.data?.error || 'Failed to load enrollment data');
    } finally {
      setEnrollmentLoading(false);
    }
  };

  // Load enrollment data when enrollments tab is active
  useEffect(() => {
    if (activeTab === 'enrollments' && !enrollmentData) {
      fetchEnrollmentData();
    }
  }, [activeTab]);

  // Action button handlers
  const handleViewEnrollment = (enrollment: EnrollmentData) => {
    setSelectedEnrollment(enrollment);
    setShowViewModal(true);
  };

  const handleEditEnrollment = (enrollment: EnrollmentData) => {
    setSelectedEnrollment(enrollment);
    setShowEditModal(true);
  };

  const handleDownloadResume = (resumeUrl: string) => {
    if (resumeUrl) {
      // Check if it's a full URL or just a filename
      if (resumeUrl.startsWith('http://') || resumeUrl.startsWith('https://')) {
        // It's a full URL, open it directly
        console.log('Opening full URL:', resumeUrl);
        window.open(resumeUrl, '_blank');
      } else {
        // It's just a filename, construct the full URL
        const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
        const fullUrl = `${baseUrl}/uploads/resumes/${resumeUrl}`;
        console.log('Opening constructed URL:', fullUrl);
        window.open(fullUrl, '_blank');
      }
    }
  };

  const closeModals = () => {
    setShowViewModal(false);
    setShowEditModal(false);
    setSelectedEnrollment(null);
  };

  const quickActions = [
    { title: 'Manage Programs', icon: BookOpen, action: 'programs', color: 'primary' },
    { title: 'Manage Users', icon: Users, action: 'users', color: 'secondary' },
    { title: 'View Projects', icon: BarChart3, action: 'projects', color: 'outline' },
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

  // Loading state
  if (loading) {
    return (
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="flex flex-col items-center space-y-4">
              <Loader2 className="w-8 h-8 animate-spin text-[#19c973]" />
              <div className="text-white text-lg">Loading admin dashboard...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <div className="text-white text-lg mb-2">Failed to load admin data</div>
              <div className="text-gray-400 mb-4">{error}</div>
              <Button 
                onClick={() => window.location.reload()} 
                variant="primary"
              >
                Retry
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // No data state
  if (!adminStats) {
    return (
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="text-white text-lg">No data available</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
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

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex space-x-1 bg-gray-800/50 p-1 rounded-lg w-fit">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'enrollments', label: 'Enrollments', icon: Users },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp },
              { id: 'settings', label: 'Settings', icon: Settings }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-[#19c973] text-white shadow-lg'
                      : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <>
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
            <div className="text-2xl font-bold text-white">{adminStats.totals.users.toLocaleString()}</div>
            <div className="text-sm text-gray-400">Total Users</div>
          </div>
          
          <div className="glass-card p-4 rounded-xl text-center">
            <BookOpen className="w-8 h-8 text-[#19c973] mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{adminStats.totals.programs}</div>
            <div className="text-sm text-gray-400">Active Programs</div>
          </div>
          
          <div className="glass-card p-4 rounded-xl text-center">
            <BarChart3 className="w-8 h-8 text-[#19c973] mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{adminStats.totals.projects}</div>
            <div className="text-sm text-gray-400">Total Projects</div>
          </div>
          
          <div className="glass-card p-4 rounded-xl text-center">
            <TrendingUp className="w-8 h-8 text-[#19c973] mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{adminStats.totals.enrollments}</div>
            <div className="text-sm text-gray-400">Total Enrollments</div>
          </div>
          
          <div className="glass-card p-4 rounded-xl text-center">
            <CheckCircle className="w-8 h-8 text-[#19c973] mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">
              {adminStats.projectStatusStats.find(s => s.status === 'completed')?.count || 0}
            </div>
            <div className="text-sm text-gray-400">Completed Projects</div>
          </div>
          
          <div className="glass-card p-4 rounded-xl text-center">
            <Clock className="w-8 h-8 text-[#19c973] mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">
              {adminStats.projectStatusStats.find(s => s.status === 'in_progress')?.count || 0}
            </div>
            <div className="text-sm text-gray-400">In Progress</div>
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
                {adminStats.recentActivity.users.map((user) => {
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
                          <div className="text-xs text-gray-500">
                            Joined: {new Date(user.created_at).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center text-green-500">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          <span className="text-sm">Active</span>
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
                {adminStats.recentActivity.projects.map((project, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 border border-white/10 rounded-lg hover:bg-white/5 transition-colors">
                    <div className="w-8 h-8 bg-primary-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <BarChart3 className="w-4 h-4 text-primary-500" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-white">{project.title}</div>
                      <div className="text-xs text-gray-400">by {project.user_name}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        Status: <span className={`capitalize ${getStatusColor(project.status)}`}>{project.status}</span>
                      </div>
                      <div className="text-xs text-gray-500">Program: {project.program_title}</div>
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
          </>
        )}

        {/* Enrollments Tab */}
        {activeTab === 'enrollments' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="glass-card p-6 rounded-xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-white">Enrollment Submissions</h2>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                  <Button variant="primary" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Enrollment
                  </Button>
                </div>
              </div>

              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Search</label>
                  <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={enrollmentFilters.search}
                    onChange={(e) => setEnrollmentFilters(prev => ({ ...prev, search: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#19c973]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Program</label>
                  <select
                    value={enrollmentFilters.program}
                    onChange={(e) => setEnrollmentFilters(prev => ({ ...prev, program: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#19c973]"
                  >
                    <option value="">All Programs</option>
                    {enrollmentData?.enrollments_by_program.map((program) => (
                      <option key={program.program_name} value={program.program_name}>
                        {program.program_name} ({program.count})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-end">
                  <Button 
                    onClick={() => fetchEnrollmentData(1, enrollmentFilters)}
                    variant="primary"
                    className="w-full"
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Apply Filters
                  </Button>
                </div>
              </div>

              {/* Enrollment Statistics */}
              {enrollmentData?.stats && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-white">{enrollmentData.stats.total_enrollments}</div>
                    <div className="text-sm text-gray-400">Total Enrollments</div>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-white">{enrollmentData.stats.recent_enrollments}</div>
                    <div className="text-sm text-gray-400">This Week</div>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-white">{enrollmentData.stats.monthly_enrollments}</div>
                    <div className="text-sm text-gray-400">This Month</div>
                  </div>
                </div>
              )}

              {/* Loading State */}
              {enrollmentLoading && (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin text-[#19c973]" />
                  <span className="ml-2 text-white">Loading enrollments...</span>
                </div>
              )}

              {/* Error State */}
              {enrollmentError && (
                <div className="text-center py-8">
                  <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                  <div className="text-white text-lg mb-2">Failed to load enrollments</div>
                  <div className="text-gray-400 mb-4">{enrollmentError}</div>
                  <Button onClick={() => fetchEnrollmentData()} variant="primary">
                    Retry
                  </Button>
                </div>
              )}

              {/* Debug Info */}
              {process.env.NODE_ENV === 'development' && (
                <div className="mb-4 p-4 bg-gray-800 rounded-lg">
                  <h4 className="text-white font-bold mb-2">Debug Info:</h4>
                  <div className="text-sm text-gray-300">
                    <div>Loading: {enrollmentLoading ? 'true' : 'false'}</div>
                    <div>Error: {enrollmentError || 'none'}</div>
                    <div>Data exists: {enrollmentData ? 'true' : 'false'}</div>
                    <div>Enrollments count: {enrollmentData?.enrollments?.length || 0}</div>
                  </div>
                </div>
              )}

              {/* Enrollment List */}
              {!enrollmentLoading && !enrollmentError && enrollmentData && (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-700">
                          <th className="text-left py-3 px-4 text-gray-300 font-medium">Name</th>
                          <th className="text-left py-3 px-4 text-gray-300 font-medium">Email</th>
                          <th className="text-left py-3 px-4 text-gray-300 font-medium">Program</th>
                          <th className="text-left py-3 px-4 text-gray-300 font-medium">School</th>
                          <th className="text-left py-3 px-4 text-gray-300 font-medium">Graduation Year</th>
                          <th className="text-left py-3 px-4 text-gray-300 font-medium">Applied</th>
                          <th className="text-left py-3 px-4 text-gray-300 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {enrollmentData.enrollments.map((enrollment) => (
                          <tr key={enrollment.id} className="border-b border-gray-800 hover:bg-gray-800/30">
                            <td className="py-3 px-4">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-gradient-to-r from-[#19c973] to-[#16a362] rounded-full flex items-center justify-center">
                                  <span className="text-white font-bold text-xs">
                                    {enrollment.first_name.charAt(0).toUpperCase()}
                                  </span>
                                </div>
                                <div>
                                  <div className="font-medium text-white">
                                    {enrollment.first_name} {enrollment.last_name}
                                  </div>
                                  <div className="text-xs text-gray-400">{enrollment.phone}</div>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-gray-300">{enrollment.email}</td>
                            <td className="py-3 px-4">
                              <span className="px-2 py-1 bg-[#19c973]/20 text-[#19c973] rounded-full text-xs">
                                {enrollment.selected_program}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-gray-300">{enrollment.school}</td>
                            <td className="py-3 px-4 text-gray-300">{enrollment.graduation_year}</td>
                            <td className="py-3 px-4 text-gray-300">
                              {new Date(enrollment.created_at).toLocaleDateString()}
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex space-x-2">
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleViewEnrollment(enrollment)}
                                >
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleEditEnrollment(enrollment)}
                                >
                                  <Edit className="w-4 h-4" />
                                </Button>
                                {enrollment.resume_url && (
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => handleDownloadResume(enrollment.resume_url)}
                                  >
                                    <Download className="w-4 h-4" />
                                  </Button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* No enrollments message */}
                  {enrollmentData.enrollments.length === 0 && (
                    <div className="text-center py-8">
                      <Users className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                      <div className="text-white text-lg mb-2">No enrollments found</div>
                      <div className="text-gray-400">No enrollment submissions match your current filters.</div>
                    </div>
                  )}

                  {/* Pagination */}
                  {enrollmentData.pagination.pages > 1 && (
                    <div className="flex justify-between items-center mt-6">
                      <div className="text-sm text-gray-400">
                        Showing {((enrollmentData.pagination.page - 1) * enrollmentData.pagination.limit) + 1} to{' '}
                        {Math.min(enrollmentData.pagination.page * enrollmentData.pagination.limit, enrollmentData.pagination.total)} of{' '}
                        {enrollmentData.pagination.total} results
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={enrollmentData.pagination.page === 1}
                          onClick={() => fetchEnrollmentData(enrollmentData.pagination.page - 1)}
                        >
                          Previous
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={enrollmentData.pagination.page === enrollmentData.pagination.pages}
                          onClick={() => fetchEnrollmentData(enrollmentData.pagination.page + 1)}
                        >
                          Next
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="glass-card p-6 rounded-xl text-center">
              <BarChart3 className="w-16 h-16 text-[#19c973] mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Analytics Dashboard</h2>
              <p className="text-gray-400">Advanced analytics and reporting features coming soon.</p>
            </div>
          </motion.div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="glass-card p-6 rounded-xl text-center">
              <Settings className="w-16 h-16 text-[#19c973] mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Platform Settings</h2>
              <p className="text-gray-400">Platform configuration and settings coming soon.</p>
            </div>
          </motion.div>
        )}

        {/* View Enrollment Modal */}
        {showViewModal && selectedEnrollment && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 border border-gray-700 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
              <div className="flex items-center justify-between p-6 border-b border-gray-700">
                <h3 className="text-xl font-semibold text-white">Enrollment Details</h3>
                <button
                  onClick={closeModals}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-white"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">Personal Information</h4>
                    <div>
                      <label className="text-sm text-gray-400">Full Name</label>
                      <div className="text-white">{selectedEnrollment.first_name} {selectedEnrollment.last_name}</div>
                    </div>
                    <div>
                      <label className="text-sm text-gray-400">Email</label>
                      <div className="text-white">{selectedEnrollment.email}</div>
                    </div>
                    <div>
                      <label className="text-sm text-gray-400">Phone</label>
                      <div className="text-white">{selectedEnrollment.phone}</div>
                    </div>
                    <div>
                      <label className="text-sm text-gray-400">Address</label>
                      <div className="text-white">{selectedEnrollment.address}</div>
                    </div>
                    <div>
                      <label className="text-sm text-gray-400">City, State, Country</label>
                      <div className="text-white">{selectedEnrollment.city}, {selectedEnrollment.state}, {selectedEnrollment.country}</div>
                    </div>
                  </div>

                  {/* Educational Information */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">Educational Information</h4>
                    <div>
                      <label className="text-sm text-gray-400">School/University</label>
                      <div className="text-white">{selectedEnrollment.school}</div>
                    </div>
                    <div>
                      <label className="text-sm text-gray-400">Degree</label>
                      <div className="text-white">{selectedEnrollment.degree}</div>
                    </div>
                    <div>
                      <label className="text-sm text-gray-400">Field of Study</label>
                      <div className="text-white">{selectedEnrollment.field_of_study}</div>
                    </div>
                    <div>
                      <label className="text-sm text-gray-400">Graduation Year</label>
                      <div className="text-white">{selectedEnrollment.graduation_year}</div>
                    </div>
                    <div>
                      <label className="text-sm text-gray-400">Current Year</label>
                      <div className="text-white">{selectedEnrollment.current_year}</div>
                    </div>
                  </div>

                  {/* Program & Links */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">Program & Links</h4>
                    <div>
                      <label className="text-sm text-gray-400">Selected Program</label>
                      <div className="text-white">{selectedEnrollment.selected_program}</div>
                    </div>
                    {selectedEnrollment.linkedin_url && (
                      <div>
                        <label className="text-sm text-gray-400">LinkedIn</label>
                        <div className="text-white">
                          <a href={selectedEnrollment.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-[#19c973] hover:underline">
                            {selectedEnrollment.linkedin_url}
                          </a>
                        </div>
                      </div>
                    )}
                    {selectedEnrollment.github_url && (
                      <div>
                        <label className="text-sm text-gray-400">GitHub</label>
                        <div className="text-white">
                          <a href={selectedEnrollment.github_url} target="_blank" rel="noopener noreferrer" className="text-[#19c973] hover:underline">
                            {selectedEnrollment.github_url}
                          </a>
                        </div>
                      </div>
                    )}
                    {selectedEnrollment.resume_url && (
                      <div>
                        <label className="text-sm text-gray-400">Resume URL</label>
                        <div className="text-white">
                          <a href={selectedEnrollment.resume_url} target="_blank" rel="noopener noreferrer" className="text-[#19c973] hover:underline">
                            {selectedEnrollment.resume_url}
                          </a>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Technologies */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">Technologies</h4>
                    <div>
                      <label className="text-sm text-gray-400">Technologies</label>
                      <div className="text-white">{selectedEnrollment.technologies}</div>
                    </div>
                    <div>
                      <label className="text-sm text-gray-400">Applied Date</label>
                      <div className="text-white">{new Date(selectedEnrollment.created_at).toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 p-6 border-t border-gray-700">
                <Button variant="outline" onClick={closeModals}>
                  Close
                </Button>
                <Button variant="primary" onClick={() => handleEditEnrollment(selectedEnrollment)}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Enrollment
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Enrollment Modal */}
        {showEditModal && selectedEnrollment && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 border border-gray-700 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
              <div className="flex items-center justify-between p-6 border-b border-gray-700">
                <h3 className="text-xl font-semibold text-white">Edit Enrollment</h3>
                <button
                  onClick={closeModals}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-white"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6">
                <div className="text-center py-8">
                  <Edit className="w-16 h-16 text-[#19c973] mx-auto mb-4" />
                  <h4 className="text-xl font-bold text-white mb-2">Edit Enrollment</h4>
                  <p className="text-gray-400 mb-4">Edit functionality coming soon.</p>
                  <p className="text-sm text-gray-500">
                    Enrollment ID: {selectedEnrollment.id} | 
                    Student: {selectedEnrollment.first_name} {selectedEnrollment.last_name}
                  </p>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 p-6 border-t border-gray-700">
                <Button variant="outline" onClick={closeModals}>
                  Close
                </Button>
                <Button variant="primary" disabled>
                  <Edit className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardPage;
