import { useContext } from 'react';
import { useTheme as useThemeContext } from '../context/ThemeContext';

/**
 * Custom hook to provide consistent theme colors across the application
 * Forwards the theme context values for backward compatibility
 */
const useTheme = () => {
  const { isDarkMode, toggleTheme } = useThemeContext();
  
  return {
    theme: isDarkMode ? 'dark' : 'light',
    toggleTheme,
    isDarkMode,
    themeObject: {
      colors: {
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',  // indigo-500
          600: '#4f46e5',  // indigo-600
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        secondary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',  // blue-500
          600: '#2563eb',  // blue-600
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        accent: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',  // purple-500
          600: '#9333ea',  // purple-600
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581c87',
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        success: '#10b981',  // emerald-500
        warning: '#f59e0b',  // amber-500
        error: '#ef4444',    // red-500
        info: '#06b6d4',     // cyan-500
      },
      
      gradients: {
        primary: 'bg-gradient-to-r from-indigo-600 to-blue-500',
        primaryHover: 'hover:from-indigo-700 hover:to-blue-600',
        hero: 'bg-gradient-to-br from-indigo-900/90 via-blue-800/70 to-purple-800/60',
        text: 'bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-blue-500',
        lightText: 'bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-indigo-100',
      },
      
      components: {
        button: {
          primary: `px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-semibold 
                 rounded-full hover:from-indigo-700 hover:to-blue-600 shadow-lg shadow-indigo-500/30 
                 transition-all duration-300 text-center transform hover:-translate-y-1`,
          secondary: `px-6 py-3 bg-white border border-indigo-200 text-indigo-600 font-semibold 
                   rounded-full hover:bg-indigo-50 hover:border-indigo-300 transition-all 
                   duration-300 text-center transform hover:-translate-y-1`,
          outline: `px-6 py-3 bg-white/10 backdrop-blur-md border border-white/30 text-white 
                 font-semibold rounded-full hover:bg-white/20 transition-all duration-300 
                 text-center transform hover:-translate-y-1`,
        },
        card: {
          glass: `bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl`,
          solid: `bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl 
               hover:border-indigo-100 transition-all duration-300`,
        },
        input: `w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 
             focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200`,
      },
    }
  };
};

export default useTheme; 