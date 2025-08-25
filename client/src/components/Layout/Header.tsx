import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  User, 
  LogOut, 
  Settings, 
  Briefcase,
  ChevronDown,
  GraduationCap,
  Award,
  Users,
  Globe,
  Brain,
  Calendar,
  Zap
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../UI/Button';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isProgramsDropdownOpen, setIsProgramsDropdownOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const [isMobileProgramsOpen, setIsMobileProgramsOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
  ];

  const programsDropdownItems = [
    { 
      name: 'All Programs', 
      href: '/programs', 
      icon: GraduationCap,
      description: 'Browse all available programs'
    },
    { 
      name: 'Internship Program', 
      href: '/programs/internship', 
      icon: Users,
      description: '60-90 days mentored learning'
    },
    { 
      name: 'Fellowship Program', 
      href: '/programs/fellowship', 
      icon: Award,
      description: '10-12 weeks selective program'
    },
    { 
      name: 'Summer Tech Accelerator', 
      href: '/programs/summer', 
      icon: Zap,
      description: '4-6 weeks fast-paced learning'
    },
    { 
      name: 'Winter Tech Accelerator', 
      href: '/programs/winter', 
      icon: Calendar,
      description: '4-6 weeks seasonal program'
    },
    { 
      name: 'International Programs', 
      href: '/programs/international', 
      icon: Globe,
      description: 'Remote, cross-border opportunities'
    },
  ];

  const productsDropdownItems = [
    { 
      name: 'All Products', 
      href: '/products', 
      icon: Globe,
      description: 'Browse all available products'
    },
    { 
      name: 'Fundalytics AI', 
      href: '/products/fundalytics', 
      icon: Brain,
      description: 'AI-powered funding recommendations for startups'
    },
    { 
      name: 'InvestLocal', 
      href: '/products/investlocal', 
      icon: Users,
      description: 'Local investment platform connecting investors & entrepreneurs'
    },
    { 
      name: 'AI Assistant Builder', 
      href: '/products/ai-builder', 
      icon: Brain,
      description: 'No-code platform to build custom AI agents'
    },
    { 
      name: 'StackSage', 
      href: '/products/stacksage', 
      icon: Briefcase,
      description: 'AI-powered DeveloperOps Assistant for CI/CD & monitoring'
    },
    { 
      name: 'CollabXNation', 
      href: '/products/collabxnation', 
      icon: Users,
      description: 'Collaborative project platform for developers & founders'
    },
    { 
      name: 'AutoServeHub', 
      href: '/products/autoservehub', 
      icon: Zap,
      description: 'Automation platform using Make or n8n workflows'
    },
  ];

  const userMenuItems = [
    { name: 'Dashboard', href: '/dashboard', icon: Briefcase },
    { name: 'Profile', href: '/dashboard/profile', icon: Settings },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
  };

  const handleProgramsDropdownToggle = () => {
    if (isProgramsDropdownOpen) {
      setIsProgramsDropdownOpen(false);
    } else {
      setIsProductsDropdownOpen(false); // Close products dropdown first
      setIsProgramsDropdownOpen(true);
    }
  };

  const handleProductsDropdownToggle = () => {
    if (isProductsDropdownOpen) {
      setIsProductsDropdownOpen(false);
    } else {
      setIsProgramsDropdownOpen(false); // Close programs dropdown first
      setIsProductsDropdownOpen(true);
    }
  };

  const handleProgramsMouseEnter = () => {
    setIsProductsDropdownOpen(false); // Close products dropdown
    setIsProgramsDropdownOpen(true);
  };

  const handleProductsMouseEnter = () => {
    setIsProgramsDropdownOpen(false); // Close programs dropdown
    setIsProductsDropdownOpen(true);
  };

  return (
    <header className="relative z-50 bg-black backdrop-blur-md border-b border-[#19c973]/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3"
            >
              <div className="w-40 h-18 flex items-center justify-center">
                <img 
                  src="/codespaze-logo1.jpg" 
                  alt="CodeSpaze Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  location.pathname === item.href
                    ? 'text-[#19c973]'
                    : 'text-gray-300 hover:text-[#19c973]'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Programs Dropdown */}
            <div className="relative">
              <button
                onClick={handleProgramsDropdownToggle}
                onMouseEnter={handleProgramsMouseEnter}
                className={`flex items-center space-x-1 text-sm font-medium transition-colors duration-200 ${
                  location.pathname === '/programs'
                    ? 'text-[#19c973]'
                    : 'text-gray-300 hover:text-[#19c973]'
                }`}
              >
                <span>Programs</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                  isProgramsDropdownOpen ? 'rotate-180' : ''
                }`} />
              </button>

              <AnimatePresence>
                {isProgramsDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    onMouseLeave={() => setIsProgramsDropdownOpen(false)}
                    className="absolute left-0 mt-2 w-[700px] max-w-[90vw] bg-black rounded-xl shadow-2xl py-6 border border-[#19c973]/20 z-50 lg:left-auto lg:right-0 ml-4"
                  >
                    <div className="grid grid-cols-2 gap-8 px-8">
                      <div>
                        <h3 className="text-xs font-semibold text-[#19c973] uppercase tracking-wider mb-4">Core Programs</h3>
                        <div className="space-y-3">
                          {programsDropdownItems.slice(1, 4).map((item, index) => (
                            <Link
                              key={index}
                              to={item.href}
                              onClick={() => setIsProgramsDropdownOpen(false)}
                              className="flex items-start space-x-3 p-2 rounded-lg hover:bg-[#19c973]/10 transition-colors duration-200 group"
                            >
                              {item.icon && (
                                <div className="w-8 h-8 bg-gradient-to-r from-[#19c973] to-[#16a362] rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
                                  <item.icon className="w-4 h-4 text-white" />
                                </div>
                              )}
                              <div className="flex-1">
                                <div className="font-medium text-white group-hover:text-[#19c973] transition-colors duration-200 text-sm">{item.name}</div>
                                <div className="text-xs text-gray-400 mt-1">{item.description}</div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-xs font-semibold text-[#19c973] uppercase tracking-wider mb-4">Specialized Programs</h3>
                        <div className="space-y-3">
                          {programsDropdownItems.slice(4).map((item, index) => (
                            <Link
                              key={index}
                              to={item.href}
                              onClick={() => setIsProgramsDropdownOpen(false)}
                              className="flex items-start space-x-3 p-2 rounded-lg hover:bg-[#19c973]/10 transition-colors duration-200 group"
                            >
                              {item.icon && (
                                <div className="w-8 h-8 bg-gradient-to-r from-[#19c973] to-[#16a362] rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
                                  <item.icon className="w-4 h-4 text-white" />
                                </div>
                              )}
                              <div className="flex-1">
                                <div className="font-medium text-white group-hover:text-[#19c973] transition-colors duration-200 text-sm">{item.name}</div>
                                <div className="text-xs text-gray-400 mt-1">{item.description}</div>
                              </div>
                            </Link>
                          ))}
                        </div>
                        
                        <div className="mt-6 pt-6 border-t border-[#19c973]/20">
                          <Link
                            to="/programs"
                            onClick={() => setIsProgramsDropdownOpen(false)}
                            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-[#19c973]/10 transition-colors duration-200 group"
                          >
                            <div className="w-8 h-8 bg-gradient-to-r from-[#19c973] to-[#16a362] rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
                              <GraduationCap className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <div className="font-medium text-white group-hover:text-[#19c973] transition-colors duration-200 text-sm">View All Programs</div>
                              <div className="text-xs text-gray-400">Browse complete program catalog</div>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Products Dropdown */}
            <div className="relative">
              <button
                onClick={handleProductsDropdownToggle}
                onMouseEnter={handleProductsMouseEnter}
                className={`flex items-center space-x-1 text-sm font-medium transition-colors duration-200 ${
                  location.pathname === '/products'
                    ? 'text-[#19c973]'
                    : 'text-gray-300 hover:text-[#19c973]'
                }`}
              >
                <span>Products</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                  isProductsDropdownOpen ? 'rotate-180' : ''
                }`} />
              </button>

              <AnimatePresence>
                {isProductsDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    onMouseLeave={() => setIsProductsDropdownOpen(false)}
                    className="absolute left-0 mt-2 w-[700px] max-w-[90vw] bg-black rounded-xl shadow-2xl py-6 border border-[#19c973]/20 z-50 lg:left-auto lg:right-0 ml-4"
                  >
                    <div className="grid grid-cols-2 gap-8 px-8">
                      <div>
                        <h3 className="text-xs font-semibold text-[#19c973] uppercase tracking-wider mb-4">AI & Automation</h3>
                        <div className="space-y-3">
                          {productsDropdownItems.slice(1, 4).map((item, index) => (
                            <Link
                              key={index}
                              to={item.href}
                              onClick={() => setIsProductsDropdownOpen(false)}
                              className="flex items-start space-x-3 p-2 rounded-lg hover:bg-[#19c973]/10 transition-colors duration-200 group"
                            >
                              {item.icon && (
                                <div className="w-8 h-8 bg-gradient-to-r from-[#19c973] to-[#16a362] rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
                                  <item.icon className="w-4 h-4 text-white" />
                                </div>
                              )}
                              <div className="flex-1">
                                <div className="font-medium text-white group-hover:text-[#19c973] transition-colors duration-200 text-sm">{item.name}</div>
                                <div className="text-xs text-gray-400 mt-1">{item.description}</div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-xs font-semibold text-[#19c973] uppercase tracking-wider mb-4">Platforms & Tools</h3>
                        <div className="space-y-3">
                          {productsDropdownItems.slice(4).map((item, index) => (
                            <Link
                              key={index}
                              to={item.href}
                              onClick={() => setIsProductsDropdownOpen(false)}
                              className="flex items-start space-x-3 p-2 rounded-lg hover:bg-[#19c973]/10 transition-colors duration-200 group"
                            >
                              {item.icon && (
                                <div className="w-8 h-8 bg-gradient-to-r from-[#19c973] to-[#16a362] rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
                                  <item.icon className="w-4 h-4 text-white" />
                                </div>
                              )}
                              <div className="flex-1">
                                <div className="font-medium text-white group-hover:text-[#19c973] transition-colors duration-200 text-sm">{item.name}</div>
                                <div className="text-xs text-gray-400 mt-1">{item.description}</div>
                              </div>
                            </Link>
                          ))}
                        </div>
                        
                        <div className="mt-6 pt-6 border-t border-[#19c973]/20">
                          <Link
                            to="/products"
                            onClick={() => setIsProductsDropdownOpen(false)}
                            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-[#19c973]/10 transition-colors duration-200 group"
                          >
                            <div className="w-8 h-8 bg-gradient-to-r from-[#19c973] to-[#16a362] rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
                              <Globe className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <div className="font-medium text-white group-hover:text-[#19c973] transition-colors duration-200 text-sm">View All Products</div>
                              <div className="text-xs text-gray-400">Explore complete product suite</div>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Contact Link */}
            <Link
              to="/contact"
              className={`text-sm font-medium transition-colors duration-200 ${
                location.pathname === '/contact'
                  ? 'text-[#19c973]'
                  : 'text-gray-300 hover:text-[#19c973]'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 text-sm font-medium text-gray-300 hover:text-[#19c973] transition-colors duration-200"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-[#19c973] to-[#16a362] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xs">
                      {user?.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span>{user?.name}</span>
                </button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border border-gray-200"
                    >
                      {userMenuItems.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:text-[#19c973] hover:bg-gray-50 transition-colors duration-200"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <item.icon className="w-4 h-4" />
                          <span>{item.name}</span>
                        </Link>
                      ))}
                      <hr className="border-gray-200 my-2" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:text-red-500 hover:bg-gray-50 transition-colors duration-200 w-full"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/enroll">
                  <Button variant="primary" size="sm">
                    Join Now
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-[#19c973] transition-colors duration-200"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black border-t border-[#19c973]/20 shadow-lg"
          >
            <div className="px-4 py-4 space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block text-sm font-medium transition-colors duration-200 ${
                    location.pathname === item.href
                      ? 'text-[#19c973]'
                      : 'text-gray-300 hover:text-[#19c973]'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Programs Section */}
              <div className="border-t border-[#19c973]/20 pt-4">
                <button
                  onClick={() => setIsMobileProgramsOpen(!isMobileProgramsOpen)}
                  className="flex items-center justify-between w-full text-xs font-semibold text-[#19c973] uppercase tracking-wider mb-3 hover:text-[#1edb7f] transition-colors duration-200"
                >
                  <span>Programs</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                    isMobileProgramsOpen ? 'rotate-180' : ''
                  }`} />
                </button>
                <AnimatePresence>
                  {isMobileProgramsOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-2 overflow-hidden"
                    >
                      {programsDropdownItems.map((item, index) => (
                        <Link
                          key={index}
                          to={item.href}
                          className="flex items-center space-x-3 py-2 text-sm text-gray-300 hover:text-[#19c973] transition-colors duration-200 pl-4"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.icon && (
                            <div className="w-6 h-6 bg-gradient-to-r from-[#19c973] to-[#16a362] rounded-lg flex items-center justify-center flex-shrink-0">
                              <item.icon className="w-3 h-3 text-white" />
                            </div>
                          )}
                          <div>
                            <div className="font-medium">{item.name}</div>
                            <div className="text-xs text-gray-500">{item.description}</div>
                          </div>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Products Section */}
              <div className="border-t border-[#19c973]/20 pt-4">
                <button
                  onClick={() => setIsMobileProductsOpen(!isMobileProductsOpen)}
                  className="flex items-center justify-between w-full text-xs font-semibold text-[#19c973] uppercase tracking-wider mb-3 hover:text-[#1edb7f] transition-colors duration-200"
                >
                  <span>Products</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                    isMobileProductsOpen ? 'rotate-180' : ''
                  }`} />
                </button>
                <AnimatePresence>
                  {isMobileProductsOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-2 overflow-hidden"
                    >
                      {productsDropdownItems.map((item, index) => (
                        <Link
                          key={index}
                          to={item.href}
                          className="flex items-center space-x-3 py-2 text-sm text-gray-300 hover:text-[#19c973] transition-colors duration-200 pl-4"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.icon && (
                            <div className="w-6 h-6 bg-gradient-to-r from-[#19c973] to-[#16a362] rounded-lg flex items-center justify-center flex-shrink-0">
                              <item.icon className="w-3 h-3 text-white" />
                            </div>
                          )}
                          <div>
                            <div className="font-medium">{item.name}</div>
                            <div className="text-xs text-gray-500">{item.description}</div>
                          </div>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Contact Section */}
              <div className="border-t border-[#19c973]/20 pt-4">
                <Link
                  to="/contact"
                  className="block text-sm font-medium text-gray-300 hover:text-[#19c973] transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
              </div>
              
              {isAuthenticated ? (
                <div className="pt-4 border-t border-[#19c973]/20">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#19c973] to-[#16a362] rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xs">
                        {user?.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-300">{user?.name}</span>
                  </div>
                  {userMenuItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="flex items-center space-x-2 py-2 text-sm text-gray-300 hover:text-[#19c973] transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </Link>
                  ))}
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 py-2 text-sm text-gray-300 hover:text-red-500 transition-colors duration-200 w-full"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <div className="pt-4 border-t border-[#19c973]/20 space-y-4">
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" size="sm" className="w-full">
                      Login
                    </Button>
                  </Link>
                  <Link to="/enroll" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="primary" size="sm" className="w-full mt-4">
                      Join Now
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
