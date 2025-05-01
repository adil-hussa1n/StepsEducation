import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ROUTES } from './constants/routes';
import useScrollToTop from './useScrollToTop'; // 👈 Import your hook

// Import your components
import Home from './pages/Home';
import Contact from './pages/Contact';
import CVJobsPortal from './pages/CVJobsPortal';
import AdmissionProcess from './pages/AdmissionProcess';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Preloader from './components/layout/Preloader';

function App() {
  useScrollToTop(); // 👈 Call the hook here
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time or wait for resources to load
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      {loading && <Preloader />}
      <Navbar isVisible={!loading} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path={ROUTES.CV_JOBS} element={<CVJobsPortal />} />
        <Route path={ROUTES.CONTACT} element={<Contact />} />
        <Route path={ROUTES.ADMISSION_PROCESS} element={<AdmissionProcess />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
