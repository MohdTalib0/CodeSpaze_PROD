import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, Github, Mail, AlertCircle, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/UI/Button';

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginError {
  type: 'email' | 'password' | 'general' | 'network' | 'server';
  message: string;
}

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<LoginError | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<LoginFormData>();

  const clearLoginError = () => {
    setLoginError(null);
    clearErrors();
  };

  const getErrorMessage = (error: any): LoginError => {
    // Network errors
    if (!error.response) {
      return {
        type: 'network',
        message: 'Network error. Please check your internet connection and try again.'
      };
    }

    const status = error.response.status;
    const errorData = error.response.data;

    switch (status) {
      case 400:
        if (errorData.error?.includes('password')) {
          return {
            type: 'password',
            message: 'Incorrect password. Please try again.'
          };
        }
        if (errorData.error?.includes('email')) {
          return {
            type: 'email',
            message: 'Invalid email format or missing required fields.'
          };
        }
        return {
          type: 'general',
          message: errorData.error || 'Invalid login credentials. Please check your email and password.'
        };

      case 401:
        if (errorData.error?.toLowerCase().includes('password')) {
          return {
            type: 'password',
            message: 'Wrong password. Please check your password and try again.'
          };
        }
        if (errorData.error?.toLowerCase().includes('email') || errorData.error?.toLowerCase().includes('user')) {
          return {
            type: 'email',
            message: 'User not found. Please check your email or create a new account.'
          };
        }
        return {
          type: 'general',
          message: 'Invalid credentials. Please check your email and password.'
        };

      case 403:
        return {
          type: 'general',
          message: 'Account is locked or suspended. Please contact support.'
        };

      case 404:
        return {
          type: 'email',
          message: 'User not found. Please check your email or sign up for a new account.'
        };

      case 422:
        return {
          type: 'general',
          message: 'Invalid input data. Please check your email and password format.'
        };

      case 429:
        return {
          type: 'general',
          message: 'Too many login attempts. Please wait a few minutes before trying again.'
        };

      case 500:
        return {
          type: 'server',
          message: 'Server error. Please try again later or contact support.'
        };

      default:
        return {
          type: 'general',
          message: errorData.error || 'Login failed. Please try again.'
        };
    }
  };

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setLoginError(null);
    
    try {
      await login(data.email, data.password);
      // Small delay to ensure state is updated before navigation
      setTimeout(() => {
        navigate('/dashboard');
      }, 100);
    } catch (error: any) {
      console.error('Login failed:', error);
      const loginError = getErrorMessage(error);
      setLoginError(loginError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Welcome <span className="gradient-text">back</span>
            </h2>
            <p className="text-gray-400">
              Sign in to your account to continue your learning journey
            </p>
          </div>

          {/* Login Form */}
          <div className="glass-card p-8 rounded-2xl border border-[#19c973]/30">
            {/* Error Alert */}
            {loginError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`mb-6 p-4 rounded-lg border ${
                  loginError.type === 'password' 
                    ? 'bg-red-500/10 border-red-500/30 text-red-400'
                    : loginError.type === 'email'
                    ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400'
                    : loginError.type === 'network'
                    ? 'bg-orange-500/10 border-orange-500/30 text-orange-400'
                    : loginError.type === 'server'
                    ? 'bg-purple-500/10 border-purple-500/30 text-purple-400'
                    : 'bg-red-500/10 border-red-500/30 text-red-400'
                }`}
              >
                <div className="flex items-start">
                  <AlertCircle className="w-5 h-5 mt-0.5 mr-3 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{loginError.message}</p>
                    {loginError.type === 'email' && (
                      <p className="text-xs mt-1 opacity-80">
                        Don't have an account? <Link to="/register" className="underline hover:no-underline">Sign up here</Link>
                      </p>
                    )}
                    {loginError.type === 'password' && (
                      <p className="text-xs mt-1 opacity-80">
                        <Link to="/forgot-password" className="underline hover:no-underline">Forgot your password?</Link>
                      </p>
                    )}
                  </div>
                  <button
                    onClick={clearLoginError}
                    className="ml-2 text-current hover:opacity-70 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email address
                </label>
                <div className="relative">
                  <input
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      },
                    })}
                    type="email"
                    id="email"
                    className={`input-neon w-full pl-10 ${
                      loginError?.type === 'email' ? 'border-red-500/50 focus:border-red-500' : ''
                    }`}
                    placeholder="Enter your email"
                    onChange={() => {
                      if (loginError?.type === 'email') {
                        setLoginError(null);
                      }
                    }}
                  />
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters',
                      },
                    })}
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    className={`input-neon w-full pr-10 ${
                      loginError?.type === 'password' ? 'border-red-500/50 focus:border-red-500' : ''
                    }`}
                    placeholder="Enter your password"
                    onChange={() => {
                      if (loginError?.type === 'password') {
                        setLoginError(null);
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary-500"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-600 rounded bg-dark-800"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                    Remember me
                  </label>
                </div>
                <Link
                  to="/forgot-password"
                  className="text-sm text-primary-500 hover:text-primary-400 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={isLoading}
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </Button>
            </form>

            {/* Divider */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-600" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-dark-900 text-gray-400">Or continue with</span>
                </div>
              </div>
            </div>

            {/* OAuth Buttons */}
            <div className="mt-6 space-y-3">
              <button 
                type="button"
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-600 rounded-lg text-sm font-medium text-gray-300 hover:bg-white/5 transition-colors"
              >
                <Github className="w-5 h-5 mr-2" />
                Sign in with GitHub
              </button>
            </div>

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-400">
                Don't have an account?{' '}
                <Link
                  to="/register"
                  className="text-primary-500 hover:text-primary-400 font-medium transition-colors"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
