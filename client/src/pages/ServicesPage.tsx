import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Star, Users, Award, Zap, Globe, Target, Code, Smartphone, Brain, TrendingUp, Clock, DollarSign, Shield, BookOpen, MessageCircle, Phone, Mail, MapPin } from 'lucide-react';
import Button from '../components/UI/Button';
import SEOComponent from '../components/SEO/SEOComponent';

const ServicesPage: React.FC = () => {
  const coreServices = [
    {
      title: 'Internships-as-a-Service for Universities',
      description: 'Comprehensive internship programs tailored for university students with industry partnerships.',
      icon: Users,
      features: ['Industry partnerships', 'Real-world projects', 'Mentorship', 'Portfolio building']
    },
    {
      title: 'Career Services (CV, LinkedIn, Portfolio)',
      description: 'Professional development services to enhance your career prospects and online presence.',
      icon: Award,
      features: ['CV optimization', 'LinkedIn profile', 'Portfolio website', 'Interview prep']
    },
    {
      title: 'Certification & Digital Badging',
      description: 'Industry-recognized certifications and digital badges to validate your skills.',
      icon: Zap,
      features: ['Industry recognition', 'Digital badges', 'Skill validation', 'Career advancement']
    },
    {
      title: 'Project Mentorship & Evaluation',
      description: 'Expert mentorship and evaluation for real-world projects and portfolio building.',
      icon: Target,
      features: ['Expert guidance', 'Code review', 'Best practices', 'Performance feedback']
    }
  ];

  const developmentServices = [
    {
      title: 'Web Development',
      description: 'Full-stack web development services using modern technologies and best practices.',
      icon: Code,
      technologies: ['React', 'Node.js', 'Python', 'MongoDB', 'AWS'],
      features: ['Responsive design', 'SEO optimization', 'Performance tuning', 'Security implementation'],
      timeline: '4-12 weeks'
    },
    {
      title: 'App Development',
      description: 'Mobile and web application development for iOS, Android, and cross-platform solutions.',
      icon: Smartphone,
      technologies: ['React Native', 'Flutter', 'iOS', 'Android', 'Firebase'],
      features: ['Cross-platform', 'Native performance', 'App store optimization', 'Push notifications'],
      timeline: '6-16 weeks'
    },
    {
      title: 'AI/ML Solutions',
      description: 'Artificial Intelligence and Machine Learning solutions for business automation and insights.',
      icon: Brain,
      technologies: ['Python', 'TensorFlow', 'PyTorch', 'OpenAI', 'Custom APIs'],
      features: ['Predictive analytics', 'Process automation', 'Data insights', 'Model deployment'],
      timeline: '8-20 weeks'
    }
  ];

  const products = [
    {
      name: 'Fundalytics AI',
      description: 'AI-powered startup funding assistant with personalized recommendations.',
      icon: Brain
    },
    {
      name: 'InvestLocal',
      description: 'Local investment platform connecting investors with entrepreneurs.',
      icon: Globe
    },
    {
      name: 'AI Assistant Builder',
      description: 'No-code platform to build custom AI agents for business automation.',
      icon: Zap
    },
    {
      name: 'StackSage',
      description: 'AI-powered DeveloperOps Assistant for CI/CD and performance monitoring.',
      icon: TrendingUp
    },
    {
      name: 'CollabXNation',
      description: 'Collaborative project platform for developers and aspiring founders.',
      icon: Users
    },
    {
      name: 'AutoServeHub',
      description: 'Automation platform using Make and n8n for business process automation.',
      icon: Target
    }
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Software Engineer at Google',
      content: 'CodeSpaze services transformed my career. The mentorship and project experience were invaluable.',
      rating: 5
    },
    {
      name: 'Alex Chen',
      role: 'Full-Stack Developer at Microsoft',
      content: 'The web development services helped me build a strong portfolio that impressed employers.',
      rating: 5
    },
    {
      name: 'Maria Rodriguez',
      role: 'Data Scientist at Amazon',
      content: 'The AI/ML solutions and mentorship helped me transition into tech successfully.',
      rating: 5
    }
  ];

  return (
    <>
      <SEOComponent
        title="Best Tech Services in Lucknow, Delhi, Mumbai | CodeSpaze Development & Learning Services"
        description="Transform your tech career with CodeSpaze's comprehensive services. Best tech services in Lucknow, Delhi, Mumbai, Bangalore, Hyderabad, Chennai, Pune, Kolkata. Web development, app development, AI/ML solutions, internships, and career services. Get started today!"
        keywords="best tech services in Lucknow, best tech services in Delhi, best tech services in Mumbai, best tech services in Bangalore, best tech services in Hyderabad, best tech services in Chennai, best tech services in Pune, best tech services in Kolkata, tech services, web development services, app development services, AI/ML services, internship services, career services, CV services, LinkedIn optimization, portfolio building, certification services, digital badging, project mentorship, project evaluation, software development services, mobile app development, artificial intelligence services, machine learning services, business automation, startup services, tech consulting, tech training, tech education, tech learning, tech mentorship, tech guidance, tech support, tech community, tech networking, tech collaboration, tech innovation, tech solutions, tech platforms, tech tools, tech systems, tech infrastructure, tech architecture, tech testing, tech deployment, tech maintenance, tech support, tech training, tech education, tech learning, tech teaching, tech coaching, tech mentoring, tech consulting, tech advisory, tech strategic, tech tactical, tech operational, tech administrative, tech executive, tech senior, tech junior, tech entry-level, tech experienced, tech skilled, tech qualified, tech certified, tech accredited, tech recognized, tech established, tech reputable, tech trusted, tech reliable"
        canonicalUrl="https://codespaze.org/services"
        location="Lucknow"
        programType="Tech Services"
        isLocal={true}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "CodeSpaze Tech Services",
          "description": "Comprehensive tech services including web development, app development, AI/ML solutions, internships, and career services",
          "provider": {
            "@type": "Organization",
            "name": "CodeSpaze",
            "url": "https://codespaze.org"
          },
          "serviceType": "Tech Services",
          "offers": {
            "@type": "Offer",
            "description": "Tech Development and Learning Services",
            "category": "Technology Services"
          }
        }}
      />
      <div className="min-h-screen py-20">
        {/* Hero Section */}
        <section className="relative py-20 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-6xl font-bold mb-6"
            >
              Our <span className="gradient-text">Services</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-300 max-w-3xl mx-auto mb-12"
            >
              From internships and career services to AI development and automation platforms, we provide comprehensive solutions 
              that bridge the gap between education and industry success.
            </motion.p>
          </div>
        </section>

        {/* Core Services */}
        <section className="py-20 px-4 bg-dark-950">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4">Core Services</h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Professional services designed to bridge the gap between education and industry
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {coreServices.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="glass-card p-8 hover:scale-105 transition-transform duration-300 border border-[#19c973]/30 rounded-2xl"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-[#19c973] to-[#16a362] rounded-xl flex items-center justify-center mb-6">
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                  <p className="text-gray-300 mb-6">{service.description}</p>
                  
                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-[#19c973] mb-3">Key Features:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-300">
                          <CheckCircle className="w-4 h-4 text-[#19c973] mr-2 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                  

                  
                  <Button variant="primary" className="w-full">
                    Learn More <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Development Services */}
        <section className="py-20 px-4 bg-dark-950">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4">Development Services</h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Specialized development services across web, mobile, and AI technologies
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {developmentServices.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="glass-card p-8 text-center hover:scale-105 transition-transform duration-300 border border-[#19c973]/30 rounded-2xl"
                >
                  <div className="w-20 h-20 bg-gradient-to-r from-[#19c973] to-[#16a362] rounded-full flex items-center justify-center mx-auto mb-6">
                    <service.icon className="w-10 h-10 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                  <p className="text-gray-300 mb-6">{service.description}</p>
                  
                  {/* Technologies */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-[#19c973] mb-3">Technologies:</h4>
                    <div className="flex flex-wrap justify-center gap-2">
                      {service.technologies.map((tech, idx) => (
                        <span key={idx} className="px-3 py-1 bg-[#19c973]/10 text-[#19c973] text-xs rounded-full border border-[#19c973]/30">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-[#19c973] mb-3">Features:</h4>
                    <div className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-300">
                          <CheckCircle className="w-4 h-4 text-[#19c973] mr-2 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Timeline */}
                  <div className="flex items-center mb-6 text-sm">
                    <div className="flex items-center text-gray-400">
                      <Clock className="w-4 h-4 mr-2" />
                      {service.timeline}
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    Explore {service.title} <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-20 px-4 bg-dark-950">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4">Our <span className="gradient-text">Products</span></h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Innovative solutions and platforms designed to transform how you work and learn
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  icon: Code,
                  link: "/products/ai-builder",
                  color: "from-[#19c973] to-[#1edb7f]"
                },
                {
                  title: "StackSage",
                  description: "AI-powered DeveloperOps Assistant for CI/CD monitoring and optimization",
                  icon: Globe,
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
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="glass-card p-6 text-center hover:scale-105 transition-transform duration-300 border border-[#19c973]/30 rounded-2xl"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${product.color} rounded-xl flex items-center justify-center mx-auto mb-6`}>
                    <product.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3">{product.title}</h3>
                  <p className="text-gray-300 mb-6">{product.description}</p>
                  
                  <Link to={product.link}>
                    <Button variant="outline" size="sm" className="w-full">
                      Explore Product
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 px-4 bg-dark-950">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4">What Our Clients Say</h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Real feedback from students and professionals who have used our services
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="glass-card p-6 text-center border border-[#19c973]/30 rounded-2xl"
                >
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-gray-300 mb-6 italic">"{testimonial.content}"</p>
                  
                  <div>
                    <h4 className="font-semibold text-[#19c973]">{testimonial.name}</h4>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Service Benefits */}
        <section className="py-20 px-4 bg-dark-950">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4">Why Choose <span className="gradient-text">CodeSpaze</span> Services?</h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                We deliver excellence through proven processes and dedicated support
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Shield,
                  title: 'Quality Assurance',
                  description: 'Rigorous testing and quality checks ensure your project meets industry standards.'
                },
                {
                  icon: Clock,
                  title: 'Timely Delivery',
                  description: 'We commit to delivering your project on time with regular progress updates.'
                },
                {
                  icon: DollarSign,
                  title: 'Competitive Pricing',
                  description: 'Transparent pricing with no hidden costs and flexible payment options.'
                },
                {
                  icon: MessageCircle,
                  title: '24/7 Support',
                  description: 'Round-the-clock support and maintenance for all our services and products.'
                }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="glass-card p-6 text-center hover:scale-105 transition-transform duration-300 border border-[#19c973]/30 rounded-2xl"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-[#19c973] to-[#16a362] rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                  <p className="text-gray-300 text-sm">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4">Get in <span className="gradient-text">Touch</span></h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Ready to start your project? Contact us for a free consultation and quote
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[
                {
                  icon: Mail,
                  title: 'Email Support',
                  details: ['email-support@codespaze.org', 'contact@codespaze.org'],
                  color: 'text-blue-400'
                },
                {
                  icon: Phone,
                  title: 'Call Us',
                  details: ['+91 98765 43210'],
                  color: 'text-green-400'
                },
                {
                  icon: MapPin,
                  title: 'Visit Us',
                  details: ['Lucknow, Uttar Pradesh, India'],
                  color: 'text-purple-400'
                }
              ].map((contact, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="glass-card p-6 text-center border border-[#19c973]/30 rounded-2xl"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r from-[#19c973] to-[#16a362] rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <contact.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3">{contact.title}</h3>
                  <div className="space-y-2">
                    {contact.details.map((detail, idx) => (
                      <p key={idx} className={`text-sm ${contact.color}`}>{detail}</p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Link to="/contact">
                <Button variant="primary" size="lg">
                  Schedule Free Consultation
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-4 bg-dark-950">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4">Frequently Asked <span className="gradient-text">Questions</span></h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Get answers to common questions about our services and processes
              </p>
            </motion.div>

            <div className="space-y-6">
              {[
                {
                  question: "What is the typical timeline for web development projects?",
                  answer: "Web development projects typically take 4-12 weeks depending on complexity. We provide detailed project timelines and regular progress updates throughout the development process."
                },
                {
                  question: "Do you offer ongoing support after project completion?",
                  answer: "Yes, we provide 24/7 support and maintenance for all our services. We offer various support packages to ensure your project continues to perform optimally."
                },
                {
                  question: "Can you work with existing codebases or systems?",
                  answer: "Absolutely! We can work with your existing systems, integrate new features, or completely rebuild if needed. We'll assess your current setup and recommend the best approach."
                },
                {
                  question: "What payment terms do you offer?",
                  answer: "We offer flexible payment terms including milestone-based payments, upfront payments with discounts, and ongoing service subscriptions. We'll work with you to find the best option."
                },
                {
                  question: "Do you provide training for the solutions you build?",
                  answer: "Yes, we provide comprehensive training for all our solutions. This includes user training, technical documentation, and ongoing support to ensure your team can effectively use the system."
                }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="glass-card p-6 border border-[#19c973]/30 rounded-2xl"
                >
                  <h3 className="text-lg font-semibold text-white mb-3">{faq.question}</h3>
                  <p className="text-gray-300">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
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
              className="glass-card p-12 rounded-2xl border border-[#19c973]/30"
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

export default ServicesPage;

