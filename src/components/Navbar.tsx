import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Close menu first
      setIsMenuOpen(false);
      
      // Wait for menu animation to complete
      setTimeout(() => {
        const navHeight = 80; // Height of the navbar
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }, 300); // Match this with menu animation duration
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'pt-4' : 'pt-8'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link 
              to="/"
              className="text-2xl font-bold tracking-wider text-white transition-colors"
            >
              JOBZ AI
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          {isHomePage && (
            <div className="hidden md:flex items-center justify-center">
              <div className="bg-[#6F58B8] rounded-lg flex items-center">
                <button 
                  onClick={() => scrollToSection('features')} 
                  className="px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#6F58B8]/80 rounded-l-lg"
                >
                  Features
                </button>
                <div className="w-px h-5 bg-white/20"></div>
                <button 
                  onClick={() => scrollToSection('pricing')} 
                  className="px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#6F58B8]/80"
                >
                  Pricing
                </button>
                <div className="w-px h-5 bg-white/20"></div>
                <button 
                  onClick={() => scrollToSection('how-it-works')} 
                  className="px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#6F58B8]/80"
                >
                  How It Works
                </button>
                <div className="w-px h-5 bg-white/20"></div>
                <button className="px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#6F58B8]/80 rounded-r-lg">
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Desktop Right Side Actions */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/login"
              className="text-white/90 hover:text-white font-medium transition-colors"
            >
              Sign in
            </Link>
            <Link
              to="/signup"
              className="bg-white text-[#8D75E6] px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:transform hover:scale-105 hover:bg-white/90"
            >
              Sign up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-2 rounded-lg hover:bg-white/10"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden"
          >
            <div className="px-4 pt-2 pb-4 bg-[#6F58B8]/95 backdrop-blur-sm">
              {isHomePage && (
                <div className="space-y-2">
                  <button
                    onClick={() => scrollToSection('features')}
                    className="block w-full text-left px-4 py-2 text-white hover:bg-white/10 rounded-lg"
                  >
                    Features
                  </button>
                  <button
                    onClick={() => scrollToSection('pricing')}
                    className="block w-full text-left px-4 py-2 text-white hover:bg-white/10 rounded-lg"
                  >
                    Pricing
                  </button>
                  <button
                    onClick={() => scrollToSection('how-it-works')}
                    className="block w-full text-left px-4 py-2 text-white hover:bg-white/10 rounded-lg"
                  >
                    How It Works
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-white hover:bg-white/10 rounded-lg"
                  >
                    <Search className="w-4 h-4" />
                  </button>
                </div>
              )}
              <div className="mt-4 pt-4 border-t border-white/20 space-y-2">
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-2 text-white hover:bg-white/10 rounded-lg"
                >
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-2 bg-white text-[#8D75E6] rounded-lg font-medium text-center"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}