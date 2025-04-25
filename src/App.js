import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout';
import { ROUTES } from './constants/routes';
import { useTheme } from './context/ThemeContext';

// Page imports
import Home from './pages/Home';
import Contact from './pages/Contact';
import AdmissionProcess from './pages/AdmissionProcess';
import CVJobsPortal from './pages/CVJobsPortal';

function App() {
  const { isDarkMode } = useTheme();
  
  // Apply dark mode class on document.documentElement
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);
  
  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path={ROUTES.ADMISSION_PROCESS} element={<AdmissionProcess />} />
          <Route path={ROUTES.CV_JOBS} element={<CVJobsPortal />} />
          <Route path={ROUTES.CONTACT} element={<Contact />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
