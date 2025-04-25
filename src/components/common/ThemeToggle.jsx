import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  const handleToggle = () => {
    toggleTheme();
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      onClick={handleToggle}
      className="relative rounded-full w-12 h-6 bg-gradient-to-r from-indigo-400 to-blue-500 flex items-center p-1 shadow-inner overflow-hidden focus:outline-none"
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
    >
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{ 
          background: isDarkMode 
            ? 'linear-gradient(to right, #0f172a, #1e293b)' 
            : 'linear-gradient(to right, #3b82f6, #6366f1)' 
        }}
      />
      
      <motion.div
        className="absolute w-full h-full flex justify-between items-center px-1.5"
      >
        {/* Sun Icon */}
        <svg 
          className={`w-3 h-3 text-yellow-300 ${isDarkMode ? 'opacity-50' : 'opacity-100'}`} 
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
        </svg>
        
        {/* Moon Icon */}
        <svg 
          className={`w-3 h-3 text-white ${isDarkMode ? 'opacity-100' : 'opacity-50'}`} 
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      </motion.div>
      
      <motion.div
        layout
        initial={false}
        animate={{ x: isDarkMode ? '100%' : '0%' }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className="w-4 h-4 bg-white rounded-full transform -translate-x-1"
      />
    </motion.button>
  );
};

export default ThemeToggle; 