import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar, Preloader, Footer } from '.';
import useScrollToTop from '../../hooks/useScrollToTop';

// Utility to delay promise resolution
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const Layout = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  // Scroll to top on route change
  useScrollToTop();

  useEffect(() => {
    const init = async () => {
      // Minimum loading time of 1 second
      await delay(1000);
      setIsLoading(false);
    };
    init();
  }, []);

  // Prevent scroll while loading
  useEffect(() => {
    document.body.style.overflow = isLoading ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <Navbar />
          <main>
            <Outlet />
          </main>
          <Footer />
        </>
      )}
    </>
  );
};

export default Layout;
