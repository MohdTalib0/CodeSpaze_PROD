import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Users, BookOpen, CheckCircle, Star, Briefcase, Award } from 'lucide-react';
import Button from '../../components/UI/Button';
import SEOComponent from '../../components/SEO/SEOComponent';

const FellowshipProgramPage: React.FC = () => {
  const features = [
    'Client project experience',
    'Industry evaluations',
    'Mentor reviews',
    'Portfolio development',
    'Skill validation',
    'Certificate upon completion',
    'Career guidance',
    'Networking opportunities'
  ];

  const testimonials = [
    {
      name: 'Rahul Verma',
      role: 'Senior Developer at TCS',
      content: 'The fellowship program gave me real client experience that was invaluable for my career growth. The mentorship was exceptional.',
      rating: 5
    },
    {
      name: 'Sarah Johnson',
      role: 'Product Manager at Infosys',
      content: 'Working on actual client projects during the fellowship helped me understand real-world challenges and solutions.',
      rating: 5
    },
    {
      name: 'Amit Patel',
      role: 'Tech Lead at Wipro',
      content: 'The program structure and client interactions prepared me perfectly for the corporate world.',
      rating: 5
    }
  ];

  return (
    <>
      <SEOComponent
        title="Best Fellowship Program in Lucknow, Delhi, Mumbai | CodeSpaze Tech Fellowships"
        description="Transform your tech career with CodeSpaze's Fellowship Program. Best fellowships in Lucknow, Delhi, Mumbai, Bangalore, Hyderabad, Chennai, Pune, Kolkata. Client projects, industry evaluations, and mentor reviews. Join our 10-12 week selective program today!"
        keywords="best fellowship in Lucknow, best fellowship in Delhi, best fellowship in Mumbai, best fellowship in Bangalore, best fellowship in Hyderabad, best fellowship in Chennai, best fellowship in Pune, best fellowship in Kolkata, tech fellowship, software fellowship, AI fellowship, web development fellowship, app development fellowship, computer science fellowship, engineering fellowship, IT fellowship, digital marketing fellowship, data science fellowship, cloud computing fellowship, cybersecurity fellowship, blockchain fellowship, game development fellowship, UI/UX design fellowship, graphic design fellowship, content writing fellowship, SEO fellowship, mobile development fellowship, DevOps fellowship, full stack development fellowship, Python fellowship, React fellowship, JavaScript fellowship, Java fellowship, C++ fellowship, Node.js fellowship, MongoDB fellowship, SQL fellowship, AWS fellowship, Azure fellowship, Google Cloud fellowship, startup fellowship, fintech fellowship, edtech fellowship, healthtech fellowship, ecommerce fellowship, SaaS fellowship, B2B fellowship, B2C fellowship, product management fellowship, project management fellowship, business development fellowship, sales fellowship, marketing fellowship, customer success fellowship, operations fellowship, finance fellowship, HR fellowship, legal fellowship, research fellowship, academic fellowship, university fellowship, college fellowship, student fellowship, graduate fellowship, postgraduate fellowship, PhD fellowship, master's fellowship, bachelor's fellowship, diploma fellowship, certificate fellowship, online fellowship, virtual fellowship, hybrid fellowship, part-time fellowship, full-time fellowship, paid fellowship, unpaid fellowship, stipend fellowship, competitive fellowship, selective fellowship, prestigious fellowship, top fellowship, leading fellowship, innovative fellowship, cutting-edge fellowship, future-focused fellowship, industry-relevant fellowship, practical fellowship, hands-on fellowship, project-based fellowship, real-world fellowship, professional fellowship, career-focused fellowship, skill-building fellowship, knowledge-enhancing fellowship, experience-gaining fellowship, networking fellowship, mentorship fellowship, guidance fellowship, support fellowship, community fellowship, collaborative fellowship, team fellowship, individual fellowship, creative fellowship, analytical fellowship, technical fellowship, business fellowship, design fellowship, development fellowship, engineering fellowship, science fellowship, mathematics fellowship, statistics fellowship, economics fellowship, finance fellowship, accounting fellowship, management fellowship, leadership fellowship, entrepreneurship fellowship, innovation fellowship, research fellowship, analysis fellowship, strategy fellowship, planning fellowship, execution fellowship, implementation fellowship, testing fellowship, quality assurance fellowship, user experience fellowship, customer experience fellowship, product fellowship, service fellowship, solution fellowship, platform fellowship, application fellowship, system fellowship, infrastructure fellowship, architecture fellowship, testing fellowship, deployment fellowship, maintenance fellowship, support fellowship, training fellowship, education fellowship, learning fellowship, teaching fellowship, coaching fellowship, mentoring fellowship, consulting fellowship, advisory fellowship, strategic fellowship, tactical fellowship, operational fellowship, administrative fellowship, executive fellowship, senior fellowship, junior fellowship, entry-level fellowship, experienced fellowship, skilled fellowship, qualified fellowship, certified fellowship, accredited fellowship, recognized fellowship, established fellowship, reputable fellowship, trusted fellowship, reliable fellowship"
        canonicalUrl="https://codespaze.org/programs/fellowship"
        location="Lucknow"
        programType="Fellowship Program"
        isLocal={true}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "EducationalProgram",
          "name": "CodeSpaze Fellowship Program",
          "description": "Transform your tech career with CodeSpaze's Fellowship Program. Client projects, industry evaluations, and mentor reviews.",
          "provider": {
            "@type": "EducationalOrganization",
            "name": "CodeSpaze",
            "url": "https://codespaze.org"
          },
          "programType": "Fellowship",
          "duration": "10-12 weeks",
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
            "description": "Tech Fellowship Program with client projects and industry evaluations",
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
                Fellowship Program
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Fellowship <span className="gradient-text">Program</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Client projects, evaluations, mentor reviews. A selective program designed 
              for ambitious learners ready to work on real-world challenges.
            </p>
            
            {/* Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#19c973]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-8 h-8 text-[#19c973]" />
                </div>
                <div className="text-2xl font-bold text-white">10-12 Weeks</div>
                <div className="text-gray-400">Duration</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#19c973]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Briefcase className="w-8 h-8 text-[#19c973]" />
                </div>
                <div className="text-2xl font-bold text-white">Client Projects</div>
                <div className="text-gray-400">Real Work</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#19c973]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="w-8 h-8 text-[#19c973]" />
                </div>
                <div className="text-2xl font-bold text-white">Selective</div>
                <div className="text-gray-400">Admission</div>
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
                What Our <span className="gradient-text">Fellows Say</span>
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
                Ready to Join the <span className="gradient-text">Elite?</span>
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
                Join our selective fellowship program and work on real client projects 
                with industry mentorship and evaluations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/enroll">
                  <Button size="lg">
                    Apply for Fellowship
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

export default FellowshipProgramPage;
