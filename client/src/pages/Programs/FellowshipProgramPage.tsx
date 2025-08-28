import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Users, BookOpen, CheckCircle, Star, Briefcase, Award, Code } from 'lucide-react';
import Button from '../../components/UI/Button';
import SEOComponent from '../../components/SEO/SEOComponent';

const FellowshipProgramPage: React.FC = () => {
  const features = [
    'Real client projects that impact millions of users worldwide',
    'Intimate groups of only 20 students for personalized attention',
    'Build and deploy products that companies actually pay for',
    'Masterclasses from CTOs and tech leads at unicorn startups',
    'Prestigious LORs that get you interviews at top companies',
    'Industry-recognized certification that validates your expertise',
    'Direct networking with hiring managers and tech leaders',
    'Access to our exclusive alumni network of successful professionals'
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
          "duration": "8-12 weeks",
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
            <p className="text-base text-gray-300 max-w-3xl mx-auto mb-8">
              Ready to work on projects that Fortune 500 companies actually use? Our exclusive 8-12 week fellowship 
              puts you in intimate groups of only 20 elite students, working directly with real clients. 
              Master cutting-edge technologies through expert-led masterclasses and earn prestigious LORs 
              that open doors to the world's top tech companies.
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
                Your <span className="gradient-text">8-12 Week Journey</span> to Elite Status
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                An intensive, selective program designed for ambitious learners ready to work on Fortune 500 projects
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Phase 1: Foundation & Masterclasses */}
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
                    Master cutting-edge technologies through expert-led masterclasses
                  </p>
                  <ul className="space-y-3 text-sm text-gray-300">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                      <span>Expert masterclasses from industry leaders</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                      <span>Advanced technical skill development</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                      <span>Intimate group learning (max 20 students)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                      <span>Real-time Q&A with tech experts</span>
                    </li>
                  </ul>
                </div>
              </motion.div>

              {/* Phase 2: Client Projects */}
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
                  <h3 className="text-2xl font-bold text-white mb-4 text-center">Phase 2: Client Projects</h3>
                  <div className="text-[#19c973] font-bold text-lg mb-2 text-center">Weeks 5-10</div>
                  <p className="text-gray-300 text-center mb-6">
                    Work on real Fortune 500 projects that impact millions of users
                  </p>
                  <ul className="space-y-3 text-sm text-gray-300">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                      <span>Real client projects with live feedback</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                      <span>Build & deploy production-ready products</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                      <span>Direct client interaction & requirements</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                      <span>Industry-standard development practices</span>
                    </li>
                  </ul>
                </div>
              </motion.div>

              {/* Phase 3: Capstone & LOR */}
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
                  <h3 className="text-2xl font-bold text-white mb-4 text-center">Phase 3: Capstone</h3>
                  <div className="text-[#19c973] font-bold text-lg mb-2 text-center">Weeks 11-12</div>
                  <p className="text-gray-300 text-center mb-6">
                    Complete your portfolio and earn prestigious LORs
                  </p>
                  <ul className="space-y-3 text-sm text-gray-300">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                      <span>Deep capstone project completion</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                      <span>Professional portfolio presentation</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                      <span>Prestigious LORs from industry experts</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                      <span>Career guidance & networking access</span>
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
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Why <span className="gradient-text">Only 20 Students</span> Get Selected
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                This isn't just another coding bootcamp - it's your gateway to elite tech opportunities
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
                      <Users className="w-6 h-6 text-[#19c973]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Intimate Learning Groups</h3>
                      <p className="text-gray-300 text-sm">
                        Maximum 20 students per batch ensures personalized attention from industry experts. 
                        No hiding in the back row - every question gets answered.
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
                      <Briefcase className="w-6 h-6 text-[#19c973]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Fortune 500 Projects</h3>
                      <p className="text-gray-300 text-sm">
                        Work on projects that companies actually pay for and users actually use. 
                        Build products that impact millions, not just complete assignments.
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
                      <BookOpen className="w-6 h-6 text-[#19c973]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Expert Masterclasses</h3>
                      <p className="text-gray-300 text-sm">
                        Learn from CTOs and tech leads at unicorn startups. Get insights that aren't 
                        available in any textbook or online course.
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
                      <Star className="w-6 h-6 text-[#19c973]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Prestigious LORs</h3>
                      <p className="text-gray-300 text-sm">
                        Earn Letters of Recommendation from industry leaders that open doors 
                        to the world's top tech companies. Your ticket to elite opportunities.
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
                Ready to Join the Elite Tech Fellowship?
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
                Join our structured 8-12 week program: 4 weeks of expert masterclasses + 6 weeks of Fortune 500 projects + 2 weeks of capstone & LORs. 
                <span className="text-[#19c973] font-semibold">Only 20 spots available per batch.</span> 
                Applications close in 10 days.
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
