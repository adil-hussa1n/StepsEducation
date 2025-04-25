import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import useTheme from '../../hooks/useTheme';
import ThemeToggle from '../common/ThemeToggle';

const Navbar = ({ isVisible = true }) => {
  const { themeObject } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${!isVisible ? 'opacity-0 pointer-events-none invisible' : 'opacity-100 visible'} ${
      scrolled ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg' : 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500">STEPS</span>
              <span className="text-gray-700 dark:text-gray-200 font-normal text-lg">Education</span>
            </motion.span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/admission-process">Admission Process</NavLink>
            <NavLink to="/cv-jobs">CV & Jobs Portal</NavLink>
            <ThemeToggle />
            <Link 
              to="/contact" 
              className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-full font-medium hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <button
              className="text-indigo-600 dark:text-indigo-400"
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white dark:bg-gray-800 py-4 space-y-4 border-t border-gray-100 dark:border-gray-700 rounded-b-2xl shadow-lg"
          >
            <MobileNavLink to="/" onClick={() => setIsOpen(false)}>Home</MobileNavLink>
            <MobileNavLink to="/admission-process" onClick={() => setIsOpen(false)}>Admission Process</MobileNavLink>
            <MobileNavLink to="/cv-jobs" onClick={() => setIsOpen(false)}>CV & Jobs Portal</MobileNavLink>
            <div className="pt-2 px-4">
              <Link
                to="/contact"
                className="block w-full text-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-full font-medium hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300"
                onClick={() => setIsOpen(false)}
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        )}
      </div>
      
      {/* Top Bar with Contact Info */}
      <div className={`hidden lg:block w-full bg-gradient-to-r from-indigo-900 to-blue-800 text-white py-2 text-sm transition-all duration-300 ${scrolled ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              info@stepseeducation.co.uk
            </span>
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              +44-475-63228537
            </span>
          </div>
          <div>
            <span className="font-medium bg-white/10 px-3 py-1 rounded-full text-xs">YOUR DREAM OUR JOB!</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, children }) => (
  <Link
    to={to}
    className="text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors relative group"
  >
    {children}
    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-600 to-blue-500 transition-all group-hover:w-full"></span>
  </Link>
);

const MobileNavLink = ({ to, children, onClick }) => (
  <Link
    to={to}
    className="block text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors px-4 py-2 hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
    onClick={onClick}
  >
    {children}
  </Link>
);

export default Navbar; 