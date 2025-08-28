import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Users, BookOpen, CheckCircle, Star, Code, Award, Zap, Globe, Plane, Trophy } from 'lucide-react';
import Button from '../../components/UI/Button';
import SEOComponent from '../../components/SEO/SEOComponent';

const InternationalInternshipsPage: React.FC = () => {
  const features = [
    'Remote work with international companies',
    'Cross-border collaboration & networking',
    'Global mentorship from industry leaders',
    'Multilingual support & cultural training',
    'International portfolio & certifications',
    'Global job placement assistance',
    'Cultural awareness & communication skills',
    'Access to worldwide tech community'
  ];

  return (
    <>
      <SEOComponent
        title="International Internships - Remote Global Opportunities | CodeSpaze"
        description="Join our International Internships program for remote work experience with global companies. Cross-border collaboration, international mentorship, and worldwide networking opportunities."
        keywords="international internships, remote internships, global tech opportunities, cross-border collaboration, international mentorship, remote work experience"
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
                International Internships
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              International <span className="gradient-text">Internships</span>
            </h1>
            <p className="text-base text-gray-300 max-w-3xl mx-auto mb-8">
              Ready to work with global teams and build your international tech career? Our International Internships program
              connects you with companies worldwide, offering remote internships, cross-border projects, and global
              networking opportunities. <span className="text-[#19c973] font-semibold">Work from anywhere, impact everywhere.</span>
            </p>
            
            {/* Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#19c973]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Globe className="w-8 h-8 text-[#19c973]" />
                </div>
                <div className="text-2xl font-bold text-white">25+ Countries</div>
                <div className="text-gray-400">Global Reach</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#19c973]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-8 h-8 text-[#19c973]" />
                </div>
                <div className="text-2xl font-bold text-white">500+ Partners</div>
                <div className="text-gray-400">Worldwide</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#19c973]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Trophy className="w-8 h-8 text-[#19c973]" />
                </div>
                <div className="text-2xl font-bold text-white">95% Success</div>
                <div className="text-gray-400">Rate</div>
              </div>
            </div>
          </motion.div>



        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="container mx-auto px-4 py-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What You'll <span className="gradient-text">Experience</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Global learning experience designed for international career success
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
          className="container mx-auto px-4 py-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Your <span className="gradient-text">Global Journey</span> to Success
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Structured program designed for maximum international exposure and career growth
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Phase 1: Foundation & Cultural Training */}
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
                  <BookOpen className="w-8 h-8 text-[#19c973]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 text-center">Phase 1: Foundation</h3>
                <div className="text-[#19c973] font-bold text-lg mb-2 text-center">Weeks 1-4</div>
                <p className="text-gray-300 text-center mb-6">
                  Build your international foundation with cultural training and global communication skills
                </p>
                <ul className="space-y-3 text-sm text-gray-300">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                    <span>Cultural awareness & communication training</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                    <span>Multilingual support & language skills</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                    <span>Global business etiquette & practices</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                    <span>International team collaboration skills</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Phase 2: Remote Internship */}
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
                  <Code className="w-8 h-8 text-[#19c973]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 text-center">Phase 2: Remote Internship</h3>
                <div className="text-[#19c973] font-bold text-lg mb-2 text-center">Weeks 5-20</div>
                <p className="text-gray-300 text-center mb-6">
                  Work remotely with international companies on real projects that impact global markets
                </p>
                <ul className="space-y-3 text-sm text-gray-300">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                    <span>Remote work with international companies</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                    <span>Cross-border project collaboration</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                    <span>Global mentorship & guidance</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                    <span>International portfolio building</span>
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
                <h3 className="text-2xl font-bold text-white mb-4 text-center">Phase 3: Global Network</h3>
                <div className="text-[#19c973] font-bold text-lg mb-2 text-center">Weeks 21-24</div>
                <p className="text-gray-300 text-center mb-6">
                  Build your international network and prepare for global career opportunities
                </p>
                <ul className="space-y-3 text-sm text-gray-300">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                    <span>Global networking events & conferences</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                    <span>International job placement assistance</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                    <span>Global portfolio presentation</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                    <span>Lifetime access to global community</span>
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
          className="container mx-auto px-4 py-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why <span className="gradient-text">Global Experience</span> Matters
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Stand out in the competitive global tech market with international experience
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
                <Globe className="w-6 h-6 text-[#19c973]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Global Perspective</h3>
                <p className="text-gray-300">
                  Understand different markets, cultures, and business practices that give you a competitive edge in international companies.
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
                <Plane className="w-6 h-6 text-[#19c973]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Remote Work Skills</h3>
                <p className="text-gray-300">
                  Master the art of working with global teams across different time zones and cultural backgrounds.
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
                <Trophy className="w-6 h-6 text-[#19c973]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">International Recognition</h3>
                <p className="text-gray-300">
                  Stand out to international employers and clients with globally recognized experience and certifications.
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
                <h3 className="text-xl font-bold text-white mb-2">Global Network</h3>
                <p className="text-gray-300">
                  Build connections with professionals worldwide that open doors to international opportunities and collaborations.
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
          className="container mx-auto px-4 py-20"
        >
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Go Global with Your Tech Career?
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
              Join our International Internships program and work with teams from around the world.
              <span className="text-[#19c973] font-semibold">Next batch starts in 2 weeks.</span>
              Only 40 spots available globally - secure yours before they're gone!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/enroll">
                <Button size="lg">
                  Apply for International Internships
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button variant="outline" size="lg">
                Schedule a Consultation
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
                 </motion.div>
         </div>
       </div>
     </>
   );
 };

export default InternationalInternshipsPage;
