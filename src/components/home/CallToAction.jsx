import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CallToAction = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-500 pointer-events-none"></div>
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -right-40 -top-40 w-96 h-96 rounded-full bg-purple-400 opacity-20 blur-3xl"></div>
        <div className="absolute -left-20 top-1/3 w-72 h-72 rounded-full bg-blue-300 opacity-20 blur-3xl"></div>
        <div className="absolute right-1/4 bottom-0 w-64 h-64 rounded-full bg-indigo-300 opacity-20 blur-3xl"></div>
        
        {/* Animated floating shapes */}
        {[...Array(6)].map((_, i) => (
          <motion.div 
            key={i}
            className="absolute rounded-full bg-white opacity-10"
            style={{
              width: Math.random() * 150 + 50,
              height: Math.random() * 150 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 30 - 15],
              x: [0, Math.random() * 30 - 15],
              rotate: [0, Math.random() * 20 - 10],
            }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: Math.random() * 8 + 12,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20 shadow-2xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6">
              Your Educational Future Awaits
            </span>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Ready to Start Your
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-indigo-100">
                Educational Journey?
              </span>
            </h2>
            
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Contact STEPS Education Limited today and let us help you achieve your academic and career goals with personalized guidance.
            </p>
            
            <div className="flex flex-wrap gap-6 justify-center">
              <Link
                to="/contact"
                className="px-8 py-4 bg-white text-indigo-600 font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-xl shadow-indigo-900/20 transform hover:-translate-y-1 text-center"
              >
                Book a Consultation
              </Link>
              <Link
                to="/admission-process"
                className="px-8 py-4 bg-transparent border border-white/60 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1 text-center"
              >
                View Admission Process
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto"
        >
          <StatItem value="2020" label="Established" />
          <StatItem value="500+" label="Students Served" />
          <StatItem value="100%" label="Visa Success Rate" />
          <StatItem value="24/7" label="Support Available" />
        </motion.div>
      </div>
    </section>
  );
};

const StatItem = ({ value, label }) => (
  <div className="text-center">
    <div className="text-3xl md:text-4xl font-bold text-white mb-2">{value}</div>
    <div className="text-white/70 text-sm uppercase tracking-wide">{label}</div>
  </div>
);

export default CallToAction;
