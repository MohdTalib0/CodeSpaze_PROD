import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Users, BookOpen, CheckCircle, Star, Code } from 'lucide-react';
import Button from '../../components/UI/Button';
import SEOComponent from '../../components/SEO/SEOComponent';

const InternshipProgramPage: React.FC = () => {
  const features = [
    'Real client projects that actually matter to companies',
    '1-on-1 mentorship from senior developers at top tech firms',
    'Professional portfolio that showcases real work, not just theory',
    'Direct access to hiring managers and industry networks',
    'Hands-on workshops that teach skills employers actually want',
    'Industry-recognized certification that opens doors',
    'Personalized job search strategy and interview coaching',
    'Exclusive access to unadvertised job opportunities'
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
      content: 'I learned more in 60-90 days here than in my entire college degree. The real-world projects were game-changing.',
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
        description="Transform your tech career with CodeSpaze's Internship Program. Best internships in Lucknow, Delhi, Mumbai, Bangalore, Hyderabad, Chennai, Pune, Kolkata. Real-world projects, industry mentorship, and career guidance. Join our 60-90 day program today!"
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
          "duration": "3 months",
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
            <p className="text-base text-gray-300 max-w-3xl mx-auto mb-8">
              Tired of theoretical learning that doesn't get you hired? Our 3-month internship program is your fast-track 
              to landing your dream tech job. Work on real client projects, get personalized mentorship from industry experts, 
              and walk away with a professional portfolio that actually impresses employers. 
              <span className="text-[#19c973] font-semibold">95% of our graduates land jobs within 3 months.</span>
            </p>
            
            {/* Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#19c973]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-8 h-8 text-[#19c973]" />
                </div>
                <div className="text-2xl font-bold text-white">3 Months</div>
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
                Your <span className="gradient-text">3-Month Journey</span> to Success
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                A structured, proven path that transforms beginners into job-ready professionals
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Phase 1: Guided Internship */}
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
                  <h3 className="text-2xl font-bold text-white mb-4 text-center">Phase 1: Guided Internship</h3>
                  <div className="text-[#19c973] font-bold text-lg mb-2 text-center">Months 1-2</div>
                  <p className="text-gray-300 text-center mb-6">
                    Master core skills through structured learning and hands-on practice
                  </p>
                  <ul className="space-y-3 text-sm text-gray-300">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                      <span>1-hour live lectures with industry experts</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                      <span>3-4 intensive core sessions weekly</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                      <span>2 lighter reinforcement sessions</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                      <span>Real-time feedback and guidance</span>
                    </li>
                  </ul>
                </div>
              </motion.div>

              {/* Phase 2: Apprenticeship/Project Phase */}
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
                  <h3 className="text-2xl font-bold text-white mb-4 text-center">Phase 2: Real-World Projects</h3>
                  <div className="text-[#19c973] font-bold text-lg mb-2 text-center">Month 3</div>
                  <p className="text-gray-300 text-center mb-6">
                    Apply your skills to actual client projects that matter
                  </p>
                  <ul className="space-y-3 text-sm text-gray-300">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                      <span>Work on live client projects</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                      <span>Build professional portfolio</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                      <span>Receive industry mentorship</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                      <span>Prepare for job interviews</span>
                    </li>
                  </ul>
                </div>
              </motion.div>

              {/* Weekly Schedule */}
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
                    <Clock className="w-8 h-8 text-[#19c973]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 text-center">Weekly Schedule</h3>
                  <div className="text-[#19c973] font-bold text-lg mb-2 text-center">Optimized Learning</div>
                  <p className="text-gray-300 text-center mb-6">
                    Balanced schedule designed for maximum retention and progress
                  </p>
                  <ul className="space-y-3 text-sm text-gray-300">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                      <span>1 hour live lectures daily</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                      <span>3-4 core technical sessions</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                      <span>2 lighter practice sessions</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#19c973] mt-0.5 mr-3 flex-shrink-0" />
                      <span>1 career development session</span>
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
                Why <span className="gradient-text">95% of Our Interns</span> Get Hired
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                We don't just teach you to code - we prepare you for the real world
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
                      <h3 className="text-xl font-bold text-white mb-2">Expert Mentorship</h3>
                      <p className="text-gray-300 text-sm">
                        Get 1-on-1 guidance from senior developers at top tech companies. 
                        Learn industry best practices that aren't taught in textbooks.
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
                      <BookOpen className="w-6 h-6 text-[#19c973]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Live Client Projects</h3>
                      <p className="text-gray-300 text-sm">
                        Work on real projects that companies actually use. Build a portfolio 
                        that showcases your ability to deliver value, not just complete assignments.
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
                      <CheckCircle className="w-6 h-6 text-[#19c973]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">LOR & Certification</h3>
                      <p className="text-gray-300 text-sm">
                        Earn prestigious Letters of Recommendation from industry experts and 
                        a certification that hiring managers recognize and respect.
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
                      <h3 className="text-xl font-bold text-white mb-2">Career Support</h3>
                      <p className="text-gray-300 text-sm">
                        From resume building to interview preparation, we support you until 
                        you land your dream job. Our network opens doors that stay closed to others.
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
                Ready to Transform Your Career in Just 3 Months?
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
                Join our structured 3-month program: 2 months of guided learning + 1 month of real client projects. 
                <span className="text-[#19c973] font-semibold">Next batch starts in 2 weeks.</span> 
                Only 25 spots available - secure yours before they're gone.
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
