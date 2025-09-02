import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Moon, Sun, Shield, Trash2, Save, CheckCircle, XCircle } from 'lucide-react';

type ThemeOption = 'system' | 'light' | 'dark';

const SettingsPage: React.FC = () => {
  const [theme, setTheme] = useState<ThemeOption>('system');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [productUpdates, setProductUpdates] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [profileVisibility, setProfileVisibility] = useState<'public' | 'private' | 'friends'>('public');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const STORAGE_KEY = useMemo(() => 'codespaze_user_settings', []);
  const THEME_KEY = useMemo(() => 'codespaze_theme', []);

  const applyTheme = (choice: ThemeOption) => {
    const root = document.documentElement;
    const media = window.matchMedia('(prefers-color-scheme: dark)');

    const setClass = (isDark: boolean) => {
      if (isDark) root.classList.add('dark');
      else root.classList.remove('dark');
    };

    if (choice === 'system') {
      setClass(media.matches);
    } else if (choice === 'dark') {
      setClass(true);
    } else {
      setClass(false);
    }
  };

  useEffect(() => {
    // Load from localStorage on mount
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.theme) setTheme(parsed.theme);
        if (typeof parsed.emailNotifications === 'boolean') setEmailNotifications(parsed.emailNotifications);
        if (typeof parsed.productUpdates === 'boolean') setProductUpdates(parsed.productUpdates);
        if (typeof parsed.marketingEmails === 'boolean') setMarketingEmails(parsed.marketingEmails);
        if (parsed.profileVisibility) setProfileVisibility(parsed.profileVisibility);
      } else {
        const storedTheme = (localStorage.getItem(THEME_KEY) as ThemeOption) || 'system';
        setTheme(storedTheme);
      }
    } catch (e) {
      // ignore corrupt storage
    }
  }, [STORAGE_KEY, THEME_KEY]);

  useEffect(() => {
    // Apply theme and sync system changes if on system
    applyTheme(theme);
    localStorage.setItem(THEME_KEY, theme);

    let media: MediaQueryList | null = null;
    const onChange = (e: MediaQueryListEvent) => {
      if (theme === 'system') {
        const root = document.documentElement;
        if (e.matches) root.classList.add('dark');
        else root.classList.remove('dark');
      }
    };
    if (theme === 'system') {
      media = window.matchMedia('(prefers-color-scheme: dark)');
      media.addEventListener('change', onChange);
    }
    return () => {
      if (media) media.removeEventListener('change', onChange);
    };
  }, [theme, THEME_KEY]);

  const handleSaveAll = async () => {
    try {
      setSaving(true);
      setError(null);
      setSaved(null);
      // Persist locally
      const payload = {
        theme,
        emailNotifications,
        productUpdates,
        marketingEmails,
        profileVisibility
      } as const;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));

      // Optional: try saving to backend if endpoint exists
      try {
        const token = localStorage.getItem('token');
        if (token) {
          await fetch('/api/users/settings', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload)
          }).catch(() => {});
        }
      } catch {}

      setSaved('Settings saved successfully');
    } catch (e) {
      setError('Failed to save settings');
    } finally {
      setSaving(false);
      setTimeout(() => setSaved(null), 2500);
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-5xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-2"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
          <p className="text-gray-400">Manage your preferences and account settings</p>
        </motion.div>

        {/* Appearance */}
        <div className="glass-card p-6 rounded-xl">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Moon className="w-5 h-5 mr-2" /> Appearance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <button
              onClick={() => setTheme('system')}
              className={`p-4 rounded-lg border text-left transition-colors ${
                theme === 'system' ? 'border-primary-500 bg-primary-500/10' : 'border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-center space-x-2 text-white">
                <Shield className="w-4 h-4" />
                <span>System</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">Follow your OS theme</p>
            </button>
            <button
              onClick={() => setTheme('light')}
              className={`p-4 rounded-lg border text-left transition-colors ${
                theme === 'light' ? 'border-primary-500 bg-primary-500/10' : 'border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-center space-x-2 text-white">
                <Sun className="w-4 h-4" />
                <span>Light</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">Bright interface</p>
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`p-4 rounded-lg border text-left transition-colors ${
                theme === 'dark' ? 'border-primary-500 bg-primary-500/10' : 'border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-center space-x-2 text-white">
                <Moon className="w-4 h-4" />
                <span>Dark</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">Low-light experience</p>
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="glass-card p-6 rounded-xl">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Bell className="w-5 h-5 mr-2" /> Notifications
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-white">Email notifications</div>
              <input type="checkbox" className="rounded" checked={emailNotifications} onChange={(e) => setEmailNotifications(e.target.checked)} />
            </div>
            <div className="flex items-center justify-between">
              <div className="text-white">Product updates</div>
              <input type="checkbox" className="rounded" checked={productUpdates} onChange={(e) => setProductUpdates(e.target.checked)} />
            </div>
            <div className="flex items-center justify-between">
              <div className="text-white">Marketing emails</div>
              <input type="checkbox" className="rounded" checked={marketingEmails} onChange={(e) => setMarketingEmails(e.target.checked)} />
            </div>
          </div>
        </div>

        {/* Privacy */}
        <div className="glass-card p-6 rounded-xl">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Shield className="w-5 h-5 mr-2" /> Privacy
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <label className="text-sm text-gray-300">Profile visibility</label>
            <select
              value={profileVisibility}
              onChange={(e) => setProfileVisibility(e.target.value as any)}
              className="md:col-span-2 p-3 bg-black/20 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary-500"
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
              <option value="friends">Friends Only</option>
            </select>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="glass-card p-6 rounded-xl border border-red-500/30">
          <h2 className="text-lg font-semibold text-white mb-4">Danger Zone</h2>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-white">Delete account</div>
              <div className="text-xs text-gray-400">This action is irreversible</div>
            </div>
            <button className="px-4 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 flex items-center">
              <Trash2 className="w-4 h-4 mr-2" /> Delete
            </button>
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex items-center justify-end gap-3">
          {error && (
            <div className="flex items-center text-red-400 text-sm">
              <XCircle className="w-4 h-4 mr-1" /> {error}
            </div>
          )}
          {saved && (
            <div className="flex items-center text-green-400 text-sm">
              <CheckCircle className="w-4 h-4 mr-1" /> {saved}
            </div>
          )}
          <button
            onClick={handleSaveAll}
            disabled={saving}
            className="px-4 py-2 rounded-lg bg-primary-500 text-dark-950 hover:bg-primary-400 disabled:opacity-60 flex items-center"
          >
            <Save className="w-4 h-4 mr-2" /> {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;


