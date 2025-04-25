import React from "react";
import { motion } from "framer-motion";
import { FaFileAlt, FaCheckCircle, FaGraduationCap, FaEnvelope, FaPassport, FaCalendarAlt, FaUser } from "react-icons/fa";
import AdmissionProcess from "../components/services/AdmissionProcess";
import { useTheme } from "../context/ThemeContext";

const AdmissionProcessPage = () => {
  const { darkMode } = useTheme();

  const pageInfo = {
    title: "Admission Process",
    description:
      "Our streamlined admission process is designed to help international students navigate the steps required to secure a place at a UK institution. Follow our simple 6-step process to begin your educational journey.",
  };

  const additionalInfo = [
    {
      title: "Required Documents",
      icon: <FaFileAlt />,
      items: [
        "Valid passport",
        "Academic certificates and transcripts",
        "English language proficiency test results",
        "Personal statement",
        "Reference letters",
        "Curriculum Vitae (for postgraduate courses)",
        "Portfolio (for relevant courses)",
      ],
    },
    {
      title: "Turnaround Times",
      icon: <FaCalendarAlt />,
      items: [
        "Application review: 3-5 working days",
        "Conditional offer: 1-3 weeks",
        "CAS issuance: 2-4 weeks after meeting all conditions",
        "Visa processing: 3-4 weeks (varies by country)",
      ],
    },
    {
      title: "Application Deadlines",
      icon: <FaCheckCircle />,
      items: [
        "Undergraduate: January 15th for most courses",
        "Postgraduate: Varies by program (typically 2-3 months before start)",
        "PhD programs: Usually accept year-round applications",
        "We recommend applying at least 6 months before your intended start date",
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <div className={`min-h-screen pt-24 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-b from-blue-50 to-white text-gray-800'}`}>
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${darkMode ? 'text-white' : 'bg-gradient-to-r from-blue-700 to-purple-600 bg-clip-text text-transparent'}`}>
            {pageInfo.title}
          </h1>
          <p className={`text-lg md:text-xl mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {pageInfo.description}
          </p>
        </motion.div>
      </section>

      {/* Main Admission Process */}
      <section className="container mx-auto px-4 py-8">
        <AdmissionProcess />
      </section>

      {/* Additional Information */}
      <section className={`py-16 ${darkMode ? 'bg-gray-800' : 'bg-blue-50'}`}>
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`text-3xl font-bold text-center mb-12 ${darkMode ? 'text-white' : 'text-gray-800'}`}
          >
            Additional Information
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {additionalInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`p-6 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-white shadow-lg'}`}
              >
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-full mr-4 ${darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-600'}`}>
                    {info.icon}
                  </div>
                  <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{info.title}</h3>
                </div>
                <ul className="space-y-2 pl-4">
                  {info.items.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className={`mr-2 mt-1 text-sm ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>•</span>
                      <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={`p-8 rounded-xl text-center ${darkMode ? 'bg-gray-800' : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'}`}
        >
          <h2 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-white'}`}>
            Start Your Educational Journey Today
          </h2>
          <p className={`text-lg mb-8 max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-white opacity-90'}`}>
            Our expert team is ready to guide you through each step of the admission process. Get in touch with us to begin your application.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/contact"
              className={`px-8 py-3 rounded-lg font-medium transition-all ${
                darkMode 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : 'bg-white hover:bg-gray-100 text-gray-800'
              }`}
            >
              Contact Us
            </a>
            <a
              href="#faqs"
              className={`px-8 py-3 rounded-lg font-medium transition-all ${
                darkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-white border border-gray-600' 
                  : 'bg-transparent hover:bg-white/10 text-white border border-white'
              }`}
            >
              FAQs
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default AdmissionProcessPage; 