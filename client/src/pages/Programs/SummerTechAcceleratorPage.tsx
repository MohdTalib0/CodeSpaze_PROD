import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Users, BookOpen, CheckCircle, Star, Zap, Sun, Code } from 'lucide-react';
import Button from '../../components/UI/Button';
import SEOComponent from '../../components/SEO/SEOComponent';

const SummerTechAcceleratorPage: React.FC = () => {
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
      name: 'Anjali Singh',
      role: 'Frontend Developer at HCL',
      content: 'The summer accelerator was intense but incredibly rewarding. I learned more in 6 weeks than in months of self-study.',
      rating: 5
    },
    {
      name: 'Vikram Mehta',
      role: 'Software Engineer at Tech Mahindra',
      content: 'The fast-paced environment and real projects helped me transition from theory to practical development quickly.',
      rating: 5
    },
    {
      name: 'Priya Reddy',
      role: 'Full-Stack Developer at Mindtree',
      content: 'Perfect for summer break! I gained valuable skills and a portfolio that helped me land my first job.',
      rating: 5
    }
  ];

  return (
    <>
      <SEOComponent
        title="Best Summer Tech Accelerator in Lucknow, Delhi, Mumbai | CodeSpaze Summer Programs"
        description="Transform your tech career with CodeSpaze's Summer Tech Accelerator. Best summer programs in Lucknow, Delhi, Mumbai, Bangalore, Hyderabad, Chennai, Pune, Kolkata. Fast-paced, project-based summer learning program. Join our 4-6 week intensive program today!"
        keywords="best summer tech accelerator in Lucknow, best summer tech accelerator in Delhi, best summer tech accelerator in Mumbai, best summer tech accelerator in Bangalore, best summer tech accelerator in Hyderabad, best summer tech accelerator in Chennai, best summer tech accelerator in Pune, best summer tech accelerator in Kolkata, summer tech program, summer coding bootcamp, summer software development, summer AI/ML program, summer web development, summer app development, summer data science, summer cybersecurity, summer cloud computing, summer blockchain, summer game development, summer UI/UX design, summer graphic design, summer digital marketing, summer content writing, summer SEO training, summer mobile development, summer DevOps, summer full stack development, summer Python, summer React, summer JavaScript, summer Java, summer C++, summer Node.js, summer MongoDB, summer SQL, summer AWS, summer Azure, summer Google Cloud, summer startup program, summer fintech, summer edtech, summer healthtech, summer ecommerce, summer SaaS, summer B2B, summer B2C, summer product management, summer project management, summer business development, summer sales, summer marketing, summer customer success, summer operations, summer finance, summer HR, summer legal, summer research, summer academic, summer university, summer college, summer student, summer graduate, summer postgraduate, summer PhD, summer master's, summer bachelor's, summer diploma, summer certificate, summer online, summer virtual, summer hybrid, summer part-time, summer full-time, summer paid, summer unpaid, summer stipend, summer competitive, summer selective, summer prestigious, summer top, summer leading, summer innovative, summer cutting-edge, summer future-focused, summer industry-relevant, summer practical, summer hands-on, summer project-based, summer real-world, summer professional, summer career-focused, summer skill-building, summer knowledge-enhancing, summer experience-gaining, summer networking, summer mentorship, summer guidance, summer support, summer community, summer collaborative, summer team, summer individual, summer creative, summer analytical, summer technical, summer business, summer design, summer development, summer engineering, summer science, summer mathematics, summer statistics, summer economics, summer finance, summer accounting, summer management, summer leadership, summer entrepreneurship, summer innovation, summer research, summer analysis, summer strategy, summer planning, summer execution, summer implementation, summer testing, summer quality assurance, summer user experience, summer customer experience, summer product, summer service, summer solution, summer platform, summer application, summer system, summer infrastructure, summer architecture, summer testing, summer deployment, summer maintenance, summer support, summer training, summer education, summer learning, summer teaching, summer coaching, summer mentoring, summer consulting, summer advisory, summer strategic, summer tactical, summer operational, summer administrative, summer executive, summer senior, summer junior, summer entry-level, summer experienced, summer skilled, summer qualified, summer certified, summer accredited, summer recognized, summer established, summer reputable, summer trusted, summer reliable"
        canonicalUrl="https://codespaze.org/programs/summer-tech-accelerator"
        location="Lucknow"
        programType="Summer Tech Accelerator"
        isLocal={true}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "EducationalProgram",
          "name": "CodeSpaze Summer Tech Accelerator",
          "description": "Transform your tech career with CodeSpaze's Summer Tech Accelerator. Fast-paced, project-based summer learning program.",
          "provider": {
            "@type": "EducationalOrganization",
            "name": "CodeSpaze",
            "url": "https://codespaze.org"
          },
          "programType": "Summer Accelerator",
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
            "description": "Summer Tech Accelerator Program with fast-paced, project-based learning",
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
                Summer Tech Accelerator
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Summer Tech <span className="gradient-text">Accelerator</span>
            </h1>
            <p className="text-base text-gray-300 max-w-3xl mx-auto mb-8">
              Don't waste your summer break! Our intensive 4-6 week accelerator transforms you from beginner to 
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
                  <Sun className="w-8 h-8 text-[#19c973]" />
                </div>
                <div className="text-2xl font-bold text-white">Summer</div>
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
                Intensive summer learning designed for rapid skill development
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
                An intensive, structured program that maximizes your summer break for career transformation
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
                What Our <span className="gradient-text">Summer Students Say</span>
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Hear from past participants about their transformative summer experience
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
                Ready to Transform Your Summer Break?
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
                While others waste their summer, you'll be building real projects and learning from industry experts. 
                <span className="text-[#19c973] font-semibold">Next batch starts in 2 weeks.</span> 
                Only 30 spots available - secure yours before summer begins!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/enroll">
                  <Button size="lg">
                    Enroll in Summer Accelerator
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

export default SummerTechAcceleratorPage;
