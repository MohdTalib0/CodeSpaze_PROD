import React from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Code, 
  Zap, 
  Users, 
  Shield, 
  BarChart3,
  ArrowRight,
  CheckCircle,
  Star,
  Cpu,
  Target,
  Rocket
} from 'lucide-react';
import Button from '../../components/UI/Button';

const AIAssistantBuilderPage: React.FC = () => {
  const features = [
    {
      icon: Code,
      title: "No-Code/Low-Code Platform",
      description: "Build sophisticated AI agents without writing complex code. Drag-and-drop interface for easy customization."
    },
    {
      icon: Brain,
      title: "Custom AI Agents",
      description: "Create vertical-specific AI agents tailored to your business needs and industry requirements."
    },
    {
      icon: Zap,
      title: "Business Automation",
      description: "Automate customer support, data scraping, lead generation, and other repetitive business tasks."
    },
    {
      icon: Users,
      title: "Multi-Use Case Support",
      description: "Build agents for customer service, sales, marketing, operations, and specialized industry tasks."
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade security with data encryption, access controls, and compliance standards."
    },
    {
      icon: BarChart3,
      title: "Performance Analytics",
      description: "Monitor agent performance, track interactions, and optimize for better results."
    }
  ];

  const useCases = [
    {
      icon: Users,
      title: "Customer Support",
      description: "24/7 automated customer service with intelligent responses and issue resolution."
    },
    {
      icon: Zap,
      title: "Lead Generation",
      description: "Automated lead qualification, data collection, and prospect nurturing."
    },
    {
      icon: Code,
      title: "Data Scraping",
      description: "Intelligent web scraping with data validation and structured output."
    },
    {
      icon: Brain,
      title: "Content Creation",
      description: "AI-powered content generation for marketing, social media, and documentation."
    }
  ];

  const benefits = [
    "Reduce operational costs by 60%",
    "24/7 automated business operations",
    "Scalable AI solutions for any industry",
    "No technical expertise required",
    "Quick deployment in hours, not months",
    "Customizable to your specific needs"
  ];

  const pricing = [
    {
      name: "Starter",
      price: "$49/month",
      features: [
        "Up to 3 AI agents",
        "Basic templates",
        "Email support",
        "Standard integrations"
      ]
    },
    {
      name: "Professional",
      price: "$149/month",
      features: [
        "Up to 10 AI agents",
        "Advanced customization",
        "Priority support",
        "Advanced integrations",
        "Performance analytics",
        "Custom training"
      ]
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: [
        "Unlimited AI agents",
        "White-label solution",
        "API access",
        "Dedicated support",
        "Custom integrations",
        "SLA guarantee"
      ]
    }
  ];

  const testimonials = [
    {
      name: "David Chen",
      role: "CTO, TechFlow",
      company: "SaaS Company",
      text: "Built a customer support agent in 2 hours that handles 80% of our tickets. Game-changer for our support team!",
      rating: 5
    },
    {
      name: "Maria Rodriguez",
      role: "Marketing Director",
      company: "E-commerce",
      text: "Our lead generation agent increased qualified leads by 300%. The no-code platform made it incredibly easy.",
      rating: 5
    },
    {
      name: "Alex Thompson",
      role: "Operations Manager",
      company: "Consulting Firm",
      text: "Automated data collection and analysis saved us 20 hours per week. ROI was immediate and substantial.",
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
                No-Code AI Platform
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="gradient-text">AI Assistant Builder</span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                A no-code/low-code platform to build GPT-like agents that automate specific business needs: 
                customer support, data scraping, lead generation, and more. Allows users to create vertical-specific 
                AI agents for various tasks.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="primary" size="lg" className="px-8 py-3">
                  Start Building <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button variant="outline" size="lg" className="px-8 py-3">
                  View Templates
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
                <Cpu className="w-32 h-32 text-[#19c973]" />
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
            <h2 className="text-4xl font-bold mb-4">Powerful AI Building Features</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need to create, customize, and deploy intelligent AI agents for your business
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

      {/* Use Cases Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Popular Use Cases</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover how businesses are using AI agents to transform their operations
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-6 text-center hover:scale-105 transition-transform duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-[#19c973] to-[#16a362] rounded-xl flex items-center justify-center mx-auto mb-6">
                  <useCase.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold mb-4">{useCase.title}</h3>
                <p className="text-gray-300">{useCase.description}</p>
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
              <h2 className="text-4xl font-bold mb-8">Why Choose AI Assistant Builder?</h2>
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
              Choose the plan that fits your AI automation needs
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
            <h2 className="text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Real feedback from businesses that have transformed their operations with AI
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
              Ready to Build Your AI Agent?
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Start automating your business processes with intelligent AI agents that learn and adapt to your specific needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg">
                Start Building
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

export default AIAssistantBuilderPage;
