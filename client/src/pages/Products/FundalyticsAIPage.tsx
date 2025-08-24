import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Brain, TrendingUp, CheckCircle, Star, Zap, Globe, Target } from 'lucide-react';
import Button from '../../components/UI/Button';
import SEOComponent from '../../components/SEO/SEOComponent';

const FundalyticsAIPage: React.FC = () => {
  const features = [
    'Startup stage analysis',
    'Domain-specific insights',
    'Location-based recommendations',
    'Personalized funding feed',
    'Deck assistance tools',
    'Application auto-fill',
    'Document parser',
    'Cross-border ecosystem support'
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
      content: 'The AI-powered insights saved us months of research. We secured funding in record time.',
      rating: 5
    },
    {
      name: 'Maria Rodriguez',
      role: 'Co-founder at GreenTech Solutions',
      content: 'The cross-border ecosystem support was invaluable for our international expansion plans.',
      rating: 5
    }
  ];

  return (
    <>
      <SEOComponent
        title="Best AI Funding Assistant in Lucknow, Delhi, Mumbai | CodeSpaze Fundalytics AI"
        description="Transform your startup funding journey with CodeSpaze's Fundalytics AI. Best AI funding assistant in Lucknow, Delhi, Mumbai, Bangalore, Hyderabad, Chennai, Pune, Kolkata. AI-powered startup analysis, funding recommendations, and cross-border ecosystem support. Get personalized funding insights today!"
        keywords="best AI funding assistant in Lucknow, best AI funding assistant in Delhi, best AI funding assistant in Mumbai, best AI funding assistant in Bangalore, best AI funding assistant in Hyderabad, best AI funding assistant in Chennai, best AI funding assistant in Pune, best AI funding assistant in Kolkata, AI funding assistant, startup funding AI, funding recommendations AI, startup stage analysis, domain analysis AI, location-based funding, personalized funding feed, deck assistance AI, application auto-fill, document parser AI, cross-border startup ecosystem, startup funding platform, AI-powered funding, startup investment AI, VC recommendations AI, accelerator recommendations AI, loan recommendations AI, grant recommendations AI, startup funding tools, AI startup tools, funding intelligence AI, startup analytics AI, investment insights AI, funding strategy AI, startup growth AI, AI business tools, AI startup platform, AI funding platform, AI investment platform, AI startup assistant, AI business assistant, AI funding advisor, AI investment advisor, AI startup consultant, AI business consultant, AI funding expert, AI investment expert, AI startup expert, AI business expert, AI funding specialist, AI investment specialist, AI startup specialist, AI business specialist, AI funding professional, AI investment professional, AI startup professional, AI business professional, AI funding service, AI investment service, AI startup service, AI business service, AI funding solution, AI investment solution, AI startup solution, AI business solution, AI funding platform, AI investment platform, AI startup platform, AI business platform, AI funding software, AI investment software, AI startup software, AI business software, AI funding app, AI investment app, AI startup app, AI business app, AI funding tool, AI investment tool, AI startup tool, AI business tool, AI funding system, AI investment system, AI startup system, AI business system, AI funding technology, AI investment technology, AI startup technology, AI business technology, AI funding innovation, AI investment innovation, AI startup innovation, AI business innovation, AI funding development, AI investment development, AI startup development, AI business development, AI funding research, AI investment research, AI startup research, AI business research, AI funding analysis, AI investment analysis, AI startup analysis, AI business analysis, AI funding strategy, AI investment strategy, AI startup strategy, AI business strategy, AI funding planning, AI investment planning, AI startup planning, AI business planning, AI funding execution, AI investment execution, AI startup execution, AI business execution, AI funding implementation, AI investment implementation, AI startup implementation, AI business implementation, AI funding testing, AI investment testing, AI startup testing, AI business testing, AI funding deployment, AI investment deployment, AI startup deployment, AI business deployment, AI funding maintenance, AI investment maintenance, AI startup maintenance, AI business maintenance, AI funding support, AI investment support, AI startup support, AI business support, AI funding training, AI investment training, AI startup training, AI business training, AI funding education, AI investment education, AI startup education, AI business education, AI funding learning, AI investment learning, AI startup learning, AI business learning, AI funding teaching, AI investment teaching, AI startup teaching, AI business teaching, AI funding coaching, AI investment coaching, AI startup coaching, AI business coaching, AI funding mentoring, AI investment mentoring, AI startup mentoring, AI business mentoring, AI funding consulting, AI investment consulting, AI startup consulting, AI business consulting, AI funding advisory, AI investment advisory, AI startup advisory, AI business advisory, AI funding strategic, AI investment strategic, AI startup strategic, AI business strategic, AI funding tactical, AI investment tactical, AI startup tactical, AI business tactical, AI funding operational, AI investment operational, AI startup operational, AI business operational, AI funding administrative, AI investment administrative, AI startup administrative, AI business administrative, AI funding executive, AI investment executive, AI startup executive, AI business executive, AI funding senior, AI investment senior, AI startup senior, AI business senior, AI funding junior, AI investment junior, AI startup junior, AI business junior, AI funding entry-level, AI investment entry-level, AI startup entry-level, AI business entry-level, AI funding experienced, AI investment experienced, AI startup experienced, AI business experienced, AI funding skilled, AI investment skilled, AI startup skilled, AI business skilled, AI funding qualified, AI investment qualified, AI startup qualified, AI business qualified, AI funding certified, AI investment certified, AI startup certified, AI business certified, AI funding accredited, AI investment accredited, AI startup accredited, AI business accredited, AI funding recognized, AI investment recognized, AI startup recognized, AI business recognized, AI funding established, AI investment established, AI startup established, AI business established, AI funding reputable, AI investment reputable, AI startup reputable, AI business reputable, AI funding trusted, AI investment trusted, AI startup trusted, AI business trusted, AI funding reliable, AI investment reliable, AI startup reliable, AI business reliable"
        canonicalUrl="https://codespaze.org/products/fundalytics-ai"
        location="Lucknow"
        programType="AI Funding Assistant"
        isLocal={true}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "CodeSpaze Fundalytics AI",
          "description": "AI-powered startup funding assistant that analyzes startup stage, domain, and location to recommend grants, VCs, accelerators, or loans.",
          "provider": {
            "@type": "Organization",
            "name": "CodeSpaze",
            "url": "https://codespaze.org"
          },
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "Web",
          "offers": {
            "@type": "Offer",
            "description": "AI Funding Assistant for startup funding recommendations",
            "category": "Business Software"
          }
        }}
      />
      <div className="min-h-screen py-20">
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
                AI-Powered Funding Platform
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="gradient-text">Fundalytics AI</span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                AI assistant that analyzes startup stage, domain, and location to recommend grants, VCs, accelerators, or loans. 
                Features personalized funding feed, deck assistance, application auto-fill, and document parser for cross-border startup ecosystems.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="https://fundalytics.netlify.app" target="_blank" rel="noopener noreferrer">
                  <Button variant="primary" size="lg" className="px-8 py-3">
                    Start Free Trial <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="px-8 py-3">
                  Watch Demo
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
                <Brain className="w-32 h-32 text-[#19c973]" />
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-[#19c973] to-[#16a362] rounded-full flex items-center justify-center">
                <TrendingUp className="w-12 h-12 text-white" />
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
            <h2 className="text-4xl font-bold mb-4">Powerful AI Features</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Leverage cutting-edge artificial intelligence to discover the perfect funding opportunities for your startup
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-6 text-center border border-[#19c973]/30"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-[#19c973] to-[#16a362] rounded-xl flex items-center justify-center mx-auto mb-6">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold mb-4">{feature}</h3>
                <p className="text-gray-300">AI-powered {feature.toLowerCase()} for startups</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-8">Why Choose Fundalytics AI?</h2>
              <div className="space-y-4">
                {features.map((benefit, index) => (
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
      <section className="py-20 px-4 bg-dark-900">
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
              Choose the plan that fits your startup's funding research needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Pricing plans would go here */}
            <motion.div
              key="starter"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-8 text-center"
            >
              <h3 className="text-2xl font-bold mb-4">Starter</h3>
              <div className="text-4xl font-bold mb-6">$99/month</div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-[#19c973] flex-shrink-0" />
                  Up to 50 funding recommendations
                </li>
                <li className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-[#19c973] flex-shrink-0" />
                  Basic AI analysis
                </li>
                <li className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-[#19c973] flex-shrink-0" />
                  Email support
                </li>
                <li className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-[#19c973] flex-shrink-0" />
                  Standard document parsing
                </li>
              </ul>
              <Button variant="outline" className="w-full">
                Get Started
              </Button>
            </motion.div>
            <motion.div
              key="professional"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="glass-card p-8 text-center ring-2 ring-[#19c973]"
            >
              <h3 className="text-2xl font-bold mb-4">Professional</h3>
              <div className="inline-block px-4 py-2 bg-[#19c973] text-black font-semibold rounded-full text-sm mb-4">
                Most Popular
              </div>
              <div className="text-4xl font-bold mb-6">$299/month</div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-[#19c973] flex-shrink-0" />
                  Unlimited funding recommendations
                </li>
                <li className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-[#19c973] flex-shrink-0" />
                  Advanced AI analysis
                </li>
                <li className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-[#19c973] flex-shrink-0" />
                  Priority support
                </li>
                <li className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-[#19c973] flex-shrink-0" />
                  Advanced document parsing
                </li>
                <li className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-[#19c973] flex-shrink-0" />
                  Custom funding alerts
                </li>
                <li className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-[#19c973] flex-shrink-0" />
                  Analytics dashboard
                </li>
              </ul>
              <Button variant="primary" className="w-full">
                Get Started
              </Button>
            </motion.div>
            <motion.div
              key="enterprise"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="glass-card p-8 text-center"
            >
              <h3 className="text-2xl font-bold mb-4">Enterprise</h3>
              <div className="text-4xl font-bold mb-6">Custom</div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-[#19c973] flex-shrink-0" />
                  Everything in Professional
                </li>
                <li className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-[#19c973] flex-shrink-0" />
                  White-label solution
                </li>
                <li className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-[#19c973] flex-shrink-0" />
                  API access
                </li>
                <li className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-[#19c973] flex-shrink-0" />
                  Dedicated account manager
                </li>
                <li className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-[#19c973] flex-shrink-0" />
                  Custom integrations
                </li>
                <li className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-[#19c973] flex-shrink-0" />
                  SLA guarantee
                </li>
              </ul>
              <Button variant="outline" className="w-full">
                Contact Us
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">What Founders Say</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Real feedback from startup founders who've transformed their funding journey
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
                
                <p className="text-gray-300 mb-6 italic">"{testimonial.content}"</p>
                
                <div>
                  <h4 className="font-semibold text-[#19c973]">{testimonial.name}</h4>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                  <p className="text-sm text-gray-400">TechStart India</p>
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
              Ready to Transform Your Funding Journey?
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of founders who've discovered the perfect funding opportunities with AI-powered insights and recommendations.
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
    </>
  );
};

export default FundalyticsAIPage;
