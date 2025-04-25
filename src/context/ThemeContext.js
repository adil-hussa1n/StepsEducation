import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

// Create a custom hook for consuming the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return {
    isDarkMode: context.darkMode,
    toggleTheme: context.toggleTheme
  };
};

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    // Check if theme is stored in localStorage
    const savedTheme = localStorage.getItem('darkMode');
    
    if (savedTheme !== null) {
      return JSON.parse(savedTheme);
    }
    
    // Check if user prefers dark mode at system level
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark;
  });

  // Initialize theme on mount
  useEffect(() => {
    // Apply initial dark mode class
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Update localStorage and apply class whenever theme changes
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    
    // Apply dark mode class to the document
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider; 