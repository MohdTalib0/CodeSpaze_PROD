import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Users, BookOpen, CheckCircle, Star } from 'lucide-react';
import Button from '../../components/UI/Button';
import SEOComponent from '../../components/SEO/SEOComponent';

const InternshipProgramPage: React.FC = () => {
  const features = [
    'Real-world project experience',
    'Industry mentorship',
    'Portfolio building',
    'Career guidance & networking',
    'Skill development workshops',
    'Certificate upon completion',
    'Job placement assistance',
    'Access to exclusive resources'
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Software Engineer at Google',
      content: 'The internship program gave me hands-on experience that directly led to my current role. The mentors were incredibly supportive.',
      rating: 5
    },
    {
      name: 'Alex Chen',
      role: 'Full-Stack Developer at Microsoft',
      content: 'I learned more in 4 months here than in my entire college degree. The real-world projects were game-changing.',
      rating: 5
    },
    {
      name: 'Maria Rodriguez',
      role: 'Data Scientist at Amazon',
      content: 'The program structure and mentorship helped me transition from a different field into tech successfully.',
      rating: 5
    }
  ];

  return (
    <>
      <SEOComponent
        title="Best Internship Program in Lucknow, Delhi, Mumbai | CodeSpaze Tech Internships"
        description="Transform your tech career with CodeSpaze's Internship Program. Best internships in Lucknow, Delhi, Mumbai, Bangalore, Hyderabad, Chennai, Pune, Kolkata. Real-world projects, industry mentorship, and career guidance. Join our 3-4 month program today!"
        keywords="best internship in Lucknow, best internship in Delhi, best internship in Mumbai, best internship in Bangalore, best internship in Hyderabad, best internship in Chennai, best internship in Pune, best internship in Kolkata, tech internship, software internship, AI internship, web development internship, app development internship, computer science internship, engineering internship, IT internship, digital marketing internship, data science internship, cloud computing internship, cybersecurity internship, blockchain internship, game development internship, UI/UX design internship, graphic design internship, content writing internship, SEO internship, mobile development internship, DevOps internship, full stack development internship, Python internship, React internship, JavaScript internship, Java internship, C++ internship, Node.js internship, MongoDB internship, SQL internship, AWS internship, Azure internship, Google Cloud internship, startup internship, fintech internship, edtech internship, healthtech internship, ecommerce internship, SaaS internship, B2B internship, B2C internship, product management internship, project management internship, business development internship, sales internship, marketing internship, customer success internship, operations internship, finance internship, HR internship, legal internship, research internship, academic internship, university internship, college internship, student internship, graduate internship, postgraduate internship, PhD internship, master's internship, bachelor's internship, diploma internship, certificate internship, online internship, virtual internship, hybrid internship, part-time internship, full-time internship, paid internship, unpaid internship, stipend internship, competitive internship, selective internship, prestigious internship, top internship, leading internship, innovative internship, cutting-edge internship, future-focused internship, industry-relevant internship, practical internship, hands-on internship, project-based internship, real-world internship, professional internship, career-focused internship, skill-building internship, knowledge-enhancing internship, experience-gaining internship, networking internship, mentorship internship, guidance internship, support internship, community internship, collaborative internship, team internship, individual internship, creative internship, analytical internship, technical internship, business internship, design internship, development internship, engineering internship, science internship, mathematics internship, statistics internship, economics internship, finance internship, accounting internship, management internship, leadership internship, entrepreneurship internship, innovation internship, research internship, analysis internship, strategy internship, planning internship, execution internship, implementation internship, testing internship, quality assurance internship, user experience internship, customer experience internship, product internship, service internship, solution internship, platform internship, application internship, system internship, infrastructure internship, architecture internship, testing internship, deployment internship, maintenance internship, support internship, training internship, education internship, learning internship, teaching internship, coaching internship, mentoring internship, consulting internship, advisory internship, strategic internship, tactical internship, operational internship, administrative internship, executive internship, senior internship, junior internship, entry-level internship, experienced internship, skilled internship, qualified internship, certified internship, accredited internship, recognized internship, established internship, reputable internship, trusted internship, reliable internship"
        canonicalUrl="https://codespaze.org/programs/internship"
        location="Lucknow"
        programType="Internship Program"
        isLocal={true}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "EducationalProgram",
          "name": "CodeSpaze Internship Program",
          "description": "Transform your tech career with CodeSpaze's Internship Program. Real-world projects, industry mentorship, and career guidance.",
          "provider": {
            "@type": "EducationalOrganization",
            "name": "CodeSpaze",
            "url": "https://codespaze.org"
          },
          "programType": "Internship",
          "duration": "3-4 months",
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
            "description": "Tech Internship Program with real-world projects and mentorship",
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
                Internship Program
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Internship <span className="gradient-text">Program</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Mentored, project-based learning with real-world deliverables. 
              Transform your theoretical knowledge into practical skills through hands-on experience.
            </p>
            
            {/* Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#19c973]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-8 h-8 text-[#19c973]" />
                </div>
                <div className="text-2xl font-bold text-white">3-4 Months</div>
                <div className="text-gray-400">Duration</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#19c973]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-8 h-8 text-[#19c973]" />
                </div>
                <div className="text-2xl font-bold text-white">1:1</div>
                <div className="text-gray-400">Mentorship</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#19c973]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <BookOpen className="w-8 h-8 text-[#19c973]" />
                </div>
                <div className="text-2xl font-bold text-white">Real Projects</div>
                <div className="text-gray-400">Portfolio</div>
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
                What You'll <span className="gradient-text">Learn</span>
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Comprehensive learning experience designed for real-world application
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
                What Our <span className="gradient-text">Interns Say</span>
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Hear from past participants about their transformative experience
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
                Ready to Start Your <span className="gradient-text">Journey?</span>
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
                Join hundreds of successful interns who have transformed their careers 
                through our comprehensive program.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/enroll">
                  <Button size="lg">
                    Enroll in Internship Program
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

export default InternshipProgramPage;
