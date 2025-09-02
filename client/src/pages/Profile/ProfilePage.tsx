import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Mail, 
  Calendar, 
  Shield, 
  Camera, 
  Save, 
  Edit3,
  X,
  Check,
  Upload,
  Eye,
  EyeOff,
  Lock,
  Key,
  AlertCircle,
  CheckCircle,
  Settings,
  Bell,
  Globe,
  Users
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/UI/Button';

interface UserProfile {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar_url?: string;
  created_at: string;
  updated_at?: string;
}

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    avatar_url: ''
  });
  
  // Modal states
  const [showChangeEmail, setShowChangeEmail] = useState(false);
  const [showPrivacySettings, setShowPrivacySettings] = useState(false);
  const [showSecuritySettings, setShowSecuritySettings] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);
  
  // Form states
  const [changeEmailForm, setChangeEmailForm] = useState({
    currentEmail: '',
    newEmail: '',
    password: ''
  });
  const [privacyForm, setPrivacyForm] = useState({
    profileVisibility: 'public',
    emailNotifications: true,
    marketingEmails: false,
    dataSharing: false
  });
  const [securityForm, setSecurityForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false
  });
  
  // UI states
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [uploadingImage, setUploadingImage] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/users/profile', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }

      const result = await response.json();
      if (result.success) {
        setProfile(result.data);
        setEditForm({
          name: result.data.name,
          email: result.data.email,
          avatar_url: result.data.avatar_url || ''
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch('/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(editForm)
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const result = await response.json();
      if (result.success) {
        setProfile(result.data);
        setIsEditing(false);
        setError(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
    }
  };

  const handleCancel = () => {
    setEditForm({
      name: profile?.name || '',
      email: profile?.email || '',
      avatar_url: profile?.avatar_url || ''
    });
    setIsEditing(false);
    setError(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Image upload functions
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB');
      return;
    }

    setUploadingImage(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('avatar', file);

      const response = await fetch('/api/users/upload-avatar', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const result = await response.json();
      if (result.success) {
        setEditForm(prev => ({ ...prev, avatar_url: result.data.avatar_url }));
        setSuccessMessage('Profile picture updated successfully!');
        setTimeout(() => setSuccessMessage(null), 3000);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload image');
    } finally {
      setUploadingImage(false);
    }
  };

  const triggerImageUpload = () => {
    fileInputRef.current?.click();
  };

  // Change email functions
  const handleChangeEmail = async () => {
    if (!changeEmailForm.newEmail || !changeEmailForm.password) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      const response = await fetch('/api/users/change-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          newEmail: changeEmailForm.newEmail,
          password: changeEmailForm.password
        })
      });

      if (!response.ok) {
        throw new Error('Failed to change email');
      }

      const result = await response.json();
      if (result.success) {
        setSuccessMessage('Email changed successfully! Please check your new email for verification.');
        setShowChangeEmail(false);
        setChangeEmailForm({ currentEmail: '', newEmail: '', password: '' });
        fetchProfile(); // Refresh profile
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to change email');
    }
  };

  // Privacy settings functions
  const handlePrivacySave = async () => {
    try {
      const response = await fetch('/api/users/privacy-settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(privacyForm)
      });

      if (!response.ok) {
        throw new Error('Failed to update privacy settings');
      }

      const result = await response.json();
      if (result.success) {
        setSuccessMessage('Privacy settings updated successfully!');
        setShowPrivacySettings(false);
        setTimeout(() => setSuccessMessage(null), 3000);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update privacy settings');
    }
  };

  // Security settings functions
  const handleSecuritySave = async () => {
    if (securityForm.newPassword !== securityForm.confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    if (securityForm.newPassword && securityForm.newPassword.length < 8) {
      setError('New password must be at least 8 characters long');
      return;
    }

    try {
      const response = await fetch('/api/users/security-settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          currentPassword: securityForm.currentPassword,
          newPassword: securityForm.newPassword,
          twoFactorEnabled: securityForm.twoFactorEnabled
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update security settings');
      }

      const result = await response.json();
      if (result.success) {
        setSuccessMessage('Security settings updated successfully!');
        setShowSecuritySettings(false);
        setSecurityForm({ currentPassword: '', newPassword: '', confirmPassword: '', twoFactorEnabled: false });
        setTimeout(() => setSuccessMessage(null), 3000);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update security settings');
    }
  };

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card p-8 rounded-xl text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
            <p className="text-gray-400 mt-4">Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card p-8 rounded-xl text-center">
            <div className="text-red-400 mb-4">
              <X className="w-16 h-16 mx-auto" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Error Loading Profile</h2>
            <p className="text-gray-400 mb-6">{error}</p>
            <Button variant="primary" onClick={fetchProfile}>
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card p-8 rounded-xl text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Profile Not Found</h2>
            <p className="text-gray-400">Unable to load your profile information.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            <span className="gradient-text">Profile</span> Settings
          </h1>
          <p className="text-lg text-gray-300">
            Manage your account information and preferences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="glass-card p-6 rounded-xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-white">Personal Information</h2>
                {!isEditing ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={handleSave}
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCancel}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                {/* Avatar Section */}
                <div className="flex items-center space-x-4">
                  <div className="relative group">
                    <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white text-2xl font-bold overflow-hidden">
                      {editForm.avatar_url ? (
                        <img 
                          src={editForm.avatar_url} 
                          alt="Profile" 
                          className="w-20 h-20 rounded-full object-cover"
                        />
                      ) : (
                        profile.name?.charAt(0).toUpperCase() || 'U'
                      )}
                    </div>
                    <button
                      onClick={triggerImageUpload}
                      className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      <Camera className="w-6 h-6 text-white" />
                    </button>
                    {uploadingImage && (
                      <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">{profile.name}</h3>
                    <p className="text-gray-400">{profile.role}</p>
                    <button
                      onClick={triggerImageUpload}
                      className="text-sm text-primary-500 hover:text-primary-400 transition-colors mt-1"
                    >
                      {editForm.avatar_url ? 'Change Photo' : 'Add Photo'}
                    </button>
                  </div>
                </div>
                
                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full p-3 bg-black/20 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 transition-colors"
                        placeholder="Enter your full name"
                      />
                    ) : (
                      <div className="p-3 bg-black/20 border border-white/10 rounded-lg text-white">
                        {profile.name}
                      </div>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={editForm.email}
                        onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full p-3 bg-black/20 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 transition-colors"
                        placeholder="Enter your email"
                      />
                    ) : (
                      <div className="p-3 bg-black/20 border border-white/10 rounded-lg text-white">
                        {profile.email}
                      </div>
                    )}
                  </div>

                  {/* Avatar URL Field */}
                </div>

                {/* Error Display */}
                {error && (
                  <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Account Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="space-y-6"
          >
            {/* Account Information */}
            <div className="glass-card p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-4">Account Details</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-primary-500" />
                  <div>
                    <p className="text-sm text-gray-400">Role</p>
                    <p className="text-white font-medium capitalize">{profile.role}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-primary-500" />
                  <div>
                    <p className="text-sm text-gray-400">Member Since</p>
                    <p className="text-white font-medium">{formatDate(profile.created_at)}</p>
                  </div>
                </div>

                {profile.updated_at && (
                  <div className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-primary-500" />
                    <div>
                      <p className="text-sm text-gray-400">Last Updated</p>
                      <p className="text-white font-medium">{formatDate(profile.updated_at)}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="glass-card p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => setShowChangeEmail(true)}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Change Email
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => setShowPrivacySettings(true)}
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Privacy Settings
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => setShowSecuritySettings(true)}
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Account Security
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Success Message */}
        <AnimatePresence>
          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50 max-w-sm"
            >
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>{successMessage}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Change Email Modal */}
        <AnimatePresence>
          {showChangeEmail && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gray-900 rounded-xl p-6 max-w-md w-full mx-4"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white flex items-center">
                    <Mail className="w-6 h-6 mr-2" />
                    Change Email
                  </h2>
                  <button
                    onClick={() => setShowChangeEmail(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Current Email
                    </label>
                    <input
                      type="email"
                      value={profile?.email || ''}
                      disabled
                      className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-gray-400"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      New Email
                    </label>
                    <input
                      type="email"
                      value={changeEmailForm.newEmail}
                      onChange={(e) => setChangeEmailForm(prev => ({ ...prev, newEmail: e.target.value }))}
                      className="w-full p-3 bg-black/20 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 transition-colors"
                      placeholder="Enter new email address"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Current Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPasswords.current ? 'text' : 'password'}
                        value={changeEmailForm.password}
                        onChange={(e) => setChangeEmailForm(prev => ({ ...prev, password: e.target.value }))}
                        className="w-full p-3 bg-black/20 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 transition-colors pr-10"
                        placeholder="Enter your current password"
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility('current')}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                      >
                        {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  
                  {error && (
                    <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
                      <p className="text-red-400 text-sm">{error}</p>
                    </div>
                  )}
                  
                  <div className="flex space-x-3 pt-4">
                    <Button
                      variant="primary"
                      onClick={handleChangeEmail}
                      className="flex-1"
                    >
                      Change Email
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowChangeEmail(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Privacy Settings Modal */}
        <AnimatePresence>
          {showPrivacySettings && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gray-900 rounded-xl p-6 max-w-md w-full mx-4"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white flex items-center">
                    <Shield className="w-6 h-6 mr-2" />
                    Privacy Settings
                  </h2>
                  <button
                    onClick={() => setShowPrivacySettings(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Profile Visibility
                    </label>
                    <select
                      value={privacyForm.profileVisibility}
                      onChange={(e) => setPrivacyForm(prev => ({ ...prev, profileVisibility: e.target.value }))}
                      className="w-full p-3 bg-black/20 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary-500 transition-colors"
                    >
                      <option value="public">Public</option>
                      <option value="private">Private</option>
                      <option value="friends">Friends Only</option>
                    </select>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Bell className="w-4 h-4 text-primary-500" />
                        <span className="text-white">Email Notifications</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={privacyForm.emailNotifications}
                        onChange={(e) => setPrivacyForm(prev => ({ ...prev, emailNotifications: e.target.checked }))}
                        className="rounded"
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-primary-500" />
                        <span className="text-white">Marketing Emails</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={privacyForm.marketingEmails}
                        onChange={(e) => setPrivacyForm(prev => ({ ...prev, marketingEmails: e.target.checked }))}
                        className="rounded"
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-primary-500" />
                        <span className="text-white">Data Sharing</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={privacyForm.dataSharing}
                        onChange={(e) => setPrivacyForm(prev => ({ ...prev, dataSharing: e.target.checked }))}
                        className="rounded"
                      />
                    </div>
                  </div>
                  
                  <div className="flex space-x-3 pt-4">
                    <Button
                      variant="primary"
                      onClick={handlePrivacySave}
                      className="flex-1"
                    >
                      Save Settings
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowPrivacySettings(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Security Settings Modal */}
        <AnimatePresence>
          {showSecuritySettings && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gray-900 rounded-xl p-6 max-w-md w-full mx-4"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white flex items-center">
                    <Lock className="w-6 h-6 mr-2" />
                    Security Settings
                  </h2>
                  <button
                    onClick={() => setShowSecuritySettings(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Current Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPasswords.current ? 'text' : 'password'}
                        value={securityForm.currentPassword}
                        onChange={(e) => setSecurityForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                        className="w-full p-3 bg-black/20 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 transition-colors pr-10"
                        placeholder="Enter current password"
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility('current')}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                      >
                        {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPasswords.new ? 'text' : 'password'}
                        value={securityForm.newPassword}
                        onChange={(e) => setSecurityForm(prev => ({ ...prev, newPassword: e.target.value }))}
                        className="w-full p-3 bg-black/20 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 transition-colors pr-10"
                        placeholder="Enter new password"
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility('new')}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                      >
                        {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPasswords.confirm ? 'text' : 'password'}
                        value={securityForm.confirmPassword}
                        onChange={(e) => setSecurityForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        className="w-full p-3 bg-black/20 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 transition-colors pr-10"
                        placeholder="Confirm new password"
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility('confirm')}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                      >
                        {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Key className="w-4 h-4 text-primary-500" />
                      <span className="text-white">Two-Factor Authentication</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={securityForm.twoFactorEnabled}
                      onChange={(e) => setSecurityForm(prev => ({ ...prev, twoFactorEnabled: e.target.checked }))}
                      className="rounded"
                    />
                  </div>
                  
                  {error && (
                    <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
                      <p className="text-red-400 text-sm">{error}</p>
                    </div>
                  )}
                  
                  <div className="flex space-x-3 pt-4">
                    <Button
                      variant="primary"
                      onClick={handleSecuritySave}
                      className="flex-1"
                    >
                      Save Settings
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowSecuritySettings(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProfilePage;
