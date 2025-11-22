import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, User, Settings, LogOut, Menu } from 'lucide-react';
import { mockUserProfile } from '../../data/mockData';
import { cn } from '../../lib/utils';

interface TopHeaderProps {
  onMenuClick?: () => void;
}

export function TopHeader({ onMenuClick }: TopHeaderProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const notificationsDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
      if (notificationsDropdownRef.current && !notificationsDropdownRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuItems = [
    { icon: User, label: 'Profile', onClick: () => console.log('Profile') },
    { icon: Settings, label: 'Settings', onClick: () => console.log('Settings') },
    { icon: LogOut, label: 'Logout', onClick: () => console.log('Logout'), danger: true },
  ];

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-sm">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {onMenuClick && (
            <button
              onClick={onMenuClick}
              className="hidden lg:block p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5 text-slate-700" />
            </button>
          )}
          <h2 className="text-xl font-semibold text-slate-900">Dashboard</h2>
        </div>

        <div className="flex items-center gap-4">
          {/* Notifications */}
          <div className="relative" ref={notificationsDropdownRef}>
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Bell className="w-5 h-5 text-slate-700" />
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full"
              />
            </button>

            <AnimatePresence>
              {notificationsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-80 glass-card p-4 shadow-xl z-50"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-slate-900">Notifications</h3>
                    <button
                      onClick={() => setNotificationsOpen(false)}
                      className="text-sm text-medical-blue hover:underline"
                    >
                      Clear all
                    </button>
                  </div>
                  <div className="space-y-2">
                    <div className="p-3 bg-slate-50 rounded-lg">
                      <p className="text-sm font-semibold text-slate-900">Missed Medication</p>
                      <p className="text-xs text-slate-600 mt-1">Pain Relief was not taken at noon</p>
                      <p className="text-xs text-slate-500 mt-1">2 hours ago</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg">
                      <p className="text-sm font-semibold text-slate-900">Low Activity Alert</p>
                      <p className="text-xs text-slate-600 mt-1">Steps below daily goal</p>
                      <p className="text-xs text-slate-500 mt-1">5 hours ago</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Profile */}
          <div className="relative" ref={profileDropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-3 pl-4 border-l border-slate-200 hover:opacity-80 transition-opacity"
            >
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-slate-900">{mockUserProfile.name}</p>
                <p className="text-xs text-slate-600">Doctor</p>
              </div>
              <div className="relative">
                <img
                  src="https://i.pravatar.cc/150?u=doctor"
                  alt={mockUserProfile.name}
                  className="w-10 h-10 rounded-full border-2 border-medical-blue/20 object-cover"
                />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
              </div>
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-56 glass-card p-2 shadow-xl z-50"
                >
                  <div className="p-3 border-b border-slate-200/50 mb-2">
                    <p className="font-semibold text-slate-900">{mockUserProfile.name}</p>
                    <p className="text-xs text-slate-600">sarah.chen@seniorsync.com</p>
                  </div>
                  <div className="space-y-1">
                    {menuItems.map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <motion.button
                          key={item.label}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() => {
                            item.onClick();
                            setDropdownOpen(false);
                          }}
                          className={cn(
                            'w-full flex items-center gap-3 px-3 py-2 rounded-lg',
                            'transition-colors text-left',
                            item.danger
                              ? 'text-red-600 hover:bg-red-50'
                              : 'text-slate-700 hover:bg-slate-100'
                          )}
                        >
                          <Icon className="w-4 h-4" />
                          <span className="text-sm font-medium">{item.label}</span>
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}

