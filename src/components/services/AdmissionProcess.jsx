import React from 'react';
import { motion } from 'framer-motion';
import { FaFileUpload, FaCheckCircle, FaBookOpen, FaEnvelope, FaPassport, FaUserGraduate } from 'react-icons/fa';

const AdmissionProcess = () => {
  const steps = [
    {
      icon: <FaFileUpload />,
      title: "Document Submission",
      description:
        "Submit your academic transcripts, certificates, English language proficiency test results, and a personal statement through our secure online portal.",
    },
    {
      icon: <FaCheckCircle />,
      title: "Assessment",
      description:
        "Our academic team reviews your application to ensure it meets the entry requirements for your chosen course and institution.",
    },
    {
      icon: <FaBookOpen />,
      title: "Course Selection",
      description:
        "Based on your qualifications and preferences, we'll help you select the most suitable courses and institutions aligned with your career goals.",
    },
    {
      icon: <FaEnvelope />,
      title: "Offer Letter",
      description:
        "Once your application is accepted, you'll receive a conditional or unconditional offer letter from the institution.",
    },
    {
      icon: <FaPassport />,
      title: "CAS Approval",
      description:
        "After accepting your offer and paying the deposit, the institution will issue a Confirmation of Acceptance for Studies (CAS) required for your visa application.",
    },
    {
      icon: <FaUserGraduate />,
      title: "Enrollment",
      description:
        "With your student visa approved, we'll guide you through the final steps of enrollment, pre-departure preparation, and arrival in the UK.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="py-24 bg-white dark:bg-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-3xl mx-auto mb-12 px-4"
      >
        <span className="inline-block px-4 py-2 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium mb-4">
          Simplified Process
        </span>
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400 bg-clip-text text-transparent mb-6">
          Admission Process
        </h2>
        <div className="w-24 h-2 bg-gradient-to-r from-indigo-600 to-blue-500 rounded-full mx-auto mb-8"></div>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          We've simplified the university application process to help you navigate each stage with ease and confidence.
        </p>
      </motion.div>

      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-900/30 border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-start">
                <div className="p-4 rounded-full mr-4 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300">
                  {step.icon}
                </div>
                <div className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center font-bold bg-blue-500 dark:bg-blue-600 text-white">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-xl font-bold mt-6 mb-3 text-gray-800 dark:text-white">
                {step.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 p-8 rounded-xl text-center bg-blue-50 dark:bg-gray-800/80 dark:border dark:border-gray-700"
        >
          <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
            Need Assistance?
          </h3>
          <p className="text-lg mb-6 max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
            Our dedicated advisors are here to guide you through each step of the admission process. Get personalized support for your application journey.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-3 rounded-lg font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600 text-white transition-all transform hover:-translate-y-1"
          >
            Contact an Advisor
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default AdmissionProcess; 