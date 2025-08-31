import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  BookOpen, 
  Users, 
  Settings, 
  LogOut, 
  ChevronLeft, 
  ChevronRight,
  User,
  Award,
  Calendar,
  FileText,
  MessageCircle,
  HelpCircle,
  Bell,
  Search,
  Menu,
  X,
  GitBranch
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navigationItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: Home,
      description: 'Overview and stats'
    },
    {
      name: 'AI Resume Builder',
      href: '/ai-resume-builder',
      icon: FileText,
      description: 'Build AI-powered resumes & portfolios'
    },
    {
      name: 'Stack Simulator',
      href: '/stack-simulator',
      icon: GitBranch,
      description: 'Virtual tech company experience'
    },
    {
   
      name: 'Messages',
      href: '/messages',
      icon: MessageCircle,
      description: 'Inbox and chats'
    },
    {
      name: 'Support',
      href: '/support',
      icon: HelpCircle,
      description: 'Help and resources'
    }
  ];

  const bottomNavigationItems = [
    {
      name: 'Profile',
      href: '/profile',
      icon: User,
      description: 'Account settings'
    },
    {
      name: 'Settings',
      href: '/settings',
      icon: Settings,
      description: 'Preferences'
    }
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (href: string) => {
    return location.pathname === href;
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
             {/* Mobile Overlay */}
       <AnimatePresence>
         {isOpen && (
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="fixed inset-0 bg-black/50 z-30 lg:hidden"
             onClick={onToggle}
           />
         )}
       </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{ 
          x: isOpen ? 0 : -320,
          width: isCollapsed ? 80 : 320
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`fixed left-0 top-0 h-full bg-black border-r border-[#19c973]/20 z-50 lg:relative lg:translate-x-0 sidebar-desktop ${
          isCollapsed ? 'w-20' : 'w-80'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#19c973]/20">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center space-x-3"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-[#19c973] to-[#16a362] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <span className="text-white font-bold text-lg">CodeSpaze</span>
            </motion.div>
          )}
          
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleCollapse}
              className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-[#19c973]/10"
            >
              {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
            
            {/* Mobile close button */}
            <button
              onClick={onToggle}
              className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-[#19c973]/10 lg:hidden"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* User Profile */}
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 border-b border-[#19c973]/20"
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-[#19c973] to-[#16a362] rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium truncate">
                  {user?.name || 'User'}
                </p>
                <p className="text-gray-400 text-sm truncate">
                  {user?.email || 'user@example.com'}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Search Bar */}
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 border-b border-[#19c973]/20"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#19c973] transition-colors"
              />
            </div>
          </motion.div>
        )}

        {/* Main Navigation */}
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-3">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive(item.href)
                    ? 'bg-[#19c973]/20 text-[#19c973] border border-[#19c973]/30'
                    : 'text-gray-300 hover:bg-[#19c973]/10 hover:text-white'
                }`}
              >
                <item.icon className={`w-5 h-5 mr-3 flex-shrink-0 ${
                  isActive(item.href) ? 'text-[#19c973]' : 'text-gray-400 group-hover:text-[#19c973]'
                }`} />
                {!isCollapsed && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex-1"
                  >
                    <span className="block">{item.name}</span>
                    <span className="text-xs text-gray-500 mt-1 block">
                      {item.description}
                    </span>
                  </motion.div>
                )}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom Navigation */}
        <div className="border-t border-[#19c973]/20 p-3">
          <nav className="space-y-1">
            {bottomNavigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive(item.href)
                    ? 'bg-[#19c973]/20 text-[#19c973] border border-[#19c973]/30'
                    : 'text-gray-300 hover:bg-[#19c973]/10 hover:text-white'
                }`}
              >
                <item.icon className={`w-5 h-5 mr-3 flex-shrink-0 ${
                  isActive(item.href) ? 'text-[#19c973]' : 'text-gray-400 group-hover:text-[#19c973]'
                }`} />
                {!isCollapsed && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex-1"
                  >
                    <span className="block">{item.name}</span>
                    <span className="text-xs text-gray-500 mt-1 block">
                      {item.description}
                    </span>
                  </motion.div>
                )}
              </Link>
            ))}
            
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full group flex items-center px-3 py-3 text-sm font-medium rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-200"
            >
              <LogOut className="w-5 h-5 mr-3 flex-shrink-0 text-red-400 group-hover:text-red-300" />
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  Logout
                </motion.span>
              )}
            </button>
          </nav>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
