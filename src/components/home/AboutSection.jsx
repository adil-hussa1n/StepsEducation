import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../shared/LoadingSpinner';
import ErrorMessage from '../shared/ErrorMessage';
import { motion } from 'framer-motion';

const AboutSection = () => {
  const [aboutData, setAboutData] = useState({
    title: 'About STEPS Education Limited',
    description1: 'Established in 2020, STEPS Education Limited is committed to providing exceptional educational services to international students. Our mission is guided by our core values: Education | Training | Excellence.',
    description2: 'We aim to help only 50 students per intake to maintain our service quality, ensuring personalized attention and support throughout your educational journey. Our team of dedicated specialists is led by Mr. Mohsin, who brings years of expertise in international student recruitment and visa processing.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3',
    yearsExperience: 'EST',
    yearsExperienceValue: '2020',
    values: [
      { title: 'INNOVATIVE TRAINING', description: 'We provide cutting-edge training programs to prepare students for academic success' },
      { title: 'SMART MANAGEMENT', description: 'Our efficient processes ensure timely applications and assessments' },
      { title: '50 STUDENTS PER INTAKE', description: 'Limited intake to maintain high-quality service and personalized attention' }
    ]
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAboutData = () => {
      try {
        // Get about data from localStorage
        const storedAboutData = JSON.parse(localStorage.getItem('aboutDatabase'));
        
        if (storedAboutData) {
          setAboutData(storedAboutData);
        }
      } catch (err) {
        console.error('Error fetching about data:', err);
        // No need to set error state as we already have default data
      }
    };

    // Initial fetch
    fetchAboutData();
  }, []);

  if (loading) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <LoadingSpinner />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <ErrorMessage message={error} />
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
        <div className="absolute -left-32 -top-32 w-96 h-96 rounded-full bg-indigo-300 dark:bg-indigo-700"></div>
        <div className="absolute right-0 top-1/4 w-64 h-64 rounded-full bg-blue-300 dark:bg-blue-700"></div>
        <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-purple-300 dark:bg-purple-700"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block px-3 py-1.5 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium mb-4">
            About Us
          </span>
          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-blue-500 dark:from-indigo-400 dark:to-blue-400 mb-4">
            About STEPS Education
          </h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-indigo-600 to-blue-500 rounded-full mx-auto mb-6"></div>
          <p className="text-gray-600 dark:text-gray-300">
            Discover why thousands of students choose us for their international education journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image with floating elements */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl dark:shadow-black/30">
              <img
                src={aboutData?.image || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3"}
                alt="STEPS Education Team"
                className="w-full h-full object-cover aspect-[4/3]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/30 to-transparent"></div>
            </div>
            
            {/* Experience badge */}
            <motion.div 
              initial={{ y: 20, opacity: 0, scale: 0.8 }}
              whileInView={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              viewport={{ once: true }}
              className="absolute -bottom-8 -right-8 bg-gradient-to-br from-indigo-600 to-blue-500 dark:from-indigo-500 dark:to-blue-600 text-white p-6 rounded-2xl shadow-xl dark:shadow-indigo-900/50"
            >
              <div className="text-sm font-medium uppercase tracking-wider opacity-80">{aboutData?.yearsExperience || "EST"}</div>
              <div className="text-4xl font-bold">{aboutData?.yearsExperienceValue || "2020"}</div>
            </motion.div>
            
            {/* Floating skills badges */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              viewport={{ once: true }}
              className="absolute -top-6 -left-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg dark:shadow-black/30 p-4"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center mr-3">
                  <span className="text-xl">🎓</span>
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">Expert Guidance</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">University Selection</div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              viewport={{ once: true }}
              className="absolute top-1/2 -translate-y-1/2 -left-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg dark:shadow-black/30 p-4"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mr-3">
                  <span className="text-xl">💼</span>
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">Visa Success</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">100% Rate</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg leading-relaxed">
              Established in 2020, STEPS Education Limited is committed to providing exceptional educational services to international students. Our mission is guided by our core values: Education | Training | Excellence.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-8 text-lg leading-relaxed">
              We aim to help only 50 students per intake to maintain our service quality, ensuring personalized attention and support throughout your educational journey. Our team of dedicated specialists brings years of expertise in international student recruitment and visa processing.
            </p>
            
            {/* Values */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {aboutData?.values && aboutData.values.map((value, index) => (
                <motion.div 
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 * index, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:border-indigo-100 dark:hover:border-indigo-700 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center mb-4">
                    <span className="text-xl">{index === 0 ? '🚀' : index === 1 ? '⚡' : '👨‍👩‍👧‍👦'}</span>
                  </div>
                  <h3 className="text-indigo-700 dark:text-indigo-400 font-semibold mb-2">{value.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{value.description}</p>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Link 
                to="/admission-process" 
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-500 dark:from-indigo-500 dark:to-blue-600 text-white font-medium rounded-full hover:from-indigo-700 hover:to-blue-600 dark:hover:from-indigo-600 dark:hover:to-blue-700 transition-all duration-300 shadow-lg shadow-indigo-500/20 dark:shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-600/30 transform hover:-translate-y-1"
              >
                <span>Learn More About Our Process</span>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection; 