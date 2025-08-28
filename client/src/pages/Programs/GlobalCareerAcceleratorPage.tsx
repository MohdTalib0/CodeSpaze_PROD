import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Users, BookOpen, CheckCircle, Star, Code, Award, Zap, Globe, Plane, Trophy, Languages, Briefcase } from 'lucide-react';
import Button from '../../components/UI/Button';
import SEOComponent from '../../components/SEO/SEOComponent';

const GlobalCareerAcceleratorPage: React.FC = () => {
  const features = [
    'Multilingual support & language training',
    'Global career guidance & job preparation',
    'International job placement assistance',
    'Cultural awareness & communication skills',
    'Global networking & professional connections',
    'Industry-specific career coaching',
    'Resume & interview preparation',
    'Access to worldwide job opportunities'
  ];

  return (
    <>
      <SEOComponent
        title="Global Career Accelerator - Multilingual Global Career Program | CodeSpaze"
        description="Join our Global Career Accelerator for multilingual support, international job preparation, and worldwide career opportunities. Master global communication and land your dream international job."
        keywords="global career accelerator, multilingual career program, international job preparation, global networking, career coaching, worldwide opportunities, cultural awareness"
      />
      
      <div className="min-h-screen py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="mb-6">
              <span className="px-4 py-2 bg-[#19c973]/20 text-[#19c973] text-sm rounded-full">
                Global Career Accelerator
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Global <span className="gradient-text">Career Accelerator</span>
            </h1>
            <p className="text-base text-gray-300 max-w-3xl mx-auto mb-8">
              Ready to accelerate your career on a global scale? Our Global Career Accelerator program
              provides multilingual support, international job preparation, and worldwide networking to help you
              land your dream job anywhere in the world. <span className="text-[#19c973] font-semibold">Speak the language of global success.</span>
            </p>
            
            {/* Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#19c973]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-8 h-8 text-[#19c973]" />
                </div>
                <div className="text-2xl font-bold text-white">8-12 Weeks</div>
                <div className="text-gray-400">Duration</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#19c973]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Languages className="w-8 h-8 text-[#19c973]" />
                </div>
                <div className="text-2xl font-bold text-white">5+ Languages</div>
                <div className="text-gray-400">Supported</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#19c973]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Globe className="w-8 h-8 text-[#19c973]" />
                </div>
                <div className="text-2xl font-bold text-white">50+ Countries</div>
                <div className="text-gray-400">Job Markets</div>
              </div>
            </div>
          </motion.div>

          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                What You'll <span className="gradient-text">Experience</span>
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Comprehensive global career development designed for international success
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="glass-card p-6 rounded-xl text-center border border-[#19c973]/30"
                >
                  <div className="w-12 h-12 bg-[#19c973]/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-6 h-6 text-[#19c973]" />
                  </div>
                  <h3 className="text-white font-medium">{feature}</h3>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Program Structure Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Your <span className="gradient-text">Global Career</span> Journey
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Structured program designed for maximum international career success
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Phase 1: Language & Cultural Foundation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="glass-card p-8 rounded-xl border border-[#19c973]/30 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-[#19c973]/10 rounded-full -translate-y-10 translate-x-10"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-[#19c973]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Languages className="w-8 h-8 text-[#19c973]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 text-center">Phase 1: Foundation</h3>
                  <div className="text-[#19c973] font-bold text-lg mb-2 text-center">Weeks 1-4</div>
                  <p className="text-gray-300 text-center mb-6">
                    Build your multilingual foundation and cultural awareness for global success
                  </p>
                  <ul className="space-y-3 text-sm text-gray-300">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                      <span>Language skills development</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                      <span>Cultural awareness training</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                      <span>Global communication skills</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                      <span>International business etiquette</span>
                    </li>
                  </ul>
                </div>
              </motion.div>

              {/* Phase 2: Career Development */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="glass-card p-8 rounded-xl border border-[#19c973]/30 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-[#19c973]/10 rounded-full -translate-y-10 translate-x-10"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-[#19c973]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Briefcase className="w-8 h-8 text-[#19c973]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 text-center">Phase 2: Career Prep</h3>
                  <div className="text-[#19c973] font-bold text-lg mb-2 text-center">Weeks 5-8</div>
                  <p className="text-gray-300 text-center mb-6">
                    Develop your professional skills and prepare for international job markets
                  </p>
                  <ul className="space-y-3 text-sm text-gray-300">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                      <span>Resume & portfolio building</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                      <span>Interview preparation & practice</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                      <span>Industry-specific coaching</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                      <span>Global job search strategies</span>
                    </li>
                  </ul>
                </div>
              </motion.div>

              {/* Phase 3: Global Networking */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                viewport={{ once: true }}
                className="glass-card p-8 rounded-xl border border-[#19c973]/30 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-[#19c973]/10 rounded-full -translate-y-10 translate-x-10"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-[#19c973]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Award className="w-8 h-8 text-[#19c973]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 text-center">Phase 3: Global Launch</h3>
                  <div className="text-[#19c973] font-bold text-lg mb-2 text-center">Weeks 9-12</div>
                  <p className="text-gray-300 text-center mb-6">
                    Connect with global opportunities and launch your international career
                  </p>
                  <ul className="space-y-3 text-sm text-gray-300">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                      <span>Global networking events</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                      <span>International job placement</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                      <span>Career acceleration support</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                      <span>Ongoing mentorship access</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Key Benefits Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Why <span className="gradient-text">Global Experience</span> Accelerates Your Career
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Stand out in the competitive global job market with international expertise
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="flex items-start space-x-4"
              >
                <div className="w-12 h-12 bg-[#19c973]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Languages className="w-6 h-6 text-[#19c973]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Multilingual Advantage</h3>
                  <p className="text-gray-300">
                    Master multiple languages to communicate effectively with global teams and clients, giving you a competitive edge in international companies.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="flex items-start space-x-4"
              >
                <div className="w-12 h-12 bg-[#19c973]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Globe className="w-6 h-6 text-[#19c973]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Cultural Intelligence</h3>
                  <p className="text-gray-300">
                    Understand different cultures and business practices that enable you to work effectively in diverse international environments.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                viewport={{ once: true }}
                className="flex items-start space-x-4"
              >
                <div className="w-12 h-12 bg-[#19c973]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-6 h-6 text-[#19c973]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Global Job Access</h3>
                  <p className="text-gray-300">
                    Access job opportunities in 50+ countries with the skills and preparation needed to succeed in international markets.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                viewport={{ once: true }}
                className="flex items-start space-x-4"
              >
                <div className="w-12 h-12 bg-[#19c973]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-[#19c973]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Worldwide Network</h3>
                  <p className="text-gray-300">
                    Build connections with professionals worldwide that open doors to international opportunities and career growth.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Accelerate Your Global Career?
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
              Join our Global Career Accelerator and unlock opportunities in 50+ countries.
              <span className="text-[#19c973] font-semibold">Next batch starts in 2 weeks.</span>
              Only 30 spots available globally - secure yours before they're gone!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/enroll">
                <Button size="lg">
                  Apply for Global Career Accelerator
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button variant="outline" size="lg">
                Schedule a Consultation
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default GlobalCareerAcceleratorPage;
