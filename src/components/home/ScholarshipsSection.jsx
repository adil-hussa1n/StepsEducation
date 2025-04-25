import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ScholarshipsSection = () => {
  const scholarships = [
    {
      id: 1,
      title: 'UK Students',
      description: 'Merit-based scholarships, bursaries, and financial aid options for domestic UK students.',
      eligibility: 'UK passport holders, EU settled status',
      icon: '🇬🇧'
    },
    {
      id: 2,
      title: 'EU Students',
      description: 'Special funding opportunities for EU students including tuition fee loans and grants.',
      eligibility: 'EU/EEA passport holders',
      icon: '🇪🇺'
    },
    {
      id: 3,
      title: 'International Students',
      description: 'Global excellence scholarships, country-specific awards, and partial tuition waivers.',
      eligibility: 'All international applicants',
      icon: '🌎'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <section className="py-24 relative overflow-hidden dark:bg-gray-900">
      {/* Background and pattern */}
      <div className="absolute inset-0 pattern-dots opacity-5"></div>
      
      {/* Animated blobs matching Services page */}
      <motion.div 
        className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-indigo-400/20 to-blue-400/20 dark:from-indigo-800/30 dark:to-blue-800/30 rounded-full blur-3xl"
        animate={{
          y: [-10, 10],
          transition: {
            y: {
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }
          }
        }}
      />
      
      <motion.div 
        className="absolute bottom-20 right-10 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-purple-400/20 dark:from-blue-800/30 dark:to-purple-800/30 rounded-full blur-3xl"
        animate={{
          y: [10, -10],
          transition: {
            y: {
              duration: 2.5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }
          }
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-indigo-500/10 to-blue-500/10 dark:from-indigo-800/30 dark:to-blue-800/30 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium mb-4 border border-indigo-100 dark:border-indigo-700">
            Financial Support
          </span>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent mb-6">
            Scholarships
          </h2>
          <div className="w-24 h-2 bg-gradient-to-r from-indigo-600 to-blue-500 rounded-full mx-auto mb-8"></div>
          <p className="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed">
            We help you access scholarships and financial aid options to make your education journey affordable.
            Our experts will guide you through the application process for various funding opportunities.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {scholarships.map((scholarship) => (
            <motion.div
              key={scholarship.id}
              variants={itemVariants}
              whileHover={{ 
                y: -12, 
                transition: { type: "spring", stiffness: 200, damping: 10 }
              }}
              className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl hover:shadow-2xl border border-gray-100/50 dark:border-gray-700/50 hover:border-indigo-200 dark:hover:border-indigo-700 transition-all duration-300"
            >
              <div className="mb-6 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/50 dark:to-blue-900/50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                <span className="text-4xl">{scholarship.icon}</span>
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-700 to-blue-700 dark:from-indigo-400 dark:to-blue-400 bg-clip-text text-transparent mb-4 text-center">
                {scholarship.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-center group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors duration-300 mb-4">
                {scholarship.description}
              </p>
              <div className="bg-indigo-50 dark:bg-indigo-900/50 rounded-xl p-3 text-center text-sm text-indigo-800 dark:text-indigo-200 border border-indigo-100/50 dark:border-indigo-700/50">
                <span className="font-medium">Eligibility:</span> {scholarship.eligibility}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Link
            to="/contact"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-500 dark:to-blue-500 text-white font-semibold rounded-full hover:shadow-lg shadow-lg shadow-indigo-500/20 dark:shadow-indigo-900/30 transition-all duration-300 transform hover:-translate-y-1 group"
          >
            <span className="mr-2">Check Your Eligibility</span>
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ScholarshipsSection; 