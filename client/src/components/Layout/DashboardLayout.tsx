import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, Bell, Search, User } from 'lucide-react';
import Sidebar from './Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true); // Start with sidebar open on desktop
  const { user, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, loading, navigate]);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#19c973]/20 border-t-[#19c973] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-black flex">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navigation Bar */}
        <header className="bg-black border-b border-[#19c973]/20 px-4 py-3 lg:px-6">
          <div className="flex items-center justify-between">
            {/* Left side - Mobile menu button and breadcrumb */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-[#19c973]/10"
              >
                <Menu className="w-5 h-5" />
              </button>
              
              {/* Breadcrumb */}
              <div className="hidden sm:block">
                <nav className="flex" aria-label="Breadcrumb">
                  <ol className="flex items-center space-x-2">
                    <li>
                      <span className="text-gray-400 text-sm">Dashboard</span>
                    </li>
                    {location.pathname !== '/dashboard' && (
                      <>
                        <li>
                          <span className="text-gray-600 mx-2">/</span>
                        </li>
                        <li>
                          <span className="text-white text-sm capitalize">
                            {location.pathname.split('/').pop()?.replace('-', ' ')}
                          </span>
                        </li>
                      </>
                    )}
                  </ol>
                </nav>
              </div>
            </div>

            {/* Right side - Search, notifications, user menu */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="hidden md:block relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-64 pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#19c973] transition-colors"
                />
              </div>

              {/* Notifications */}
              <button className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-[#19c973]/10 relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* User Menu */}
              <div className="flex items-center space-x-3">
                <div className="hidden sm:block text-right">
                  <p className="text-white text-sm font-medium">{user?.name || 'User'}</p>
                  <p className="text-gray-400 text-xs">{user?.email || 'user@example.com'}</p>
                </div>
                <div className="w-8 h-8 bg-gradient-to-r from-[#19c973] to-[#16a362] rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
