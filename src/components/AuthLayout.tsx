import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ScrollText, Lightbulb, Settings, CreditCard, User, Menu, X, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AuthLayoutProps {
  children: ReactNode;
}

interface UserProfile {
  name: string;
  credits: number;
  image?: string;
  status: 'online' | 'offline' | 'away';
}

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Campaigns', href: '/campaigns', icon: ScrollText },
  { name: 'Recommendations', href: '/recommendations', icon: Lightbulb },
  { name: 'Billing', href: '/billing', icon: CreditCard },
  { name: 'Settings', href: '/settings', icon: Settings },
];

// This would come from your auth context/state
const userProfile: UserProfile = {
  name: "John",
  credits: 150,
  image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  status: 'online'
};

const statusColors = {
  online: 'bg-green-500',
  offline: 'bg-gray-400',
  away: 'bg-yellow-500'
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileExpanded, setIsProfileExpanded] = useState(false);

  const UserProfileSection = () => (
    <div 
      className="relative p-4 border-t border-white/20 cursor-pointer group"
      onClick={() => setIsProfileExpanded(!isProfileExpanded)}
    >
      <div className="flex items-center space-x-3">
        <div className="relative">
          {userProfile.image ? (
            <img
              src={userProfile.image}
              alt={userProfile.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-white/20 transition-transform group-hover:scale-105"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border-2 border-white/20">
              <User className="w-6 h-6 text-white/80" />
            </div>
          )}
          <div className={`absolute -top-1 -right-1 w-4 h-4 ${statusColors[userProfile.status]} rounded-full border-2 border-[#8D75E6]`} />
        </div>
        <div className="flex-grow">
          <div className="text-base font-medium text-white group-hover:text-white/90 transition-colors">
            Hello, {userProfile.name}
          </div>
          <div className="flex items-center text-sm text-white/80 group-hover:text-white/70 transition-colors">
            <CreditCard className="w-4 h-4 mr-1.5" />
            {userProfile.credits} credits
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isProfileExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full left-0 w-full bg-[#7B65D4] rounded-t-lg overflow-hidden shadow-lg"
          >
            <div className="p-4 space-y-2">
              <Link
                to="/settings"
                className="flex items-center space-x-2 text-white/90 hover:text-white py-2 px-3 rounded-lg hover:bg-white/10 transition-colors"
              >
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </Link>
              <button
                onClick={() => {
                  // Handle logout
                }}
                className="w-full flex items-center space-x-2 text-white/90 hover:text-white py-2 px-3 rounded-lg hover:bg-white/10 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign out</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="md:hidden bg-[#8D75E6] text-white fixed top-0 left-0 right-0 z-50 px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-bold">
            JOBZ AI
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div className="fixed inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />
            <div className="fixed inset-y-0 left-0 w-64 bg-[#8D75E6] text-white flex flex-col">
              {/* Logo */}
              <div className="flex h-16 items-center justify-center border-b border-white/20">
                <Link to="/" className="text-xl font-bold">
                  JOBZ AI
                </Link>
              </div>

              {/* Navigation */}
              <nav className="flex-grow py-4">
                <ul className="space-y-1 px-3">
                  {navigation.map((item) => {
                    const isActive = location.pathname === item.href;
                    return (
                      <li key={item.name}>
                        <Link
                          to={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                            isActive
                              ? 'bg-[#6956A8] text-white'
                              : 'text-white hover:bg-[#6956A8]/50'
                          }`}
                        >
                          <item.icon className="mr-3 h-5 w-5" />
                          {item.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* User Profile Section */}
              <UserProfileSection />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <div className="hidden md:fixed md:inset-y-0 md:left-0 md:w-64 md:block">
        <div className="h-full bg-[#8D75E6] text-white flex flex-col">
          <div className="flex h-16 items-center justify-center border-b border-white/20">
            <Link to="/" className="text-xl font-bold">
              JOBZ AI
            </Link>
          </div>
          
          {/* Navigation */}
          <nav className="mt-8 flex-grow">
            <ul className="space-y-2 px-4">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                        isActive
                          ? 'bg-[#6956A8] text-white'
                          : 'text-white hover:bg-[#6956A8]/50'
                      }`}
                    >
                      <item.icon className="mr-3 h-5 w-5" />
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* User Profile Section */}
          <UserProfileSection />
        </div>
      </div>

      {/* Main Content */}
      <div className="md:pl-64">
        <main className="py-8 px-4 md:px-8 mt-14 md:mt-0">
          {children}
        </main>
      </div>
    </div>
  );
}