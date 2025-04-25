import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ROUTES } from './constants/routes';
// Import your components
import Home from './pages/Home';
import Contact from './pages/Contact';
import CVJobsPortal from './pages/CVJobsPortal';
import AdmissionProcess from './pages/AdmissionProcess';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

function App() {
  return (
    <div className="App">
      <Navbar />
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