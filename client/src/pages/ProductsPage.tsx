import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Star, Users, Award, Zap, Globe, Target, Code, Smartphone, Brain, TrendingUp } from 'lucide-react';
import Button from '../components/UI/Button';
import SEOComponent from '../components/SEO/SEOComponent';

const ProductsPage: React.FC = () => {
  const products = [
    {
      name: 'Fundalytics AI',
      description: 'AI-powered startup funding assistant that analyzes startup stage, domain, and location to recommend grants, VCs, accelerators, or loans.',
      features: ['Startup stage analysis', 'Domain-specific insights', 'Location-based recommendations', 'Personalized funding feed'],
      icon: Brain,
      link: '/products/fundalytics-ai',
      color: 'from-[#19c973] to-[#16a362]'
    },
    {
      name: 'InvestLocal',
      description: 'Mobile platform connecting small local investors with city-based entrepreneurs. Like OLX for investments.',
      features: ['Local investment matching', 'Trust verification', 'In-person meetings', 'Transparent discovery'],
      icon: Globe,
      link: '/products/invest-local',
      color: 'from-[#16a362] to-[#19c973]'
    },
    {
      name: 'AI Assistant Builder',
      description: 'No-code/low-code platform to build GPT-like agents that automate specific business needs.',
      features: ['No-code AI building', 'Business automation', 'Custom AI agents', 'Vertical-specific solutions'],
      icon: Zap,
      link: '/products/ai-assistant-builder',
      color: 'from-[#19c973] to-[#1edb7f]'
    },
    {
      name: 'StackSage',
      description: 'AI-powered DeveloperOps Assistant that plugs into services like Netlify, Supabase, GitHub, and Slack.',
      features: ['CI/CD monitoring', 'Performance tracking', 'Security auditing', 'Slack integration'],
      icon: TrendingUp,
      link: '/products/stack-sage',
      color: 'from-[#1edb7f] to-[#19c973]'
    },
    {
      name: 'CollabXNation',
      description: 'Collaborative project platform empowering developers and aspiring founders with real-world project experience.',
      features: ['Project collaboration', 'Skill validation', 'Networking opportunities', 'Portfolio building'],
      icon: Users,
      link: '/products/collab-x-nation',
      color: 'from-[#19c973] to-[#16a362]'
    },
    {
      name: 'AutoServeHub',
      description: 'Automation platform using Make or n8n workflows for business process automation.',
      features: ['Workflow automation', 'Business process optimization', 'Integration support', 'Custom automation'],
      icon: Target,
      link: '/products/auto-serve-hub',
      color: 'from-[#16a362] to-[#19c973]'
    }
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Founder at TechStart India',
      content: 'Fundalytics AI helped us identify the perfect VCs for our stage and location. The recommendations were spot-on!',
      rating: 5
    },
    {
      name: 'Alex Chen',
      role: 'CEO at InnovateLab',
      content: 'InvestLocal connected us with local investors who understood our market. Game-changer for our startup.',
      rating: 5
    },
    {
      name: 'Maria Rodriguez',
      role: 'Co-founder at GreenTech Solutions',
      content: 'AI Assistant Builder helped us automate customer support, saving us hours every day.',
      rating: 5
    }
  ];

  return (
    <>
      <SEOComponent
        title="Best Tech Products in Lucknow, Delhi, Mumbai | CodeSpaze AI & Development Products"
        description="Transform your business with CodeSpaze's innovative products. Best tech products in Lucknow, Delhi, Mumbai, Bangalore, Hyderabad, Chennai, Pune, Kolkata. AI funding assistant, local investment platform, AI builder, and automation tools. Explore our products today!"
        keywords="best tech products in Lucknow, best tech products in Delhi, best tech products in Mumbai, best tech products in Bangalore, best tech products in Hyderabad, best tech products in Chennai, best tech products in Pune, best tech products in Kolkata, tech products, AI products, startup products, investment products, automation products, AI funding assistant, local investment platform, AI builder, automation tools, business automation, startup tools, investment tools, AI tools, machine learning tools, business intelligence tools, productivity tools, collaboration tools, project management tools, workflow automation, business process optimization, integration tools, custom automation, AI agents, GPT-like agents, business automation, customer support automation, data scraping tools, lead generation tools, CI/CD monitoring, performance tracking, security auditing, Slack integration, project collaboration, skill validation, networking tools, portfolio building, local investment, trust verification, transparent discovery, startup funding, VC recommendations, accelerator recommendations, loan recommendations, grant recommendations, funding intelligence, startup analytics, investment insights, funding strategy, startup growth, AI business tools, AI startup platform, AI funding platform, AI investment platform, AI startup assistant, AI business assistant, AI funding advisor, AI investment advisor, AI startup consultant, AI business consultant, AI funding expert, AI investment expert, AI startup expert, AI business expert, AI funding specialist, AI investment specialist, AI startup specialist, AI business specialist, AI funding professional, AI investment professional, AI startup professional, AI business professional, AI funding service, AI investment service, AI startup service, AI business service, AI funding solution, AI investment solution, AI startup solution, AI business solution, AI funding platform, AI investment platform, AI startup platform, AI business platform, AI funding software, AI investment software, AI startup software, AI business software, AI funding app, AI investment app, AI startup app, AI business app, AI funding tool, AI investment tool, AI startup tool, AI business tool, AI funding system, AI investment system, AI startup system, AI business system, AI funding technology, AI investment technology, AI startup technology, AI business technology, AI funding innovation, AI investment innovation, AI startup innovation, AI business innovation, AI funding development, AI investment development, AI startup development, AI business development, AI funding research, AI investment research, AI startup research, AI business research, AI funding analysis, AI investment analysis, AI startup analysis, AI business analysis, AI funding strategy, AI investment strategy, AI startup strategy, AI business strategy, AI funding planning, AI investment planning, AI startup planning, AI business planning, AI funding execution, AI investment execution, AI startup execution, AI business execution, AI funding implementation, AI investment implementation, AI startup implementation, AI business implementation, AI funding testing, AI investment testing, AI startup testing, AI business testing, AI funding deployment, AI investment deployment, AI startup deployment, AI business deployment, AI funding maintenance, AI investment maintenance, AI startup maintenance, AI business maintenance, AI funding support, AI investment support, AI startup support, AI business support, AI funding training, AI investment training, AI startup training, AI business training, AI funding education, AI investment education, AI startup education, AI business education, AI funding learning, AI investment learning, AI startup learning, AI business learning, AI funding teaching, AI investment teaching, AI startup teaching, AI business teaching, AI funding coaching, AI investment coaching, AI startup coaching, AI business coaching, AI funding mentoring, AI investment mentoring, AI startup mentoring, AI business mentoring, AI funding consulting, AI investment consulting, AI startup consulting, AI business consulting, AI funding advisory, AI investment advisory, AI startup advisory, AI business advisory, AI funding strategic, AI investment strategic, AI startup strategic, AI business strategic, AI funding tactical, AI investment tactical, AI startup tactical, AI business tactical, AI funding operational, AI investment operational, AI startup operational, AI business operational, AI funding administrative, AI investment administrative, AI startup administrative, AI business administrative, AI funding executive, AI investment executive, AI startup executive, AI business executive, AI funding senior, AI investment senior, AI startup senior, AI business senior, AI funding junior, AI investment junior, AI startup junior, AI business junior, AI funding entry-level, AI investment entry-level, AI startup entry-level, AI business entry-level, AI funding experienced, AI investment experienced, AI startup experienced, AI business experienced, AI funding skilled, AI investment skilled, AI startup skilled, AI business skilled, AI funding qualified, AI investment qualified, AI startup qualified, AI business qualified, AI funding certified, AI investment certified, AI startup certified, AI business certified, AI funding accredited, AI investment accredited, AI startup accredited, AI business accredited, AI funding recognized, AI investment recognized, AI startup recognized, AI business recognized, AI funding established, AI investment established, AI startup established, AI business established, AI funding reputable, AI investment reputable, AI startup reputable, AI business reputable, AI funding trusted, AI investment trusted, AI startup trusted, AI business trusted, AI funding reliable, AI investment reliable, AI startup reliable, AI business reliable"
        canonicalUrl="https://codespaze.org/products"
        location="Lucknow"
        programType="Tech Products"
        isLocal={true}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "CodeSpaze Tech Products",
          "description": "Innovative tech products including AI funding assistant, local investment platform, AI builder, and automation tools",
          "provider": {
            "@type": "Organization",
            "name": "CodeSpaze",
            "url": "https://codespaze.org"
          },
          "itemListElement": [
            {
              "@type": "SoftwareApplication",
              "name": "Fundalytics AI",
              "description": "AI-powered startup funding assistant"
            },
            {
              "@type": "SoftwareApplication",
              "name": "InvestLocal",
              "description": "Local investment platform"
            },
            {
              "@type": "SoftwareApplication",
              "name": "AI Assistant Builder",
              "description": "No-code AI building platform"
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
              Our <span className="gradient-text">Products</span>
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Explore our innovative products designed to enhance your learning 
              experience and career development.
            </p>
          </motion.div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="glass-card p-6 rounded-xl card-hover group border border-[#19c973]/30"
              >
                {/* Product Icon & Category */}
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#19c973] to-[#16a362] rounded-lg flex items-center justify-center">
                    <product.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="px-3 py-1 bg-[#19c973]/20 text-[#19c973] text-sm rounded-full">
                    {product.name}
                  </span>
                </div>

                {/* Product Title & Description */}
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  {product.name}
                </h3>
                <p className="text-gray-300 mb-4">
                  {product.description}
                </p>

                {/* Product Features */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-white mb-2">Key Features:</h4>
                  <ul className="space-y-1">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="text-xs text-gray-400 flex items-center">
                        <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Product Stats */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span className="text-sm text-gray-300">5.0</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-300">100+</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold gradient-text">
                      Free
                    </div>
                    <div className="text-xs text-gray-400">one-time</div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex justify-between items-center">
                  <Link to={product.link}>
                    <Button variant="primary" size="sm" className="group">
                      Get Started
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link to="/programs">
                    <Button variant="outline" size="sm">
                      Learn More
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
                Ready to Transform Your Learning?
            </h2>
              <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto">
                Choose the products that best fit your learning style and career goals. 
                Start building your tech future today with our comprehensive suite of tools and services.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register">
                  <Button variant="primary" size="lg">
                    Start Learning Now
                  </Button>
                </Link>
                <Link to="/programs">
                  <Button variant="outline" size="lg">
                    Explore Programs
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

export default ProductsPage;
