import React from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Code, 
  Zap, 
  Shield, 
  BarChart3, 
  GitBranch,
  ArrowRight,
  CheckCircle,
  Star,
  Cpu,
  Target,
  Rocket,
  Monitor,
  AlertTriangle
} from 'lucide-react';
import Button from '../../components/UI/Button';

const StackSagePage: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Intelligent parsing of CI/CD logs, uptime tracking, and performance monitoring with AI-driven insights."
    },
    {
      icon: GitBranch,
      title: "GitHub Integration",
      description: "Seamless integration with GitHub repositories for automated code analysis and deployment tracking."
    },
    {
      icon: Monitor,
      title: "Real-time Monitoring",
      description: "Continuous monitoring of applications with instant alerts for performance issues and downtime."
    },
    {
      icon: Shield,
      title: "Security Auditing",
      description: "Automated security risk detection and vulnerability assessment across your development pipeline."
    },
    {
      icon: BarChart3,
      title: "Performance Analytics",
      description: "Comprehensive analytics dashboard for SEO, performance metrics, and optimization recommendations."
    },
    {
      icon: Zap,
      title: "Slack Integration",
      description: "Instant notifications and summaries delivered directly to your Slack channels for team collaboration."
    }
  ];

  const integrations = [
    {
      icon: GitBranch,
      title: "GitHub",
      description: "Full repository integration with automated PR analysis and deployment tracking."
    },
    {
      icon: Monitor,
      title: "Netlify",
      description: "Deployment monitoring and performance tracking for static sites and web apps."
    },
    {
      icon: Cpu,
      title: "Supabase",
      description: "Database performance monitoring and query optimization insights."
    },
    {
      icon: Zap,
      title: "Slack",
      description: "Real-time notifications and automated reporting for your development team."
    }
  ];

  const benefits = [
    "Reduce deployment issues by 80%",
    "24/7 automated monitoring and alerting",
    "Instant security vulnerability detection",
    "Real-time performance optimization insights",
    "Seamless integration with existing tools",
    "Modular, pluggable architecture"
  ];

  const pricing = [
    {
      name: "Starter",
      price: "$79/month",
      features: [
        "Up to 3 repositories",
        "Basic CI/CD monitoring",
        "Email alerts",
        "Standard integrations"
      ]
    },
    {
      name: "Professional",
      price: "$199/month",
      features: [
        "Up to 10 repositories",
        "Advanced monitoring",
        "Slack integration",
        "Security auditing",
        "Performance analytics",
        "Priority support"
      ]
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: [
        "Unlimited repositories",
        "Custom integrations",
        "API access",
        "Dedicated support",
        "SLA guarantee",
        "White-label solution"
      ]
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "DevOps Engineer",
      company: "TechCorp",
      text: "StackSage caught a critical security issue in our deployment pipeline that we missed. The AI insights are incredibly accurate!",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "CTO, StartupXYZ",
      company: "Series A Startup",
      text: "Our deployment success rate improved from 70% to 95% with StackSage. The real-time monitoring is a game-changer.",
      rating: 5
    },
    {
      name: "Lisa Rodriguez",
      role: "Lead Developer",
      company: "E-commerce Platform",
      text: "The Slack integration keeps our entire team informed. We've eliminated deployment surprises completely.",
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
                <Brain className="w-4 h-4 mr-2" />
                AI-Powered DeveloperOps
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="gradient-text">StackSage</span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                AI-powered DeveloperOps Assistant that plugs into services like Netlify, Supabase, GitHub, and Slack. 
                Parses CI/CD logs, tracks uptime, audits SEO/performance, and flags security risks with modular, 
                pluggable components and Slack-based summaries.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="primary" size="lg" className="px-8 py-3">
                  Start Free Trial <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button variant="outline" size="lg" className="px-8 py-3">
                  View Demo
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
                <Code className="w-32 h-32 text-[#19c973]" />
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
            <h2 className="text-4xl font-bold mb-4">Powerful DeveloperOps Features</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need to monitor, optimize, and secure your development pipeline
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

      {/* Integrations Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Seamless Integrations</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Works with your existing development tools and platforms
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {integrations.map((integration, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-6 text-center hover:scale-105 transition-transform duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-[#19c973] to-[#16a362] rounded-xl flex items-center justify-center mx-auto mb-6">
                  <integration.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold mb-4">{integration.title}</h3>
                <p className="text-gray-300">{integration.description}</p>
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
              <h2 className="text-4xl font-bold mb-8">Why Choose StackSage?</h2>
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
              Choose the plan that fits your development team's needs
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
                  plan.name === 'Professional' ? 'ring-2 ring-[#19c973]' : ''
                }`}
              >
                {plan.name === 'Professional' && (
                  <div className="inline-block px-4 py-2 bg-[#19c973] text-black font-semibold rounded-full text-sm mb-4">
                    Most Popular
                  </div>
                )}
                
                <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                <div className="text-4xl font-bold mb-6">
                  {plan.price}
                  {plan.price !== 'Custom' && <span className="text-lg text-gray-400">/month</span>}
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
                  variant={plan.name === 'Professional' ? 'primary' : 'outline'} 
                  className="w-full"
                >
                  Get Started
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
            <h2 className="text-4xl font-bold mb-4">What Developers Say</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Real feedback from development teams using StackSage
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
              Ready to Optimize Your Development Pipeline?
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of developers who've transformed their DevOps with AI-powered insights and automated monitoring.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg">
                Start Free Trial
              </Button>
              <Button variant="outline" size="lg">
                Schedule Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default StackSagePage;
