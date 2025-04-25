import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/home/Hero';
import AboutSection from '../components/home/AboutSection';
import AdmissionProcess from '../components/services/AdmissionProcess';
import Services from '../components/services/Services';
import CallToAction from '../components/home/CallToAction';
import ScholarshipsSection from '../components/home/ScholarshipsSection';
import BlogSection from '../components/home/BlogSection';

const Home = () => {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    setIsInView(true);
  }, []);

  // Mock content for Hero section - In production, this would come from a CMS or API
  const heroContent = {
    headline: "Your path to UK education starts here",
    subheading: "We help international students navigate the UK university application process with expert guidance and support.",
    cta: "Get Started"
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  // Animation for the dots
  const floatingDots = {
    y: [-10, 10],
    transition: {
      y: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="overflow-hidden">
      {/* Decorative elements */}
      <div className="fixed -z-10 inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-40">
          <div className="absolute top-[5%] left-[10%] w-64 h-64 bg-indigo-400/30 rounded-full filter blur-3xl"></div>
          <div className="absolute top-[50%] right-[10%] w-72 h-72 bg-blue-400/30 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-[10%] left-[30%] w-80 h-80 bg-purple-400/20 rounded-full filter blur-3xl"></div>
        </div>
      </div>

      {/* Pattern overlay */}
      <div className="fixed -z-10 inset-0 bg-pattern-dots opacity-[0.03]"></div>

      {/* Floating Dots Animation */}
      <motion.div 
        className="fixed -z-10 top-0 left-0 w-full h-full pointer-events-none"
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="absolute top-[20%] left-[5%] w-3 h-3 bg-indigo-500 rounded-full"
          animate={floatingDots}
        ></motion.div>
        <motion.div 
          className="absolute top-[40%] right-[10%] w-2 h-2 bg-blue-500 rounded-full"
          animate={{
            ...floatingDots,
            transition: { ...floatingDots.transition, delay: 0.5 }
          }}
        ></motion.div>
        <motion.div 
          className="absolute bottom-[30%] left-[15%] w-2 h-2 bg-purple-500 rounded-full"
          animate={{
            ...floatingDots,
            transition: { ...floatingDots.transition, delay: 1 }
          }}
        ></motion.div>
      </motion.div>

      {/* Main content */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative"
      >
        <Hero content={heroContent} />

        <motion.section variants={containerVariants}>
          <AboutSection />
        </motion.section>
        
        <motion.section variants={containerVariants}>
          <AdmissionProcess />
        </motion.section>

        <motion.section variants={containerVariants}>
          <Services />
        </motion.section>

        <motion.section variants={containerVariants}>
          <ScholarshipsSection />
        </motion.section>

        <motion.section variants={containerVariants}>
          <BlogSection />
        </motion.section>

        <motion.section variants={containerVariants}>
          <CallToAction />
        </motion.section>
      </motion.div>
    </div>
  );
};

export default Home;