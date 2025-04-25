import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ROUTES } from './constants/routes';
// Import your components
import Home from './components/Home';
import Contact from './components/Contact';
import CVJobsPortal from './components/CVJobsPortal';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Fixed the Route structure */}
        <Route path="/" element={<Home />} />
        <Route path={ROUTES.CV_JOBS} element={<CVJobsPortal />} />
        <Route path={ROUTES.CONTACT} element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;
