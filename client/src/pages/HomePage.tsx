import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  BookOpen, 
  Code, 
  Users, 
  Globe, 
  Zap,
  Award,
  Shield,
  CheckCircle,
  Star,
  Target,
  Brain,
  Briefcase,
  Building2,
  Headphones
} from 'lucide-react';
import Button from '../components/UI/Button';
import SEOComponent from '../components/SEO/SEOComponent';

const HomePage: React.FC = () => {
  const features = [
    {
      icon: Code,
      title: 'Portfolio-First Learning',
      description: 'Build real-world projects that showcase your skills to employers',
    },
    {
      icon: Users,
      title: 'Global Community',
      description: 'Connect with learners and mentors from around the world',
    },
    {
      icon: Award,
      title: 'Industry Recognition',
      description: 'Get certified by leading tech companies and organizations',
    },
    {
      icon: Globe,
      title: 'International Programs',
      description: 'Access opportunities across borders and cultures',
    },
    {
      icon: Zap,
      title: 'AI & Innovation',
      description: 'Cutting-edge AI development and automation solutions',
    },
    {
      icon: Shield,
      title: 'Career Acceleration',
      description: 'Fast-track your tech career with proven programs',
    },
  ];

  const programs = [
    {
      title: 'Internship Program',
      duration: '60-90 days',
      category: 'Internship',
      description: 'Mentored, project-based learning with real-world deliverables',
    },
    {
      title: 'Fellowship Program',
      duration: '10-12 weeks',
      category: 'Fellowship',
      description: 'Client projects, evaluations, and mentor reviews',
    },
    {
      title: 'Summer Tech Accelerator',
      duration: '4-6 weeks',
      category: 'Accelerator',
      description: 'Fast-paced, project-based summer learning program',
    },
  ];

  const services = [
    {
      title: 'Internships-as-a-Service',
      description: 'Comprehensive internship programs tailored for university students with industry partnerships',
      icon: BookOpen,
      link: '/services'
    },
    {
      title: 'Career Services',
      description: 'Professional development services to enhance your career prospects and online presence',
      icon: Users,
      link: '/services'
    },
    {
      title: 'Web Development',
      description: 'Full-stack web development services using modern technologies and best practices',
      icon: Code,
      link: '/services'
    }
  ];

  const stats = [
    { number: '500+', label: 'Students Enrolled' },
    { number: '95%', label: 'Success Rate' },
    { number: '50+', label: 'Industry Partners' },
    { number: '24/7', label: 'Support Available' }
  ];

  

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Software Engineer at Google',
      content: 'CodeSpaze transformed my career. The hands-on experience and mentorship were invaluable. I went from knowing basic programming to building full-stack applications in just 60-90 days.',
      rating: 5
    },
    {
      name: 'Alex Chen',
      role: 'Full-Stack Developer at Microsoft',
      content: 'I learned more in 60-90 days here than in my entire college degree. Real-world projects were game-changing. The mentors helped me understand industry best practices.',
      rating: 5
    },
    {
      name: 'Maria Rodriguez',
      role: 'Data Scientist at Amazon',
      content: 'The program structure and mentorship helped me transition from a different field into tech successfully. Now I\'m working on cutting-edge AI projects at Amazon.',
      rating: 5
    },
    {
      name: 'Rahul Patel',
      role: 'Frontend Developer at Netflix',
      content: 'CodeSpaze\'s React and modern web development focus gave me the exact skills I needed. I got hired at Netflix within 2 months of completing the program.',
      rating: 5
    },
    {
      name: 'Sarah Johnson',
      role: 'DevOps Engineer at Uber',
      content: 'The cloud computing and DevOps modules were incredibly practical. I learned AWS, Docker, and CI/CD pipelines that I use daily in my current role.',
      rating: 5
    },
    {
      name: 'David Kim',
      role: 'AI/ML Engineer at Tesla',
      content: 'The AI and machine learning projects were industry-relevant and challenging. CodeSpaze helped me build a strong portfolio that impressed Tesla\'s hiring team.',
      rating: 5
    },
    {
      name: 'Lisa Wang',
      role: 'Product Manager at Meta',
      content: 'CodeSpaze taught me both technical skills and product thinking. The real-world projects helped me understand how to build products that users actually want.',
      rating: 5
    },
    {
      name: 'Arun Kumar',
      role: 'Backend Developer at Spotify',
      content: 'The Node.js and database modules were excellent. I learned to build scalable APIs and microservices that I now implement at Spotify.',
      rating: 5
    }
  ];

  // Carousel state and functions
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const navigateCarousel = (direction: 'prev' | 'next') => {
    const totalSlides = Math.ceil(testimonials.length / 3);
    
    if (direction === 'next') {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    } else {
      setCurrentSlide((prev) => prev === 0 ? totalSlides - 1 : prev - 1);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto-advance carousel
  React.useEffect(() => {
    const interval = setInterval(() => {
      const totalSlides = Math.ceil(testimonials.length / 3);
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000); // Change slide every 5 seconds
    
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <>
      <SEOComponent
        title="CodeSpaze - Best Tech Learning Platform in Lucknow, Delhi, Mumbai | Global Tech Programs"
        description="Transform your tech career with CodeSpaze. Best tech learning platform in Lucknow, Delhi, Mumbai, Bangalore, Hyderabad, Chennai, Pune, Kolkata, tech learning platform, coding bootcamp, software development training, AI/ML programs, web development courses, app development training, data science courses, cybersecurity training, cloud computing courses, blockchain development, game development courses, UI/UX design training, graphic design courses, digital marketing training, content writing courses, SEO training, mobile development courses, DevOps training, full stack development, Python courses, React training, JavaScript courses, Java training, C++ courses, Node.js training, MongoDB courses, SQL training, AWS courses, Azure training, Google Cloud courses, startup programs, fintech courses, edtech programs, healthtech training, ecommerce courses, SaaS training, B2B courses, B2C training, product management courses, project management training, business development courses, sales training, marketing courses, customer success training, operations courses, finance training, HR courses, legal training, research programs, academic courses, university programs, college courses, student programs, graduate courses, postgraduate programs, PhD programs, master's courses, bachelor's courses, diploma programs, certificate courses, online training, virtual programs, hybrid courses, part-time programs, full-time courses, paid programs, unpaid courses, stipend programs, competitive courses, selective programs, prestigious courses, top programs, leading courses, innovative programs, cutting-edge courses, future-focused programs, industry-relevant courses, practical training, hands-on programs, project-based courses, real-world training, professional programs, career-focused courses, skill-building programs, knowledge-enhancing courses, experience-gaining programs, networking courses, mentorship programs, guidance training, support courses, community programs, collaborative courses, team training, individual programs, creative courses, analytical training, technical programs, business courses, design training, development programs, engineering courses, science training, mathematics courses, statistics training, economics courses, finance training, accounting courses, management training, leadership courses, entrepreneurship programs, innovation training, research courses, analysis training, strategy courses, planning training, execution courses, implementation training, testing courses, quality assurance training, user experience courses, customer experience training, product courses, service training, solution courses, platform training, application courses, system training, infrastructure courses, architecture training, testing courses, deployment training, maintenance courses, support training, training courses, education programs, learning courses, teaching training, coaching courses, mentoring training, consulting courses, advisory training, strategic courses, tactical training, operational courses, administrative training, executive courses, senior training, junior courses, entry-level training, experienced courses, skilled training, qualified courses, certified training, accredited courses, recognized training, established courses, reputable training, trusted courses, reliable training"
        canonicalUrl="https://codespaze.org"
        location="Lucknow"
        programType="Tech Learning Platform"
        isLocal={true}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          "name": "CodeSpaze",
          "description": "Global Tech Learning & Career Platform offering internships, fellowships, and tech programs",
          "url": "https://codespaze.org",
          "logo": "https://codespaze.org/logo.png",
          "sameAs": [
            "https://twitter.com/codespaze",
            "https://linkedin.com/company/codespaze",
            "https://instagram.com/codespaze"
          ],
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Lucknow",
            "addressRegion": "Uttar Pradesh",
            "addressCountry": "IN"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91-XXXXXXXXXX",
            "contactType": "customer service",
            "email": "info@codespaze.org"
          },
          "offers": {
            "@type": "Offer",
            "description": "Tech Learning Programs - Internships, Fellowships, and Accelerators",
            "category": "Educational Services"
          }
        }}
      />
      <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-950/50 to-dark-950" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center px-4 py-2 glass-card rounded-full text-sm font-medium text-primary-500 hover:scale-105 transition-all duration-300 mt-8 md:mt-0"
            >
              <Zap className="w-4 h-4 mr-2" />
              Transform Your Tech Career
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
            >
              <span className="gradient-text">CodeSpaze</span>
              <br />
              <span className="text-2xl md:text-3xl lg:text-4xl text-gray-300 font-normal">
                Global Tech Learning & Career Platform
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="max-w-3xl mx-auto text-lg md:text-xl text-gray-300 leading-relaxed"
            >
              Empowering the next generation of tech leaders with hands-on learning, 
              real-world projects, and global opportunities. From internships to AI development, 
              we're building the future of tech education.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link to="/programs">
                <Button variant="primary" size="lg" className="group">
                  Explore Programs
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/enroll">
                <Button variant="outline" size="lg">
                  Join Now
                </Button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto pt-16"
            >
              {[
                { number: '15K+', label: 'Learners' },
                { number: '25+', label: 'Programs' },
                { number: '98%', label: 'Success Rate' },
                { number: '150+', label: 'Countries' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 + index * 0.1, duration: 0.6 }}
                  className="text-center hover:scale-110 transition-transform duration-300 cursor-pointer"
                >
                  <div className="text-3xl md:text-4xl font-bold gradient-text">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-[#19c973] rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-[#19c973] rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose <span className="gradient-text">CodeSpaze</span>?
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Our unique approach combines cutting-edge curriculum with real-world 
              project experience to prepare you for the tech industry.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="glass-card p-6 rounded-xl card-hover border border-[#19c973]/30"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-dark-950" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 relative bg-dark-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our <span className="gradient-text">Services</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Comprehensive solutions for universities, students, and businesses.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="glass-card p-6 rounded-xl card-hover text-center border border-[#19c973]/30"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <service.icon className="w-8 h-8 text-dark-950" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-300 mb-6">
                  {service.description}
                </p>
                <Link to={service.link}>
                  <Button variant="outline" size="sm" className="w-full">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
          
          {/* View All Services Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/services">
              <Button variant="primary" size="lg" className="group">
                View All Services
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Programs Preview Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Featured <span className="gradient-text">Programs</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Discover our most popular programs designed to accelerate your tech career.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="glass-card p-6 rounded-xl card-hover border border-[#19c973]/30"
              >
                <div className="mb-4">
                  <span className="px-3 py-1 bg-primary-500/20 text-primary-500 text-sm rounded-full">
                    {program.category}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {program.title}
                </h3>
                <p className="text-gray-300 mb-4">
                  {program.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">
                    Duration: {program.duration}
                  </span>
                  <Link to="/programs">
                    <Button variant="outline" size="sm">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/programs">
              <Button variant="primary" size="lg">
                View All Programs
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 relative bg-dark-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our <span className="gradient-text">Products</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Innovative solutions and platforms designed to transform how you work and learn
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Fundalytics AI",
                description: "AI-powered funding recommendations for startups with personalized matching",
                icon: Brain,
                link: "/products/fundalytics",
                color: "from-[#19c973] to-[#16a362]"
              },
              {
                title: "InvestLocal",
                description: "Local investment platform connecting investors with entrepreneurs",
                icon: Users,
                link: "/products/investlocal",
                color: "from-[#16a362] to-[#19c973]"
              },
              {
                title: "AI Assistant Builder",
                description: "No-code platform to build custom AI agents for business automation",
                icon: Brain,
                link: "/products/ai-builder",
                color: "from-[#19c973] to-[#1edb7f]"
              },
              {
                title: "StackSage",
                description: "AI-powered DeveloperOps Assistant for CI/CD monitoring and optimization",
                icon: Briefcase,
                link: "/products/stacksage",
                color: "from-[#1edb7f] to-[#19c973]"
              },
              {
                title: "CollabXNation",
                description: "Collaborative project platform for developers and aspiring founders",
                icon: Users,
                link: "/products/collabxnation",
                color: "from-[#19c973] to-[#16a362]"
              },
              {
                title: "AutoServeHub",
                description: "Automation platform using Make or n8n workflows for business processes",
                icon: Zap,
                link: "/products/autoservehub",
                color: "from-[#16a362] to-[#19c973]"
              }
            ].map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="glass-card p-6 rounded-xl card-hover border border-[#19c973]/30"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${product.color} rounded-xl flex items-center justify-center mx-auto mb-6`}>
                  <product.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-2">
                  {product.title}
                </h3>
                <p className="text-gray-300 mb-4">
                  {product.description}
                </p>
                
                <Link to={product.link}>
                  <Button variant="outline" size="sm">
                    Explore Product
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/products">
              <Button variant="outline" size="lg">
                View All Products
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 relative bg-black overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2319c973' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-gray-900 opacity-80"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What Our <span className="gradient-text">Students Say</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Hear from our successful graduates who have transformed their careers through CodeSpaze programs
            </p>
          </motion.div>

          {/* Testimonials Carousel */}
          <div className="relative">
            {/* Carousel Container */}
            <div className="overflow-hidden relative">
              <div 
                className="flex transition-transform duration-500 ease-in-out" 
                style={{ 
                  transform: `translateX(-${currentSlide * 100}%)`,
                  width: `${Math.ceil(testimonials.length / 3) * 100}%`
                }}
              >
                {(() => {
                  const totalSlides = Math.ceil(testimonials.length / 3);
                  const slides = [];
                  
                  for (let slideIndex = 0; slideIndex < totalSlides; slideIndex++) {
                    const startIndex = slideIndex * 3;
                    const endIndex = Math.min(startIndex + 3, testimonials.length);
                    const slideTestimonials = testimonials.slice(startIndex, endIndex);
                    
                    slides.push(
                      <div 
                        key={`slide-${slideIndex}`} 
                        className="flex w-full flex-shrink-0" 
                        style={{ width: '100%' }}
                      >
                        {slideTestimonials.map((testimonial, index) => (
                          <div 
                            key={testimonial.name}
                            className="w-1/3 flex-shrink-0 px-4"
                            style={{ minWidth: '33.333%' }}
                          >
                            <motion.div
                              initial={{ opacity: 0, y: 30 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1, duration: 0.6 }}
                              viewport={{ once: true }}
                              className="glass-card p-6 rounded-xl card-hover border border-[#19c973]/30 relative h-full"
                            >
                              {/* Rating Stars */}
                              <div className="flex items-center mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                  <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                  </svg>
                                ))}
                              </div>

                              {/* Testimonial Content */}
                              <blockquote className="text-gray-300 mb-4 italic text-sm leading-relaxed">
                                "{testimonial.content}"
                              </blockquote>

                              {/* Author Info */}
                              <div className="flex items-center mt-auto">
                                <div className="w-10 h-10 bg-gradient-to-r from-[#19c973] to-[#16a362] rounded-full flex items-center justify-center mr-3">
                                  <span className="text-white font-semibold text-sm">
                                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                                  </span>
                                </div>
                                <div>
                                  <div className="font-semibold text-white text-sm">{testimonial.name}</div>
                                  <div className="text-xs text-[#19c973]">{testimonial.role}</div>
                                </div>
                              </div>
                            </motion.div>
                          </div>
                        ))}
                      </div>
                    );
                  }
                  
                  return slides;
                })()}
              </div>
            </div>

            {/* Navigation Arrows */}
            <button 
              onClick={() => navigateCarousel('prev')}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full border-2 border-[#19c973] transition-all duration-300 hover:scale-110 z-20 shadow-lg hover:shadow-xl"
              aria-label="Previous testimonials"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button 
              onClick={() => navigateCarousel('next')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full border-2 border-[#19c973] transition-all duration-300 hover:scale-110 z-20 shadow-lg hover:shadow-xl"
              aria-label="Next testimonials"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: Math.ceil(testimonials.length / 3) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide ? 'bg-[#19c973] scale-125' : 'bg-gray-600 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Additional Success Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8"
          >
            {[
              { number: '500+', label: 'Students Enrolled', icon: Users },
              { number: '95%', label: 'Success Rate', icon: CheckCircle },
              { number: '50+', label: 'Industry Partners', icon: Building2 },
              { number: '24/7', label: 'Support Available', icon: Headphones }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-[#19c973]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-[#19c973]" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA for Testimonials */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/programs">
              <Button variant="outline" size="lg">
                Join Our Success Stories
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass-card p-12 rounded-2xl card-hover border border-[#19c973]/30"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Build Your Future in Tech?
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of successful learners who have accelerated their tech careers 
              with CodeSpaze. From internships to AI development, your journey starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button variant="primary" size="lg">
                  Get Started Now
                </Button>
              </Link>
              <Link to="/programs">
                <Button variant="outline" size="lg">
                  Explore Programs
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
    </>
  );
};

export default HomePage;
