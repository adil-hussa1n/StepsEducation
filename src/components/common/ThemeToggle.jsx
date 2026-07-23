import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`relative w-14 h-8 rounded-full p-1 cursor-pointer transition-colors duration-300 focus:outline-none flex items-center ${
        darkMode 
          ? 'bg-gray-800 border border-gray-700 shadow-inner' 
          : 'bg-indigo-100 border border-indigo-200 shadow-sm'
      }`}
      aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
    >
      {/* Background Icons (inactive/static references under the track) */}
      <div className="absolute inset-0 flex justify-between items-center px-2.5 pointer-events-none">
        <FaSun className={`w-3.5 h-3.5 transition-colors duration-300 ${darkMode ? 'text-gray-600' : 'text-amber-500 opacity-20'}`} />
        <FaMoon className={`w-3.5 h-3.5 transition-colors duration-300 ${darkMode ? 'text-indigo-400 opacity-20' : 'text-gray-400'}`} />
      </div>

      {/* Sliding Knob */}
      <motion.div
        layout
        initial={false}
        animate={{ 
          x: darkMode ? 24 : 0,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
        className={`w-6 h-6 rounded-full shadow-md flex items-center justify-center relative z-10 transition-colors duration-300 ${
          darkMode ? 'bg-indigo-900 text-yellow-300' : 'bg-white text-amber-500'
        }`}
      >
        <AnimatePresence mode="wait" initial={false}>
          {darkMode ? (
            <motion.div
              key="moon"
              initial={{ scale: 0.6, rotate: -45, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0.6, rotate: 45, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <FaMoon className="w-3.5 h-3.5" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ scale: 0.6, rotate: 45, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0.6, rotate: -45, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <FaSun className="w-3.5 h-3.5" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </button>
  );
};

export default ThemeToggle;