import React from 'react';
import { motion } from 'framer-motion';
import { FaUniversity, FaFileAlt, FaSearch, FaUserGraduate, 
         FaComments, FaPassport, FaUsers, FaBriefcase } from 'react-icons/fa';

const Services = () => {
  const services = [
    {
      id: 1,
      title: 'International Student Recruitment',
      description: 'Comprehensive assistance for international students seeking to study in the UK with expert guidance at every step.',
      icon: <FaUniversity className="text-3xl text-indigo-600 dark:text-indigo-400" />,
    },
    {
      id: 2,
      title: 'Documents Assessment',
      description: 'Quick 3-day turnaround for assessment of all academic and supporting documents to determine eligibility.',
      icon: <FaFileAlt className="text-3xl text-indigo-600 dark:text-indigo-400" />,
    },
    {
      id: 3,
      title: 'University & Course Selection',
      description: 'Personalized recommendations for universities and courses based on your academic background and career goals.',
      icon: <FaSearch className="text-3xl text-indigo-600 dark:text-indigo-400" />,
    },
    {
      id: 4,
      title: 'Admission Process',
      description: 'End-to-end support throughout the 6-step admission process from application to enrollment.',
      icon: <FaUserGraduate className="text-3xl text-indigo-600 dark:text-indigo-400" />,
    },
    {
      id: 5,
      title: 'Interview Preparation',
      description: 'Specialized coaching and mock interviews to help you succeed in university and visa interviews.',
      icon: <FaComments className="text-3xl text-indigo-600 dark:text-indigo-400" />,
    },
    {
      id: 6,
      title: 'Visa Application Guidance',
      description: 'Expert assistance with Tier 4 Student Visa applications, including documentation and interview preparation.',
      icon: <FaPassport className="text-3xl text-indigo-600 dark:text-indigo-400" />,
    },
    {
      id: 7,
      title: 'Local Student Admissions',
      description: 'Specialized support for UK/EU students applying for funded courses and scholarships.',
      icon: <FaUsers className="text-3xl text-indigo-600 dark:text-indigo-400" />,
    },
    {
      id: 8,
      title: 'Employability Services',
      description: 'Career guidance, CV preparation, and job application support to enhance your employability.',
      icon: <FaBriefcase className="text-3xl text-indigo-600 dark:text-indigo-400" />,
    },
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
      <div className="absolute inset-0 pattern-dots opacity-5"></div>
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
            Our Expertise
          </span>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent mb-6">
            Our Services
          </h2>
          <div className="w-24 h-2 bg-gradient-to-r from-indigo-600 to-blue-500 rounded-full mx-auto mb-8"></div>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed">
            At STEPS Education Limited, we offer a comprehensive range of services to ensure your 
            educational journey is smooth and successful. We aim to help only 50 students per intake 
            to maintain our service quality.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              whileHover={{ 
                y: -12, 
                transition: { type: "spring", stiffness: 200, damping: 10 }
              }}
              className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl hover:shadow-2xl border border-gray-100/50 dark:border-gray-700/50 hover:border-indigo-200 dark:hover:border-indigo-700 transition-all duration-300"
            >
              <div className="mb-6 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/50 dark:to-blue-900/50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-700 to-blue-700 dark:from-indigo-400 dark:to-blue-400 bg-clip-text text-transparent mb-4 text-center">
                {service.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                {service.description}
              </p>
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
          <div className="inline-block bg-gradient-to-r from-indigo-500/10 to-blue-500/10 dark:from-indigo-800/30 dark:to-blue-800/30 text-indigo-700 dark:text-indigo-300 px-6 py-3 rounded-full font-medium border border-indigo-100 dark:border-indigo-700">
            Tier 4 Student Visa Specialists
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services; 