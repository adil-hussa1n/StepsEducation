import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const ThemeContext = createContext();

// Custom hook for using the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Theme provider component
export const ThemeProvider = ({ children }) => {
  // Initialize state from localStorage or default to false
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('darkMode');
      return saved ? JSON.parse(saved) : false;
    }
    return false;
  });

  // Toggle theme function
  const toggleTheme = () => {
    setDarkMode(prevMode => !prevMode);
  };

  // Update localStorage and apply class when theme changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('darkMode', JSON.stringify(darkMode));
      
      if (darkMode) {
        document.documentElement.classList.add('dark');
        document.body.classList.add('bg-gray-900');
        document.body.classList.add('text-white');
      } else {
        document.documentElement.classList.remove('dark');
        document.body.classList.remove('bg-gray-900');
        document.body.classList.remove('text-white');
      }
    }
  }, [darkMode]);

  // Theme object with colors and styles
  const themeObject = {
    colors: {
      primary: {
        500: '#6366f1',
        600: '#4f46e5',
      },
      secondary: {
        500: '#3b82f6',
        600: '#2563eb',
      }
    },
    gradients: {
      primary: 'bg-gradient-to-r from-indigo-600 to-blue-500',
      text: 'bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-blue-500',
    }
  };

  // Value to be provided by the context
  const value = {
    darkMode,
    toggleTheme,
    themeObject
  };

  // Using React.createElement instead of JSX to avoid parsing errors
  return React.createElement(
    ThemeContext.Provider,
    { value },
    children
  );
};

export default ThemeProvider;
