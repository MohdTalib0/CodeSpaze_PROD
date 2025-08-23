import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  MapPin, 
  Shield, 
  TrendingUp, 
  Building,
  ArrowRight,
  CheckCircle,
  Star,
  Globe,
  Zap,
  Target
} from 'lucide-react';
import Button from '../../components/UI/Button';

const InvestLocalPage: React.FC = () => {
  const features = [
    {
      icon: MapPin,
      title: "Local Investment Discovery",
      description: "Find investment opportunities in your city with location-based matching and discovery algorithms."
    },
    {
      icon: Users,
      title: "Trust-Based Matching",
      description: "Connect with verified local investors and entrepreneurs through in-person meetings and transparency."
    },
    {
      icon: Building,
      title: "Small Investment Starting",
      description: "Start investing with as little as ₹10,000, making investment accessible to everyone."
    },
    {
      icon: Users,
      title: "In-Person Networking",
      description: "Build genuine relationships through face-to-face meetings and local community events."
    },
    {
      icon: Shield,
      title: "Transparent Operations",
      description: "Full transparency in investment terms, due diligence, and progress tracking."
    },
    {
      icon: TrendingUp,
      title: "Local Economic Growth",
      description: "Support local businesses and contribute to your community's economic development."
    }
  ];

  const benefits = [
    "Start investing with just ₹10,000",
    "Access to verified local opportunities",
    "Build genuine business relationships",
    "Support local economic growth",
    "Transparent investment process",
    "Community-driven investment ecosystem"
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Create Profile",
      description: "Sign up as an investor or entrepreneur with detailed verification process."
    },
    {
      step: "2",
      title: "Discover Opportunities",
      description: "Browse local investment opportunities or showcase your business idea."
    },
    {
      step: "3",
      title: "Connect & Meet",
      description: "Schedule in-person meetings to build trust and discuss details."
    },
    {
      step: "4",
      title: "Invest & Grow",
      description: "Complete the investment process and track your portfolio growth."
    }
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Local Investor",
      company: "₹50,000 Portfolio",
      text: "InvestLocal helped me discover amazing local businesses. The in-person meetings built trust that online platforms can't provide.",
      rating: 5
    },
    {
      name: "Priya Patel",
      role: "Founder, LocalCraft",
      company: "Artisan Business",
      text: "Found 3 local investors who truly understood our business. The platform's focus on local connections made all the difference.",
      rating: 5
    },
    {
      name: "Amit Singh",
      role: "Small Investor",
      company: "₹15,000 Investment",
      text: "Started with just ₹15,000 and now have a diverse local portfolio. The transparency and community feel is unmatched.",
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
                <MapPin className="w-4 h-4 mr-2" />
                Local Investment Platform
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="gradient-text">InvestLocal</span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Mobile platform connecting small local investors (starting ₹10,000) with city-based entrepreneurs. 
                Like OLX for investments, emphasizing trust via in-person meets, transparency, and localized discovery 
                with investor-entrepreneur matchmaking.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="primary" size="lg" className="px-8 py-3">
                  Start Investing <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                  <Button variant="outline" size="lg" className="px-8 py-3">
                  List Your Business
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
                <Users className="w-32 h-32 text-[#19c973]" />
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-[#19c973] to-[#16a362] rounded-full flex items-center justify-center">
                <MapPin className="w-12 h-12 text-white" />
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
            <h2 className="text-4xl font-bold mb-4">Local Investment Features</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover the unique features that make InvestLocal the perfect platform for local investment
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

      {/* How It Works Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">How InvestLocal Works</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Simple 4-step process to start your local investment journey
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-gradient-to-r from-[#19c973] to-[#16a362] rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl font-bold text-white">{step.step}</span>
                </div>
                
                <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                <p className="text-gray-300">{step.description}</p>
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
              <h2 className="text-4xl font-bold mb-8">Why Choose InvestLocal?</h2>
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

      {/* Investment Examples Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Investment Examples</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              See how local investors are making a difference in their communities
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-[#19c973] to-[#16a362] rounded-xl flex items-center justify-center mx-auto mb-6">
                <Building className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">Local Restaurant</h3>
              <p className="text-gray-300 mb-4">Traditional family restaurant seeking expansion</p>
              <div className="text-2xl font-bold text-[#19c973]">₹25,000</div>
              <div className="text-sm text-gray-400">Minimum Investment</div>
            </div>

            <div className="glass-card p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-[#19c973] to-[#16a362] rounded-xl flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">Tech Startup</h3>
              <p className="text-gray-300 mb-4">Local software development company</p>
              <div className="text-2xl font-bold text-[#19c973]">₹50,000</div>
              <div className="text-sm text-gray-400">Minimum Investment</div>
            </div>

            <div className="glass-card p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-[#19c973] to-[#16a362] rounded-xl flex items-center justify-center mx-auto mb-6">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">E-commerce Store</h3>
              <p className="text-gray-300 mb-4">Local online retail business</p>
              <div className="text-2xl font-bold text-[#19c973]">₹15,000</div>
              <div className="text-sm text-gray-400">Minimum Investment</div>
            </div>
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
              Real feedback from local investors and entrepreneurs
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
              Ready to Invest Locally?
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of local investors and entrepreneurs building stronger communities through trusted local investments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg">
                Start Investing
              </Button>
              <Button variant="outline" size="lg">
                List Your Business
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default InvestLocalPage;
