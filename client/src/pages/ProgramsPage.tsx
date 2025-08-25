import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Star, Users, Award, Zap, Globe, Target, Clock, BookOpen, Briefcase } from 'lucide-react';
import Button from '../components/UI/Button';
import SEOComponent from '../components/SEO/SEOComponent';

const ProgramsPage: React.FC = () => {
  const programs = [
    {
      name: 'Internship Program',
      duration: '60-90 days',
      description: 'Mentored, project-based learning with real-world deliverables.',
      features: ['Real-world project experience', 'Industry mentorship', 'Portfolio building', 'Career guidance & networking'],
      icon: Users,
      link: '/programs/internship',
      color: 'from-[#19c973] to-[#16a362]'
    },
    {
      name: 'Fellowship Program',
      duration: '10-12 weeks',
      description: 'Client projects, evaluations, mentor reviews.',
      features: ['Client project experience', 'Industry evaluations', 'Mentor reviews', 'Portfolio development'],
      icon: Award,
      link: '/programs/fellowship',
      color: 'from-[#16a362] to-[#19c973]'
    },
    {
      name: 'Summer Tech Accelerator',
      duration: '4-6 weeks',
      description: 'Fast-paced, project-based summer learning program.',
      features: ['Fast-paced learning', 'Project-based curriculum', 'Industry mentorship', 'Portfolio building'],
      icon: Zap,
      link: '/programs/summer-tech-accelerator',
      color: 'from-[#19c973] to-[#1edb7f]'
    },
    {
      name: 'Winter Tech Accelerator',
      duration: '4-6 weeks',
      description: 'Intensive winter learning with project-based curriculum.',
      features: ['Intensive winter learning', 'Project-based curriculum', 'Industry mentorship', 'Portfolio building'],
      icon: Target,
      link: '/programs/winter-tech-accelerator',
      color: 'from-[#1edb7f] to-[#19c973]'
    },
    {
      name: 'International Programs',
      duration: '3-12 months',
      description: 'Remote, cross-border opportunities with global tech community.',
      features: ['Remote internships', 'Global networking', 'Cross-border collaboration', 'International exposure'],
      icon: Globe,
      link: '/programs/international-programs',
      color: 'from-[#19c973] to-[#16a362]'
    }
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Software Engineer at Google',
      content: 'CodeSpaze programs transformed my career. The hands-on experience and mentorship were invaluable.',
      rating: 5
    },
    {
      name: 'Alex Chen',
      role: 'Full-Stack Developer at Microsoft',
      content: 'I learned more in 60-90 days here than in my entire college degree. Real-world projects were game-changing.',
      rating: 5
    },
    {
      name: 'Maria Rodriguez',
      role: 'Data Scientist at Amazon',
      content: 'The program structure and mentorship helped me transition into tech successfully.',
      rating: 5
    }
  ];

  return (
    <>
      <SEOComponent
        title="Best Tech Programs in Lucknow, Delhi, Mumbai | CodeSpaze Internships & Accelerators"
        description="Transform your tech career with CodeSpaze's comprehensive programs. Best tech programs in Lucknow, Delhi, Mumbai, Bangalore, Hyderabad, Chennai, Pune, Kolkata. Internships, fellowships, tech accelerators, and international programs. Start your journey today!"
        keywords="best tech programs in Lucknow, best tech programs in Delhi, best tech programs in Mumbai, best tech programs in Bangalore, best tech programs in Hyderabad, best tech programs in Chennai, best tech programs in Pune, best tech programs in Kolkata, tech programs, internship programs, fellowship programs, tech accelerator programs, summer tech programs, winter tech programs, international tech programs, coding bootcamps, software development programs, AI/ML programs, web development programs, app development programs, data science programs, cybersecurity programs, cloud computing programs, blockchain programs, game development programs, UI/UX design programs, graphic design programs, digital marketing programs, content writing programs, SEO programs, mobile development programs, DevOps programs, full stack development programs, Python programs, React programs, JavaScript programs, Java programs, C++ programs, Node.js programs, MongoDB programs, SQL programs, AWS programs, Azure programs, Google Cloud programs, startup programs, fintech programs, edtech programs, healthtech programs, ecommerce programs, SaaS programs, B2B programs, B2C programs, product management programs, project management programs, business development programs, sales programs, marketing programs, customer success programs, operations programs, finance programs, HR programs, legal programs, research programs, academic programs, university programs, college programs, student programs, graduate programs, postgraduate programs, PhD programs, master's programs, bachelor's programs, diploma programs, certificate programs, online programs, virtual programs, hybrid programs, part-time programs, full-time programs, paid programs, unpaid programs, stipend programs, competitive programs, selective programs, prestigious programs, top programs, leading programs, innovative programs, cutting-edge programs, future-focused programs, industry-relevant programs, practical programs, hands-on programs, project-based programs, real-world programs, professional programs, career-focused programs, skill-building programs, knowledge-enhancing programs, experience-gaining programs, networking programs, mentorship programs, guidance programs, support programs, community programs, collaborative programs, team programs, individual programs, creative programs, analytical programs, technical programs, business programs, design programs, development programs, engineering programs, science programs, mathematics programs, statistics programs, economics programs, finance programs, accounting programs, management programs, leadership programs, entrepreneurship programs, innovation programs, research programs, analysis programs, strategy programs, planning programs, execution programs, implementation programs, testing programs, quality assurance programs, user experience programs, customer experience programs, product programs, service programs, solution programs, platform programs, application programs, system programs, infrastructure programs, architecture programs, testing programs, deployment programs, maintenance programs, support programs, training programs, education programs, learning programs, teaching programs, coaching programs, mentoring programs, consulting programs, advisory programs, strategic programs, tactical programs, operational programs, administrative programs, executive programs, senior programs, junior programs, entry-level programs, experienced programs, skilled programs, qualified programs, certified programs, accredited programs, recognized programs, established programs, reputable programs, trusted programs, reliable programs"
        canonicalUrl="https://codespaze.org/programs"
        location="Lucknow"
        programType="Tech Programs"
        isLocal={true}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "CodeSpaze Tech Programs",
          "description": "Comprehensive tech programs including internships, fellowships, tech accelerators, and international programs",
          "provider": {
            "@type": "EducationalOrganization",
            "name": "CodeSpaze",
            "url": "https://codespaze.org"
          },
          "itemListElement": [
            {
              "@type": "EducationalProgram",
              "name": "Internship Program",
              "description": "60-90 day mentored, project-based learning program"
            },
            {
              "@type": "EducationalProgram",
              "name": "Fellowship Program",
              "description": "10-12 week client project and evaluation program"
            },
            {
              "@type": "EducationalProgram",
              "name": "Tech Accelerator",
              "description": "4-6 week intensive tech learning program"
            }
          ]
        }}
      />
      <div className="min-h-screen py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our <span className="gradient-text">Programs</span>
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Discover our comprehensive range of tech learning programs designed 
              to accelerate your career and build real-world skills.
            </p>
          </motion.div>

          {/* Programs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <motion.div
                key={program.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="glass-card p-6 rounded-xl card-hover group border border-[#19c973]/30"
              >
                {/* Category Badge */}
                <div className="mb-4">
                  <span className="px-3 py-1 bg-[#19c973]/20 text-[#19c973] text-sm rounded-full">
                    {program.name}
                  </span>
                </div>

                {/* Program Title & Description */}
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  {program.name}
                </h3>
                <p className="text-gray-300 mb-4">
                  {program.description}
                </p>

                {/* Program Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-gray-400">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>Duration: {program.duration}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <BookOpen className="w-4 h-4 mr-2" />
                    <span>Features: {program.features.length} key areas</span>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-white mb-2">What you'll learn:</h4>
                  <ul className="space-y-1">
                    {program.features.map((feature, idx) => (
                      <li key={idx} className="text-xs text-gray-400 flex items-center">
                        <span className="w-1.5 h-1.5 bg-[#19c973] rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <div className="flex justify-between items-center">
                  <Link to={program.link}>
                    <Button variant="primary" size="sm" className="group">
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link to="/enroll">
                    <Button variant="outline" size="sm">
                      Enroll Now
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <div className="glass-card p-8 rounded-2xl border border-[#19c973]/30">
            <h2 className="text-2xl font-bold text-white mb-4">
                Ready to Start Your Journey?
            </h2>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Join thousands of learners who have transformed their careers with our programs. 
                Choose the path that fits your goals and start building your future today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register">
                  <Button variant="primary" size="lg">
                    Get Started Now
                  </Button>
                </Link>
                <Link to="/products">
                  <Button variant="outline" size="lg">
                    Explore Products
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

export default ProgramsPage;
