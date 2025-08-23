import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search, AlertTriangle } from 'lucide-react';
import Button from '../components/UI/Button';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* 404 Number */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-8xl md:text-9xl font-bold gradient-text"
          >
            404
          </motion.div>

          {/* Error Message */}
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Page Not Found
            </h1>
            <p className="text-lg text-gray-300">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button variant="primary" size="lg" className="w-full sm:w-auto">
                <Home className="w-5 h-5 mr-2" />
                Go Home
              </Button>
            </Link>
            <button
              onClick={() => window.history.back()}
              className="btn-neon w-full sm:w-auto"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go Back
            </button>
          </div>

          {/* Additional Help */}
          <div className="text-sm text-gray-400">
            <p>Need help? Contact our support team</p>
            <Link
              to="/contact"
              className="text-primary-500 hover:text-primary-400 transition-colors"
            >
              Get Support
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFoundPage;
