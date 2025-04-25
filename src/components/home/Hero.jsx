import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Hero = ({ content }) => {
  // Array of reliable university campus image URLs
  const bgImageUrls = [
    "https://images.unsplash.com/photo-1574958269340-fa927503f3dd?q=80&w=1948&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1986&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1770&auto=format&fit=crop"
  ];

  // Use the first image as default
  const [bgImageUrl, setBgImageUrl] = React.useState(bgImageUrls[0]);
  
  // Handle image error by cycling through fallback images
  const handleImageError = () => {
    const currentIndex = bgImageUrls.indexOf(bgImageUrl);
    const nextIndex = (currentIndex + 1) % bgImageUrls.length;
    setBgImageUrl(bgImageUrls[nextIndex]);
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-32 pb-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={bgImageUrl}
          alt="University campus" 
          className="w-full h-full object-cover"
          onError={handleImageError}
        />
        {/* Dark gradient overlay to ensure text is readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 to-black/70"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content Column */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="inline-block px-4 py-1 bg-indigo-600 rounded-full text-white text-sm font-medium mb-6"
              >
                Trusted Education Consultancy Since 2020
              </motion.span>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                {content.headline}
              </h1>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="text-xl text-gray-200 mb-8 md:max-w-xl"
              >
                {content.subheading}
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <Link
                  to="/contact"
                  className="inline-block px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all duration-300"
                >
                  {content.cta}
                </Link>
                
                <Link
                  to="/admission-process"
                  className="inline-block px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-300"
                >
                  Learn More
                </Link>
              </motion.div>
            </motion.div>
            
            {/* Right Stats Column */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="bg-white/10 backdrop-blur-md p-8 rounded-xl border border-white/20"
            >
              <h3 className="text-white text-xl font-bold mb-6 text-center">Why Choose STEPS Education</h3>
              <div className="grid grid-cols-2 gap-6">
                <Stat number="50+" label="Students Per Intake" />
                <Stat number="90%" label="Success Rate" />
                <Stat number="3 Days" label="Document Assessment" />
                <Stat number="100+" label="Partner Universities" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Features Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-16 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <Feature 
              icon="🎓" 
              title="Expert Guidance" 
              description="Personalized support throughout the application process"
            />
            <Feature 
              icon="✈️" 
              title="Visa Specialists" 
              description="Tier 4 student visa application expertise"
            />
            <Feature 
              icon="🏫" 
              title="University Placement" 
              description="Direct partnerships with top UK universities"
            />
            <Feature 
              icon="💼" 
              title="Career Support" 
              description="CV building and employment assistance"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Feature = ({ icon, title, description }) => (
  <div className="flex items-start p-3">
    <div className="text-3xl mr-4">{icon}</div>
    <div>
      <h3 className="text-white font-semibold text-lg mb-1">{title}</h3>
      <p className="text-gray-300 text-sm">{description}</p>
    </div>
  </div>
);

const Stat = ({ number, label }) => (
  <div className="text-center">
    <div className="text-3xl font-bold text-white mb-1">{number}</div>
    <div className="text-gray-300 text-sm">{label}</div>
  </div>
);

export default Hero; 