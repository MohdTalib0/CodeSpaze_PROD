import React from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Code, 
  Workflow, 
  Shield, 
  BarChart3, 
  Settings,
  ArrowRight,
  CheckCircle,
  Star,
  Cpu,
  Target,
  Rocket,
  Clock,
  Database
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../../components/UI/Button';

const AutoServeHubPage: React.FC = () => {
  const features = [
    {
      icon: Workflow,
      title: "Visual Workflow Builder",
      description: "Create complex automation workflows using Make (Integromat) or n8n with drag-and-drop interface."
    },
    {
      icon: Zap,
      title: "Business Process Automation",
      description: "Automate repetitive tasks, data processing, and cross-platform integrations seamlessly."
    },
    {
      icon: Code,
      title: "Custom Integrations",
      description: "Build custom connectors and integrations for your specific business needs and tools."
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade security with data encryption, access controls, and compliance standards."
    },
    {
      icon: BarChart3,
      title: "Performance Analytics",
      description: "Monitor workflow performance, track execution times, and optimize automation efficiency."
    },
    {
      icon: Settings,
      title: "Easy Configuration",
      description: "Simple setup and configuration with pre-built templates and step-by-step guidance."
    }
  ];

  const useCases = [
    {
      icon: Database,
      title: "Data Synchronization",
      description: "Automate data flow between CRM, ERP, and other business systems."
    },
    {
      icon: Clock,
      title: "Scheduled Tasks",
      description: "Automate recurring tasks like report generation and data backups."
    },
    {
      icon: Zap,
      title: "Lead Management",
      description: "Automate lead capture, qualification, and follow-up processes."
    },
    {
      icon: Workflow,
      title: "Customer Support",
      description: "Automate ticket routing, response generation, and follow-up workflows."
    }
  ];

  const benefits = [
    "Reduce manual work by 70%",
    "24/7 automated operations",
    "Error-free data processing",
    "Scalable automation solutions",
    "Quick ROI within weeks",
    "No coding skills required"
  ];

  const pricing = [
    {
      name: "Starter",
      price: "$39/month",
      features: [
        "Up to 5 workflows",
        "Basic templates",
        "Email support",
        "Standard integrations"
      ]
    },
    {
      name: "Professional",
      price: "$99/month",
      features: [
        "Up to 20 workflows",
        "Advanced automation",
        "Priority support",
        "Custom integrations",
        "Performance analytics",
        "API access"
      ]
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: [
        "Unlimited workflows",
        "White-label solution",
        "Custom development",
        "Dedicated support",
        "SLA guarantee",
        "Advanced security"
      ]
    }
  ];

  const testimonials = [
    {
      name: "Jennifer Smith",
      role: "Operations Manager",
      company: "E-commerce Company",
      text: "AutoServeHub automated our order processing, reducing manual work by 80%. The Make integration is seamless!",
      rating: 5
    },
    {
      name: "Robert Kim",
      role: "Marketing Director",
      company: "SaaS Startup",
      text: "Our lead generation automation increased qualified leads by 250%. Setup was incredibly easy with the templates.",
      rating: 5
    },
    {
      name: "Maria Garcia",
      role: "IT Manager",
      company: "Manufacturing Firm",
      text: "Automated our inventory management and saved 15 hours per week. The n8n workflows are powerful and flexible.",
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
                <Zap className="w-4 h-4 mr-2" />
                Automation Platform
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="gradient-text">AutoServeHub</span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Automation platform using Make (Integromat) or n8n workflows to streamline business processes, 
                reduce manual work, and increase operational efficiency across your organization.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="https://autoservehub.codespaze.org/" target="_blank" rel="noopener noreferrer">
                  <Button variant="primary" size="lg" className="px-8 py-3 flex items-center">
                    Start Automating <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
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
                <Workflow className="w-32 h-32 text-[#19c973]" />
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
            <h2 className="text-4xl font-bold mb-4">Powerful Automation Features</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need to automate your business processes and workflows
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
              Discover how businesses are automating their operations
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
              <h2 className="text-4xl font-bold mb-8">Why Choose AutoServeHub?</h2>
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
              Choose the plan that fits your automation needs
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
              Real feedback from businesses that have transformed their operations
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
              Ready to Automate Your Business?
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Start automating your processes today and see immediate efficiency gains with our powerful automation platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg">
                Start Automating
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

export default AutoServeHubPage;
