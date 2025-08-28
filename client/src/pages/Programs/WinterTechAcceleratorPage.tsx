import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Users, BookOpen, CheckCircle, Star, Zap, Snowflake, Code } from 'lucide-react';
import Button from '../../components/UI/Button';
import SEOComponent from '../../components/SEO/SEOComponent';

const WinterTechAcceleratorPage: React.FC = () => {
  const features = [
    'Intensive daily learning sessions (6-8 hours)',
    'Real-world projects that showcase your skills',
    '1-on-1 mentorship from industry professionals',
    'Professional portfolio that impresses employers',
    'Hands-on skill development with modern tools',
    'Industry-recognized certification upon completion',
    'Personalized career guidance and job prep',
    'Access to our network of tech professionals'
  ];

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      role: 'Backend Developer at Cognizant',
      content: 'The winter accelerator was perfect for my semester break. I gained practical skills and built a strong portfolio.',
      rating: 5
    },
    {
      name: 'Neha Sharma',
      role: 'UI/UX Designer at Persistent Systems',
      content: 'The intensive winter program helped me transition from design theory to practical application quickly.',
      rating: 5
    },
    {
      name: 'Arun Singh',
      role: 'Full-Stack Developer at L&T Infotech',
      content: 'Great way to spend winter break! I learned more in 6 weeks than in months of online courses.',
      rating: 5
    }
  ];

  return (
    <>
      <SEOComponent
        title="Best Winter Tech Accelerator in Lucknow, Delhi, Mumbai | CodeSpaze Winter Programs"
        description="Transform your tech career with CodeSpaze's Winter Tech Accelerator. Best winter programs in Lucknow, Delhi, Mumbai, Bangalore, Hyderabad, Chennai, Pune, Kolkata. Intensive winter learning with project-based curriculum. Join our 4-6 week winter program today!"
        keywords="best winter tech accelerator in Lucknow, best winter tech accelerator in Delhi, best winter tech accelerator in Mumbai, best winter tech accelerator in Bangalore, best winter tech accelerator in Hyderabad, best winter tech accelerator in Chennai, best winter tech accelerator in Pune, best winter tech accelerator in Kolkata, winter tech program, winter coding bootcamp, winter software development, winter AI/ML program, winter web development, winter app development, winter data science, winter cybersecurity, winter cloud computing, winter blockchain, winter game development, winter UI/UX design, winter graphic design, winter digital marketing, winter content writing, winter SEO training, winter mobile development, winter DevOps, winter full stack development, winter Python, winter React, winter JavaScript, winter Java, winter C++, winter Node.js, winter MongoDB, winter SQL, winter AWS, winter Azure, winter Google Cloud, winter startup program, winter fintech, winter edtech, winter healthtech, winter ecommerce, winter SaaS, winter B2B, winter B2C, winter product management, winter project management, winter business development, winter sales, winter marketing, winter customer success, winter operations, winter finance, winter HR, winter legal, winter research, winter academic, winter university, winter college, winter student, winter graduate, winter postgraduate, winter PhD, winter master's, winter bachelor's, winter diploma, winter certificate, winter online, winter virtual, winter hybrid, winter part-time, winter full-time, winter paid, winter unpaid, winter stipend, winter competitive, winter selective, winter prestigious, winter top, winter leading, winter innovative, winter cutting-edge, winter future-focused, winter industry-relevant, winter practical, winter hands-on, winter project-based, winter real-world, winter professional, winter career-focused, winter skill-building, winter knowledge-enhancing, winter experience-gaining, winter networking, winter mentorship, winter guidance, winter support, winter community, winter collaborative, winter team, winter individual, winter creative, winter analytical, winter technical, winter business, winter design, winter development, winter engineering, winter science, winter mathematics, winter statistics, winter economics, winter finance, winter accounting, winter management, winter leadership, winter entrepreneurship, winter innovation, winter research, winter analysis, winter strategy, winter planning, winter execution, winter implementation, winter testing, winter quality assurance, winter user experience, winter customer experience, winter product, winter service, winter solution, winter platform, winter application, winter system, winter infrastructure, winter architecture, winter testing, winter deployment, winter maintenance, winter support, winter training, winter education, winter learning, winter teaching, winter coaching, winter mentoring, winter consulting, winter advisory, winter strategic, winter tactical, winter operational, winter administrative, winter executive, winter senior, winter junior, winter entry-level, winter experienced, winter skilled, winter qualified, winter certified, winter accredited, winter recognized, winter established, winter reputable, winter trusted, winter reliable"
        canonicalUrl="https://codespaze.org/programs/winter-tech-accelerator"
        location="Lucknow"
        programType="Winter Tech Accelerator"
        isLocal={true}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "EducationalProgram",
          "name": "CodeSpaze Winter Tech Accelerator",
          "description": "Transform your tech career with CodeSpaze's Winter Tech Accelerator. Intensive winter learning with project-based curriculum.",
          "provider": {
            "@type": "EducationalOrganization",
            "name": "CodeSpaze",
            "url": "https://codespaze.org"
          },
          "programType": "Winter Accelerator",
          "duration": "4-6 weeks",
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
            "description": "Winter Tech Accelerator Program with intensive winter learning",
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
                Winter Tech Accelerator
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Winter Tech <span className="gradient-text">Accelerator</span>
            </h1>
            <p className="text-base text-gray-300 max-w-3xl mx-auto mb-8">
              Don't waste your winter break! Our intensive 4-6 week accelerator transforms you from beginner to 
              job-ready developer. Work on real projects, learn from industry experts, and build a portfolio 
              that gets you hired. <span className="text-[#19c973] font-semibold">Perfect for students and career changers.</span>
            </p>
            
            {/* Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#19c973]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-8 h-8 text-[#19c973]" />
                </div>
                <div className="text-2xl font-bold text-white">4-6 Weeks</div>
                <div className="text-gray-400">Duration</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#19c973]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Zap className="w-8 h-8 text-[#19c973]" />
                </div>
                <div className="text-2xl font-bold text-white">Fast-Paced</div>
                <div className="text-gray-400">Learning</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#19c973]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Snowflake className="w-8 h-8 text-[#19c973]" />
                </div>
                <div className="text-2xl font-bold text-white">Winter</div>
                <div className="text-gray-400">Program</div>
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
                Intensive winter learning designed for rapid skill development
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
                Your <span className="gradient-text">4-6 Week Journey</span> to Tech Mastery
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                An intensive, structured program that maximizes your winter break for career transformation
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Week 1-2: Foundation */}
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
                  <h3 className="text-2xl font-bold text-white mb-4 text-center">Weeks 1-2: Foundation</h3>
                  <div className="text-[#19c973] font-bold text-lg mb-2 text-center">Core Skills</div>
                  <p className="text-gray-300 text-center mb-6">
                    Master fundamental technologies and development principles
                  </p>
                  <ul className="space-y-3 text-sm text-gray-300">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                      <span>6-8 hours daily intensive learning</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                      <span>Core technology fundamentals</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                      <span>Hands-on coding exercises</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                      <span>1-on-1 mentorship sessions</span>
                    </li>
                  </ul>
                </div>
              </motion.div>

              {/* Week 3-4: Projects */}
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
                  <h3 className="text-2xl font-bold text-white mb-4 text-center">Weeks 3-4: Projects</h3>
                  <div className="text-[#19c973] font-bold text-lg mb-2 text-center">Real Applications</div>
                  <p className="text-gray-300 text-center mb-6">
                    Build real-world projects that showcase your skills
                  </p>
                  <ul className="space-y-3 text-sm text-gray-300">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                      <span>Real client project work</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                      <span>Portfolio development</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                      <span>Industry best practices</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                      <span>Code review & optimization</span>
                    </li>
                  </ul>
                </div>
              </motion.div>

              {/* Week 5-6: Mastery */}
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
                  <h3 className="text-2xl font-bold text-white mb-4 text-center">Weeks 5-6: Mastery</h3>
                  <div className="text-[#19c973] font-bold text-lg mb-2 text-center">Advanced Skills</div>
                  <p className="text-gray-300 text-center mb-6">
                    Advanced concepts and career preparation
                  </p>
                  <ul className="space-y-3 text-sm text-gray-300">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                      <span>Advanced technology concepts</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                      <span>Portfolio presentation</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                      <span>Career guidance & prep</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                      <span>Job search strategies</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
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
                What Our <span className="gradient-text">Winter Students Say</span>
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Hear from past participants about their transformative winter experience
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
                Ready to Transform Your Winter Break?
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
                While others waste their winter break, you'll be building real projects and learning from industry experts. 
                <span className="text-[#19c973] font-semibold">Next batch starts in 2 weeks.</span> 
                Only 30 spots available - secure yours before winter begins!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/enroll">
                  <Button size="lg">
                    Enroll in Winter Accelerator
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

export default WinterTechAcceleratorPage;
