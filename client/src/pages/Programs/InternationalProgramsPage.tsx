import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Users, BookOpen, CheckCircle, Star, Globe, Plane, Trophy, Code, Award, Zap } from 'lucide-react';
import Button from '../../components/UI/Button';
import SEOComponent from '../../components/SEO/SEOComponent';

const InternationalProgramsPage: React.FC = () => {
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

  const testimonials = [
    {
      name: 'Carlos Rodriguez',
      role: 'Software Engineer at Google',
      content: 'The international internship program gave me exposure to global tech practices and helped me land a role at Google. Working with international teams was invaluable.',
      rating: 5
    },
    {
      name: 'Yuki Tanaka',
      role: 'Product Manager at Microsoft',
      content: 'Working with international teams during the remote apprenticeship was an invaluable experience for my career. I learned global best practices that I use daily.',
      rating: 5
    },
    {
      name: 'Ahmed Hassan',
      role: 'Data Scientist at Amazon',
      content: 'The global career accelerator helped me understand international job markets and prepare for global opportunities. Now I work with teams across 5 continents.',
      rating: 5
    }
  ];

  return (
    <>
      <SEOComponent
        title="Best International Tech Programs in Lucknow, Delhi, Mumbai | CodeSpaze Global Programs"
        description="Transform your tech career with CodeSpaze's International Programs. Best international programs in Lucknow, Delhi, Mumbai, Bangalore, Hyderabad, Chennai, Pune, Kolkata. Remote internships, global career acceleration, and international hackathons. Join our global tech community today!"
        keywords="best international tech programs in Lucknow, best international tech programs in Delhi, best international tech programs in Mumbai, best international tech programs in Bangalore, best international tech programs in Hyderabad, best international tech programs in Chennai, best international tech programs in Pune, best international tech programs in Kolkata, international tech programs, international coding bootcamp, international software development, international AI/ML programs, international web development, international app development, international data science, international cybersecurity, international cloud computing, international blockchain, international game development, international UI/UX design, international graphic design, international digital marketing, international content writing, international SEO training, international mobile development, international DevOps, international full stack development, international Python, international React, international JavaScript, international Java, international C++, international Node.js, international MongoDB, international SQL, international AWS, international Azure, international Google Cloud, international startup programs, international fintech, international edtech, international healthtech, international ecommerce, international SaaS, international B2B, international B2C, international product management, international project management, international business development, international sales, international marketing, international customer success, international operations, international finance, international HR, international legal, international research, international academic, international university, international college, international student, international graduate, international postgraduate, international PhD, international master's, international bachelor's, international diploma, international certificate, international online, international virtual, international hybrid, international part-time, international full-time, international paid, international unpaid, international stipend, international competitive, international selective, international prestigious, international top, international leading, international innovative, international cutting-edge, international future-focused, international industry-relevant, international practical, international hands-on, international project-based, international real-world, international professional, international career-focused, international skill-building, international knowledge-enhancing, international experience-gaining, international networking, international mentorship, international guidance, international support, international community, international collaborative, international team, international individual, international creative, international analytical, international technical, international business, international design, international development, international engineering, international science, international mathematics, international statistics, international economics, international finance, international accounting, international management, international leadership, international entrepreneurship, international innovation, international research, international analysis, international strategy, international planning, international execution, international implementation, international testing, international quality assurance, international user experience, international customer experience, international product, international service, international solution, international platform, international application, international system, international infrastructure, international architecture, international testing, international deployment, international maintenance, international support, international training, international education, international learning, international teaching, international coaching, international mentoring, international consulting, international advisory, international strategic, international tactical, international operational, international administrative, international executive, international senior, international junior, international entry-level, international experienced, international skilled, international qualified, international certified, international accredited, international recognized, international established, international reputable, international trusted, international reliable"
        canonicalUrl="https://codespaze.org/programs/international-programs"
        location="Lucknow"
        programType="International Programs"
        isLocal={true}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "EducationalProgram",
          "name": "CodeSpaze International Programs",
          "description": "Transform your tech career with CodeSpaze's International Programs. Remote internships, global career acceleration, and international hackathons.",
          "provider": {
            "@type": "EducationalOrganization",
            "name": "CodeSpaze",
            "url": "https://codespaze.org"
          },
          "programType": "International Programs",
          "duration": "3-12 months",
          "educationalLevel": "Undergraduate",
          "teaches": [
            "Software Development",
            "Web Development",
            "App Development",
            "AI/ML",
            "Data Science",
            "Cloud Computing",
            "Cybersecurity",
            "UI/UX Design"
          ],
          "offers": {
            "@type": "Offer",
            "description": "International Tech Programs with global exposure and remote opportunities",
            "category": "Educational Services"
          }
        }}
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
                International Programs
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              International <span className="gradient-text">Programs</span>
            </h1>
            <p className="text-base text-gray-300 max-w-3xl mx-auto mb-8">
              Ready to work with global teams and build your international tech career? Our international programs 
              connect you with companies worldwide, offering remote internships, cross-border projects, and global 
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
            className="mb-20"
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
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Our <span className="gradient-text">Global Programs</span>
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Choose from our range of international programs designed for global career advancement
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* International Internships */}
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
                    <Globe className="w-8 h-8 text-[#19c973]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 text-center">International Internships</h3>
                  <div className="text-[#19c973] font-bold text-lg mb-2 text-center">Remote, Cross-Border</div>
                  <p className="text-gray-300 text-center mb-6">
                    Remote internships with international companies, cross-border collaboration, and global networking opportunities.
                  </p>
                  <div className="text-center mb-4">
                    <span className="inline-block px-3 py-1 bg-[#19c973]/20 text-[#19c973] text-sm rounded-full font-medium">
                      3-6 months
                    </span>
                  </div>
                  <ul className="space-y-3 text-sm text-gray-300 mb-6">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                      <span>Remote work experience</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                      <span>International exposure</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                      <span>Cross-cultural collaboration</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                      <span>Global networking</span>
                    </li>
                  </ul>
                  <div className="text-center">
                    <Link to="/programs/international-internships">
                      <Button variant="outline" size="sm" className="w-full">
                        Learn More
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>

              {/* Remote Apprenticeship Residency */}
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
                    <BookOpen className="w-8 h-8 text-[#19c973]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 text-center">Remote Apprenticeship Residency</h3>
                  <div className="text-[#19c973] font-bold text-lg mb-2 text-center">Intensive Learning</div>
                  <p className="text-gray-300 text-center mb-6">
                    Intensive remote apprenticeship with international mentors and real-world projects.
                  </p>
                  <div className="text-center mb-4">
                    <span className="inline-block px-3 py-1 bg-[#19c973]/20 text-[#19c973] text-sm rounded-full font-medium">
                      3-6 months
                    </span>
                  </div>
                  <ul className="space-y-3 text-sm text-gray-300 mb-6">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                      <span>International mentorship</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                      <span>Real-world projects</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                      <span>Remote collaboration</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                      <span>Global portfolio</span>
                    </li>
                  </ul>
                  <div className="text-center">
                    <Link to="/programs/remote-apprenticeship-residency">
                      <Button variant="outline" size="sm" className="w-full">
                        Learn More
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>

              {/* Global Career Accelerator */}
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
                    <Zap className="w-8 h-8 text-[#19c973]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 text-center">Global Career Accelerator</h3>
                  <div className="text-[#19c973] font-bold text-lg mb-2 text-center">Multilingual Program</div>
                  <p className="text-gray-300 text-center mb-6">
                    Multilingual program designed for global career advancement and international job opportunities.
                  </p>
                  <div className="text-center mb-4">
                    <span className="inline-block px-3 py-1 bg-[#19c973]/20 text-[#19c973] text-sm rounded-full font-medium">
                      8-12 weeks
                    </span>
                  </div>
                  <ul className="space-y-3 text-sm text-gray-300 mb-6">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                      <span>Multilingual support</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                      <span>Global career guidance</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                      <span>International job prep</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                      <span>Cultural awareness</span>
                    </li>
                  </ul>
                  <div className="text-center">
                    <Link to="/programs/global-career-accelerator">
                      <Button variant="outline" size="sm" className="w-full">
                        Learn More
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>

              {/* International Hackathon Series */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                viewport={{ once: true }}
                className="glass-card p-8 rounded-xl border border-[#19c973]/30 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-[#19c973]/10 rounded-full -translate-y-10 translate-x-10"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-[#19c973]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Trophy className="w-8 h-8 text-[#19c973]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 text-center">International Hackathon Series</h3>
                  <div className="text-[#19c973] font-bold text-lg mb-2 text-center">Monthly Events</div>
                  <p className="text-gray-300 text-center mb-6">
                    Monthly international hackathons with global teams and real-world problem solving.
                  </p>
                  <div className="text-center mb-4">
                    <span className="inline-block px-3 py-1 bg-[#19c973]/20 text-[#19c973] text-sm rounded-full font-medium">
                      Monthly
                    </span>
                  </div>
                  <ul className="space-y-3 text-sm text-gray-300 mb-6">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                      <span>Global teams</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                      <span>Real-world problems</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                      <span>International prizes</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                      <span>Networking events</span>
                    </li>
                  </ul>
                  <div className="text-center">
                    <Link to="/programs/international-hackathon-series">
                      <Button variant="outline" size="sm" className="w-full">
                        Learn More
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
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
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Why <span className="gradient-text">Global Experience</span> Matters
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                In today's interconnected world, international experience is your competitive advantage
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="glass-card p-6 rounded-xl border border-[#19c973]/30"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#19c973]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Globe className="w-6 h-6 text-[#19c973]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Global Perspective</h3>
                      <p className="text-gray-300 text-sm">
                        Work with teams from different cultures and time zones. Learn global best practices 
                        that aren't taught in local programs.
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="glass-card p-6 rounded-xl border border-[#19c973]/30"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#19c973]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Plane className="w-6 h-6 text-[#19c973]" />
                      </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Remote Work Skills</h3>
                      <p className="text-gray-300 text-sm">
                        Master the art of remote collaboration, asynchronous communication, and 
                        global project management - skills that are in high demand worldwide.
                      </p>
                    </div>
                  </div>
                </motion.div>
                  </div>

              {/* Right Column */}
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="glass-card p-6 rounded-xl border border-[#19c973]/30"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#19c973]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Award className="w-6 h-6 text-[#19c973]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">International Recognition</h3>
                      <p className="text-gray-300 text-sm">
                        Earn certifications and portfolio pieces that are recognized globally. 
                        Stand out to international employers and clients.
                      </p>
                      </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="glass-card p-6 rounded-xl border border-[#19c973]/30"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#19c973]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Users className="w-6 h-6 text-[#19c973]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Global Network</h3>
                      <p className="text-gray-300 text-sm">
                        Connect with professionals from 25+ countries. Build relationships that 
                        open doors to opportunities you never knew existed.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Testimonials Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                What Our <span className="gradient-text">Global Students Say</span>
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Hear from international participants about their transformative global experience
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="glass-card p-6 rounded-xl border border-[#19c973]/30"
                >
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <div className="font-medium text-white">{testimonial.name}</div>
                    <div className="text-sm text-[#19c973]">{testimonial.role}</div>
                  </div>
                </motion.div>
              ))}
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
            <div className="glass-card p-12 rounded-2xl border border-[#19c973]/30">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Go Global with Your Tech Career?
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
                Join our international programs and work with teams from around the world. 
                <span className="text-[#19c973] font-semibold">Next batch starts in 2 weeks.</span> 
                Only 40 spots available globally - secure yours before they're gone!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/enroll">
                  <Button size="lg">
                    Apply for International Programs
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link to="/programs">
                  <Button variant="outline" size="lg">
                    View All Programs
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default InternationalProgramsPage;
