import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Users, BookOpen, CheckCircle, Star, Code, Award, Zap, Globe, Plane, Trophy } from 'lucide-react';
import Button from '../../components/UI/Button';
import SEOComponent from '../../components/SEO/SEOComponent';

const RemoteApprenticeshipResidencyPage: React.FC = () => {
  const features = [
    'Intensive remote apprenticeship with international mentors',
    'Real-world projects that impact global markets',
    'Cross-border collaboration & remote teamwork',
    'Professional portfolio building with live projects',
    'Industry-standard development practices',
    'Global mentorship & career guidance',
    'Remote work skills & timezone management',
    'Access to international tech community'
  ];

  return (
    <>
      <SEOComponent
        title="Remote Apprenticeship Residency - Intensive Global Learning | CodeSpaze"
        description="Join our Remote Apprenticeship Residency for intensive learning with international mentors. Work on real-world projects, build your portfolio, and master remote collaboration skills."
        keywords="remote apprenticeship, international mentorship, real-world projects, remote collaboration, portfolio building, global tech learning, intensive apprenticeship"
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
                Remote Apprenticeship Residency
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Remote <span className="gradient-text">Apprenticeship Residency</span>
            </h1>
            <p className="text-base text-gray-300 max-w-3xl mx-auto mb-8">
              Ready for intensive learning that transforms you into a world-class developer? Our Remote Apprenticeship Residency
              connects you with international mentors for hands-on, project-based learning that builds real skills.
              <span className="text-[#19c973] font-semibold">Learn from anywhere, build for everywhere.</span>
            </p>
            
            {/* Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#19c973]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-8 h-8 text-[#19c973]" />
                </div>
                <div className="text-2xl font-bold text-white">3-6 Months</div>
                <div className="text-gray-400">Duration</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#19c973]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-8 h-8 text-[#19c973]" />
                </div>
                <div className="text-2xl font-bold text-white">1:1 Mentorship</div>
                <div className="text-gray-400">Personalized</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#19c973]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Code className="w-8 h-8 text-[#19c973]" />
                </div>
                <div className="text-2xl font-bold text-white">Live Projects</div>
                <div className="text-gray-400">Real Impact</div>
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
                Intensive remote learning experience designed for maximum skill development and career growth
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
                Your <span className="gradient-text">Intensive Learning</span> Journey
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Structured program designed for maximum skill acquisition and real-world application
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Phase 1: Foundation & Skill Building */}
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
                    Build your technical foundation with intensive learning and skill development
                  </p>
                  <ul className="space-y-3 text-sm text-gray-300">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                      <span>Core technology fundamentals</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                      <span>Advanced coding practices</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                      <span>Development tools & workflows</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                      <span>Remote collaboration skills</span>
                    </li>
                  </ul>
                </div>
              </motion.div>

              {/* Phase 2: Real-World Projects */}
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
                  <h3 className="text-2xl font-bold text-white mb-4 text-center">Phase 2: Live Projects</h3>
                  <div className="text-[#19c973] font-bold text-lg mb-2 text-center">Weeks 5-20</div>
                  <p className="text-gray-300 text-center mb-6">
                    Work on real client projects that impact global markets and users
                  </p>
                  <ul className="space-y-3 text-sm text-gray-300">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                      <span>Real client project work</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                      <span>International team collaboration</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                      <span>Production-ready code delivery</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                      <span>Industry best practices</span>
                    </li>
                  </ul>
                </div>
              </motion.div>

              {/* Phase 3: Portfolio & Career */}
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
                  <h3 className="text-2xl font-bold text-white mb-4 text-center">Phase 3: Career Launch</h3>
                  <div className="text-[#19c973] font-bold text-lg mb-2 text-center">Weeks 21-24</div>
                  <p className="text-gray-300 text-center mb-6">
                    Complete your portfolio and prepare for your dream tech career
                  </p>
                  <ul className="space-y-3 text-sm text-gray-300">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                      <span>Professional portfolio completion</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                      <span>Career guidance & preparation</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                      <span>Job search strategies</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                      <span>Industry networking access</span>
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
                Why <span className="gradient-text">Apprenticeship</span> Beats Traditional Learning
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Get the hands-on experience that employers actually value
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
                  <Code className="w-6 h-6 text-[#19c973]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Real Project Experience</h3>
                  <p className="text-gray-300">
                    Work on actual client projects that solve real problems, not just theoretical exercises that don't impress employers.
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
                  <Users className="w-6 h-6 text-[#19c973]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">International Mentorship</h3>
                  <p className="text-gray-300">
                    Learn directly from industry experts at top tech companies who know what skills are actually in demand.
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
                  <h3 className="text-xl font-bold text-white mb-2">Portfolio That Impresses</h3>
                  <p className="text-gray-300">
                    Build a portfolio of real projects that demonstrates your ability to deliver production-ready code.
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
                  <Globe className="w-6 h-6 text-[#19c973]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Global Network Access</h3>
                  <p className="text-gray-300">
                    Connect with professionals worldwide who can open doors to international opportunities and collaborations.
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
              Ready to Transform Your Tech Career?
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
              Join our Remote Apprenticeship Residency and work with international mentors on real projects.
              <span className="text-[#19c973] font-semibold">Next batch starts in 2 weeks.</span>
              Only 25 spots available - secure yours before they're gone!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/enroll">
                <Button size="lg">
                  Apply for Apprenticeship Residency
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

export default RemoteApprenticeshipResidencyPage;
