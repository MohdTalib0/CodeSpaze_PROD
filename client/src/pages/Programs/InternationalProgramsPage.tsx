import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Users, BookOpen, CheckCircle, Star, Globe, Plane, Trophy } from 'lucide-react';
import Button from '../../components/UI/Button';
import SEOComponent from '../../components/SEO/SEOComponent';

const InternationalProgramsPage: React.FC = () => {
  const programs = [
    {
      name: 'International Internships (Remote, Cross-Border)',
      duration: '3-6 months',
      description: 'Remote internships with international companies, cross-border collaboration, and global networking opportunities.',
      features: ['Remote work experience', 'International exposure', 'Cross-cultural collaboration', 'Global networking']
    },
    {
      name: 'Remote Apprenticeship Residency',
      duration: '3-6 months',
      description: 'Intensive remote apprenticeship with international mentors and real-world projects.',
      features: ['International mentorship', 'Real-world projects', 'Remote collaboration', 'Global portfolio']
    },
    {
      name: 'Global Career Accelerator',
      duration: '8-12 weeks',
      description: 'Multilingual program designed for global career advancement and international job opportunities.',
      features: ['Multilingual support', 'Global career guidance', 'International job prep', 'Cultural awareness']
    },
    {
      name: 'International Hackathon Series',
      duration: 'Monthly',
      description: 'Monthly international hackathons with global teams and real-world problem solving.',
      features: ['Global teams', 'Real-world problems', 'International prizes', 'Networking events']
    }
  ];

  const testimonials = [
    {
      name: 'Carlos Rodriguez',
      role: 'Software Engineer at Google',
      content: 'The international internship program gave me exposure to global tech practices and helped me land a role at Google.',
      rating: 5
    },
    {
      name: 'Yuki Tanaka',
      role: 'Product Manager at Microsoft',
      content: 'Working with international teams during the remote apprenticeship was an invaluable experience for my career.',
      rating: 5
    },
    {
      name: 'Ahmed Hassan',
      role: 'Data Scientist at Amazon',
      content: 'The global career accelerator helped me understand international job markets and prepare for global opportunities.',
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
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Remote, cross-border opportunities that connect you with the global tech community. 
              Experience international collaboration, cultural exchange, and worldwide networking.
            </p>
            
            {/* Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#19c973]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Globe className="w-8 h-8 text-[#19c973]" />
                </div>
                <div className="text-2xl font-bold text-white">Global</div>
                <div className="text-gray-400">Reach</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#19c973]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Plane className="w-8 h-8 text-[#19c973]" />
                </div>
                <div className="text-2xl font-bold text-white">Remote</div>
                <div className="text-gray-400">Access</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#19c973]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Trophy className="w-8 h-8 text-[#19c973]" />
                </div>
                <div className="text-2xl font-bold text-white">Cross-Border</div>
                <div className="text-gray-400">Collaboration</div>
              </div>
            </div>
          </motion.div>

          {/* Programs Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Our <span className="gradient-text">International Programs</span>
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Choose from our range of global programs designed for international collaboration
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {programs.map((program, index) => (
                <motion.div
                  key={program.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="glass-card p-8 rounded-2xl border border-[#19c973]/30"
                >
                  <div className="flex items-start mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-[#19c973] to-[#16a362] rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                      <Globe className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">{program.name}</h3>
                      <p className="text-gray-300 mb-2">{program.description}</p>
                      <div className="flex items-center text-[#19c973] text-sm">
                        <Clock className="w-4 h-4 mr-2" />
                        {program.duration}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    {program.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-gray-300">
                        <CheckCircle className="w-5 h-5 text-[#19c973] mr-3 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button className="w-full">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
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
                What Our <span className="gradient-text">Global Students Say</span>
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Hear from international participants about their cross-border experience
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
                Ready to Go <span className="gradient-text">Global?</span>
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
                Join our international programs and connect with the global tech community. 
                Experience cross-border collaboration and build a worldwide network.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/enroll">
                  <Button size="lg">
                    Explore International Programs
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
