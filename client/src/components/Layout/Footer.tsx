import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageCircle, Twitter, Linkedin, Mail, Globe, GraduationCap, Award, Users, Zap, Calendar, Brain, Briefcase, Rocket, Workflow, Database, Settings, BookOpen, Eye, Cpu, Network, Building, Code, Target, MapPin, HelpCircle } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    programs: [
      { name: 'Internship Program', href: '/programs/internship' },
      { name: 'Fellowship Program', href: '/programs/fellowship' },
      { name: 'Summer Tech Accelerator', href: '/programs/summer' },
      { name: 'Winter Tech Accelerator', href: '/programs/winter' },
      { name: 'International Programs', href: '/programs/international' },
    ],
    products: [
      { name: 'Fundalytics AI', href: '/products/fundalytics' },
      { name: 'InvestLocal', href: '/products/investlocal' },
      { name: 'AI Assistant Builder', href: '/products/ai-builder' },
      { name: 'StackSage', href: '/products/stacksage' },
      { name: 'CollabXNation', href: '/products/collabxnation' },
      { name: 'AutoServeHub', href: '/products/autoservehub' },
    ],
    services: [
      { name: 'Internships-as-a-Service', href: '/services#internships' },
      { name: 'Career Services', href: '/services#career' },
      { name: 'Certification & Badging', href: '/services#certification' },
      { name: 'Project Mentorship', href: '/services#mentorship' },
      { name: 'Web Development', href: '/services#webdev' },
      { name: 'App Development', href: '/services#appdev' },
      { name: 'AI Solutions', href: '/services#ai' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Contact', href: '/contact' },
      { name: 'Blog', href: '/blog' },
    ],
    support: [
      { name: 'Help Center', href: '/help' },
      { name: 'Community', href: '/community' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
    ],
  };

  const socialLinks = [
    { name: 'Telegram', icon: MessageCircle, href: 'https://t.me/codespaze_community' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/codespaze' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/codespaze' },
    { name: 'Email', icon: Mail, href: 'mailto:support@codespaze.org' },
  ];

  return (
    <footer className="relative bg-dark-950 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
          <Link to="/" className="flex items-center space-x-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-[#19c973] to-[#16a362] rounded-xl flex items-center justify-center">
                <Code className="w-7 h-7 text-white" />
              </div>
              <div className="text-2xl font-bold text-white">CodeSpaze</div>
            </motion.div>
          </Link>
            <p className="text-gray-300 mb-6 max-w-md">
              Transform your tech career with our global learning platform. 
              Build real-world projects, connect with mentors, and accelerate 
              your journey in technology.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-dark-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-[#19c973] hover:bg-[#19c973]/10 transition-all duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
              <GraduationCap className="w-5 h-5 text-[#19c973]" />
              <span>Programs</span>
            </h3>
            <ul className="space-y-2">
              {footerLinks.programs.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-[#19c973] transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
              <Rocket className="w-5 h-5 text-[#19c973]" />
              <span>Products</span>
            </h3>
            <ul className="space-y-2">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-[#19c973] transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
              <Settings className="w-5 h-5 text-[#19c973]" />
              <span>Services</span>
            </h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-[#19c973] transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Support */}
          <div>
            <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
              <Building className="w-5 h-5 text-[#19c973]" />
              <span>Company</span>
            </h3>
            <ul className="space-y-2 mb-6">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-[#19c973] transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
              <HelpCircle className="w-5 h-5 text-[#19c973]" />
              <span>Support</span>
            </h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-[#19c973] transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} CodeSpaze. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>Made with ❤️ for the global tech community</span>
              <Globe className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
