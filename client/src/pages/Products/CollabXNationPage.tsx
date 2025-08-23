import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Globe, 
  Code, 
  Award, 
  Shield, 
  BarChart3,
  ArrowRight,
  CheckCircle,
  Star,
  Cpu,
  Target,
  Rocket,
  Briefcase,
  Network
} from 'lucide-react';
import Button from '../../components/UI/Button';

const CollabXNationPage: React.FC = () => {
  const features = [
    {
      icon: Users,
      title: "Developer Collaboration",
      description: "Connect with developers worldwide to work on real-world projects and build your portfolio."
    },
    {
      icon: Briefcase,
      title: "Founder Networking",
      description: "Connect with aspiring founders to validate ideas and build the next big thing together."
    },
    {
      icon: Code,
      title: "Project Management",
      description: "Built with pure custom WordPress, custom plugins, and Elementor Pro for seamless project coordination."
    },
    {
      icon: Award,
      title: "Skill Validation",
      description: "Earn recognition for your contributions and build a portfolio that showcases your expertise."
    },
    {
      icon: Shield,
      title: "Secure Platform",
      description: "Enterprise-grade security with data protection and privacy controls for all users."
    },
    {
      icon: BarChart3,
      title: "Progress Tracking",
      description: "Monitor project milestones, track contributions, and measure team performance."
    }
  ];

  const projectTypes = [
    {
      icon: Code,
      title: "Web Applications",
      description: "Full-stack web apps with modern technologies and responsive design."
    },
    {
      icon: Globe,
      title: "Mobile Apps",
      description: "Cross-platform mobile applications for iOS and Android."
    },
    {
      icon: Cpu,
      title: "AI/ML Projects",
      description: "Machine learning models and AI-powered applications."
    },
    {
      icon: Network,
      title: "Open Source",
      description: "Contribute to open source projects and build your reputation."
    }
  ];

  const benefits = [
    "Build real-world project experience",
    "Network with global developers and founders",
    "Validate business ideas with real users",
    "Earn recognition and build portfolio",
    "Learn from experienced professionals",
    "Access to diverse project opportunities"
  ];

  const pricing = [
    {
      name: "Developer",
      price: "Free",
      features: [
        "Access to project listings",
        "Basic collaboration tools",
        "Community forums",
        "Portfolio building"
      ]
    },
    {
      name: "Founder",
      price: "$29/month",
      features: [
        "Project creation tools",
        "Team management",
        "Advanced analytics",
        "Priority support",
        "Custom branding",
        "API access"
      ]
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: [
        "Everything in Founder",
        "White-label solution",
        "Custom integrations",
        "Dedicated support",
        "SLA guarantee",
        "Advanced security"
      ]
    }
  ];

  const testimonials = [
    {
      name: "Alex Kumar",
      role: "Full-Stack Developer",
      company: "Freelancer",
      text: "CollabXNation helped me build 3 real projects that landed me a senior developer role. The networking is incredible!",
      rating: 5
    },
    {
      name: "Priya Patel",
      role: "Founder, TechStart",
      company: "Early Stage Startup",
      text: "Found my co-founder and first 2 developers through CollabXNation. The platform is perfect for building teams.",
      rating: 5
    },
    {
      name: "David Chen",
      role: "Student Developer",
      company: "Computer Science",
      text: "As a student, this platform gave me real project experience that my resume was missing. Highly recommended!",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-dark-950 text-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center px-4 py-2 bg-[#19c973]/20 border border-[#19c973] rounded-full text-sm font-medium text-[#19c973] mb-6">
                <Users className="w-4 h-4 mr-2" />
                Collaborative Project Platform
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="gradient-text">CollabXNation</span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Collaborative project platform empowering developers and aspiring founders with real-world project experience, 
                networking opportunities, and skill validation. Built with pure custom WordPress, custom plugins, and Elementor Pro.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="primary" size="lg" className="px-8 py-3">
                  Join Platform <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button variant="outline" size="lg" className="px-8 py-3">
                  Browse Projects
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="w-full h-96 bg-gradient-to-br from-[#19c973]/20 to-[#16a362]/20 rounded-2xl flex items-center justify-center">
                <Network className="w-32 h-32 text-[#19c973]" />
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-[#19c973] to-[#16a362] rounded-full flex items-center justify-center">
                <Rocket className="w-12 h-12 text-white" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-dark-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Platform Features</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need to collaborate, build, and grow your career
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-6 text-center hover:scale-105 transition-transform duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-[#19c973] to-[#16a362] rounded-xl flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Types Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Project Categories</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Explore diverse project opportunities across different technologies
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {projectTypes.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-6 text-center hover:scale-105 transition-transform duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-[#19c973] to-[#16a362] rounded-xl flex items-center justify-center mx-auto mb-6">
                  <project.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold mb-4">{project.title}</h3>
                <p className="text-gray-300">{project.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-dark-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-8">Why Choose CollabXNation?</h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-[#19c973] flex-shrink-0" />
                    <span className="text-lg text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="w-full h-80 bg-gradient-to-br from-[#19c973]/10 to-[#16a362]/10 rounded-2xl flex items-center justify-center">
                <Target className="w-24 h-24 text-[#19c973]" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Choose the plan that fits your collaboration needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricing.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`glass-card p-8 text-center ${
                  plan.name === 'Founder' ? 'ring-2 ring-[#19c973]' : ''
                }`}
              >
                {plan.name === 'Founder' && (
                  <div className="inline-block px-4 py-2 bg-[#19c973] text-black font-semibold rounded-full text-sm mb-4">
                    Most Popular
                  </div>
                )}
                
                <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                <div className="text-4xl font-bold mb-6">
                  {plan.price}
                  {plan.price !== 'Free' && plan.price !== 'Custom' && <span className="text-lg text-gray-400">/month</span>}
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center justify-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-[#19c973] flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  variant={plan.name === 'Founder' ? 'primary' : 'outline'} 
                  className="w-full"
                >
                  {plan.price === 'Free' ? 'Get Started' : 'Get Started'}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-dark-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">What Our Community Says</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Real feedback from developers and founders using the platform
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
                className="glass-card p-6 text-center"
              >
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-300 mb-6 italic">"{testimonial.text}"</p>
                
                <div>
                  <h4 className="font-semibold text-[#19c973]">{testimonial.name}</h4>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                  <p className="text-sm text-gray-400">{testimonial.company}</p>
                </div>
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
              Ready to Collaborate and Build?
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of developers and founders building amazing projects together in our collaborative ecosystem.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg">
                Join Platform
              </Button>
              <Button variant="outline" size="lg">
                Browse Projects
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CollabXNationPage;
