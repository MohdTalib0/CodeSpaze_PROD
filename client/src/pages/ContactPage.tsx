import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  MessageCircle,
  Send,
  CheckCircle,
  Globe,
  Instagram,
  Linkedin,
  Github,
  Twitter
} from 'lucide-react';
import Button from '../components/UI/Button';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  useEffect(() => {
    // Smooth scroll to top when component mounts
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, []);

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
      
    } catch (error) {
      console.error('Submission error:', error);
      setErrors({ submit: 'Failed to send message. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      details: ['email-support@codespaze.org', 'contact@codespaze.org'],
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['+91 98765 43210', '+1 (555) 123-4567'],
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: ['Lucknow, Uttar Pradesh, India'],
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: ['Mon - Fri: 9:00 AM - 6:00 PM', 'Sat: 10:00 AM - 2:00 PM'],
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/20'
    }
  ];

  const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com/codespaze', label: 'Instagram', color: 'hover:text-pink-400' },
    { icon: Linkedin, href: 'https://linkedin.com/company/codespaze', label: 'LinkedIn', color: 'hover:text-blue-400' },
    { icon: Github, href: 'https://github.com/codespaze', label: 'GitHub', color: 'hover:text-gray-400' },
    { icon: Twitter, href: 'https://twitter.com/codespaze', label: 'Twitter', color: 'hover:text-blue-400' }
  ];

  return (
    <div className="min-h-screen py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            Get in <span className="gradient-text">Touch</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-300 max-w-3xl mx-auto"
          >
            Have questions about our programs? Want to discuss collaboration opportunities? 
            We'd love to hear from you. Reach out and let's start a conversation.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 inline-flex items-center px-4 py-2 bg-[#19c973]/10 border border-[#19c973]/30 rounded-full text-sm text-[#19c973]"
          >
            <MapPin className="w-4 h-4 mr-2" />
            Based in Lucknow, Uttar Pradesh, India
          </motion.div>
        </div>

        {/* Contact Information Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {contactInfo.map((info, index) => (
            <motion.div
              key={info.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className={`p-6 rounded-xl border ${info.borderColor} ${info.bgColor} backdrop-blur-sm`}
            >
              <div className={`w-12 h-12 ${info.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                <info.icon className={`w-6 h-6 ${info.color}`} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">{info.title}</h3>
              <div className="space-y-2">
                {info.details.map((detail, idx) => (
                  <p key={idx} className="text-gray-300 text-sm">{detail}</p>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Visit Us Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-16"
        >
          <div className="glass-card p-8 rounded-2xl border border-[#19c973]/30 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-[#19c973] to-[#16a362] rounded-full flex items-center justify-center mx-auto mb-6">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Visit Our <span className="gradient-text">Office</span>
            </h2>
            <p className="text-lg text-gray-300 mb-6">
              Experience the CodeSpaze learning environment firsthand
            </p>
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-3">CodeSpaze Headquarters</h3>
              <p className="text-gray-300 mb-2">Lucknow, Uttar Pradesh, India</p>
              <p className="text-gray-400 text-sm mb-4">The heart of tech innovation in North India</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-[#19c973] font-semibold">Prime Location</div>
                  <div className="text-gray-400">Central Lucknow</div>
                </div>
                <div className="text-center">
                  <div className="text-[#19c973] font-semibold">Easy Access</div>
                  <div className="text-gray-400">Near Metro & Bus Routes</div>
                </div>
                <div className="text-center">
                  <div className="text-[#19c973] font-semibold">Modern Facility</div>
                  <div className="text-gray-400">State-of-the-art Labs</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="glass-card p-8 rounded-2xl border border-[#19c973]/30"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
            
            {submitSuccess && (
              <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                  <p className="text-green-400 text-sm">Message sent successfully! We'll get back to you soon.</p>
                </div>
              </div>
            )}

            {errors.submit && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-red-400 text-sm">{errors.submit}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#19c973] focus:outline-none"
                    placeholder="Enter your name"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#19c973] focus:outline-none"
                    placeholder="Enter your email"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#19c973] focus:outline-none"
                  placeholder="What's this about?"
                />
                {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#19c973] focus:outline-none resize-none"
                  placeholder="Tell us more about your inquiry..."
                />
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center"
                size="lg"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Sending Message...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </motion.div>

          {/* Additional Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="space-y-8"
          >
            {/* Quick Response */}
            <div className="glass-card p-6 rounded-xl border border-[#19c973]/30">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <MessageCircle className="w-5 h-5 mr-2 text-[#19c973]" />
                Quick Response
              </h3>
              <p className="text-gray-300 mb-4">
                We typically respond to all inquiries within 24 hours during business days. 
                For urgent matters, please call us directly.
              </p>
              <div className="flex items-center text-sm text-gray-400">
                <Clock className="w-4 h-4 mr-2" />
                Response time: 24 hours
              </div>
            </div>

            {/* Social Media */}
            <div className="glass-card p-6 rounded-xl border border-[#19c973]/30">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Globe className="w-5 h-5 mr-2 text-[#19c973]" />
                Connect With Us
              </h3>
              <p className="text-gray-300 mb-4">
                Follow us on social media for the latest updates, program announcements, and tech insights.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 bg-gray-800 rounded-lg border border-gray-600 hover:border-[#19c973]/50 transition-all duration-200 ${social.color}`}
                    title={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Methods */}
            <div className="glass-card p-6 rounded-xl border border-[#19c973]/30">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Mail className="w-5 h-5 mr-2 text-[#19c973]" />
                Contact Methods
              </h3>
              <div className="space-y-4">
                <div className="p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                  <div className="text-[#19c973] font-semibold text-sm mb-1">General Inquiries</div>
                  <div className="text-gray-300 text-sm">contact@codespaze.org</div>
                </div>
                <div className="p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                  <div className="text-[#19c973] font-semibold text-sm mb-1">Technical Support</div>
                  <div className="text-gray-300 text-sm">email-support@codespaze.org</div>
                </div>
                <div className="p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                  <div className="text-[#19c973] font-semibold text-sm mb-1">Office Location</div>
                  <div className="text-gray-300 text-sm">Lucknow, Uttar Pradesh, India</div>
                </div>
              </div>
            </div>

            {/* FAQ Link */}
            <div className="glass-card p-6 rounded-xl border border-[#19c973]/30">
              <h3 className="text-xl font-semibold text-white mb-4">Have Questions?</h3>
              <p className="text-gray-300 mb-4">
                Check out our frequently asked questions for quick answers to common inquiries.
              </p>
              <Button variant="outline" className="w-full">
                View FAQ
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
