import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Users, Settings, X, Menu } from 'lucide-react';
import { cn } from '../../lib/utils';
import { TopHeader } from './TopHeader';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: true },
    { icon: Users, label: 'Patients', active: false },
    { icon: Settings, label: 'Settings', active: false },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-xl shadow-lg"
      >
        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <AnimatePresence>
        {(sidebarOpen || mobileMenuOpen) && (
          <>
            {/* Mobile Overlay */}
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
                className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              />
            )}

            {/* Sidebar */}
            <motion.aside
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={cn(
                'fixed left-0 top-0 h-full z-40',
                'bg-white/80 backdrop-blur-md border-r border-slate-200/50',
                'w-64 shadow-2xl',
                mobileMenuOpen ? 'block' : 'hidden lg:block'
              )}
            >
              <div className="p-6">
                {/* Logo */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8"
                >
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-medical-blue to-medical-blue-dark bg-clip-text text-transparent">
                    SeniorSync
                  </h1>
                  <p className="text-xs text-slate-600 mt-1">Health Monitoring</p>
                </motion.div>

                {/* Navigation */}
                <nav className="space-y-2">
                  {navItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <motion.button
                        key={item.label}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={cn(
                          'w-full flex items-center gap-3 px-4 py-3 rounded-xl',
                          'transition-all duration-200',
                          item.active
                            ? 'bg-medical-blue text-white shadow-lg'
                            : 'text-slate-700 hover:bg-slate-100'
                        )}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                      </motion.button>
                    );
                  })}
                </nav>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className={cn('transition-all duration-300', sidebarOpen ? 'lg:pl-64' : 'lg:pl-0')}>
        {/* Header */}
        <TopHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        {/* Page Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}

