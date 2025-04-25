import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUpload, FaFileAlt, FaSearch, FaBriefcase } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const CVJobsPortal = () => {
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    education: '',
    experience: '',
    cvFile: null,
  });
  
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleFileChange = (e) => {
    setFormData({ ...formData, cvFile: e.target.files[0] });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        education: '',
        experience: '',
        cvFile: null,
      });
      
      // Reset the file input
      const fileInput = document.getElementById('cvFile');
      if (fileInput) fileInput.value = '';
      
      // Reset submitted status after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    }, 1500);
  };
  
  const resources = [
    {
      id: 1,
      title: 'CV Writing Tips',
      description: 'Learn how to create a standout CV that gets noticed by employers',
      icon: <FaFileAlt className={`text-2xl ${isDarkMode ? 'text-blue-400' : 'text-indigo-600'}`} />,
      emoji: '📝'
    },
    {
      id: 2,
      title: 'Job Search Strategies',
      description: 'Effective methods to find and apply for jobs in your field',
      icon: <FaSearch className={`text-2xl ${isDarkMode ? 'text-blue-400' : 'text-indigo-600'}`} />,
      emoji: '🔍'
    },
    {
      id: 3,
      title: 'Interview Preparation',
      description: 'Tips and techniques to succeed in job interviews',
      icon: <FaBriefcase className={`text-2xl ${isDarkMode ? 'text-blue-400' : 'text-indigo-600'}`} />,
      emoji: '💼'
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className={`py-24 relative overflow-hidden ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-b from-white to-indigo-50'}`} id="cv-form">
      <div className="absolute inset-0 pattern-dots opacity-5"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={itemVariants}
          className="text-center mb-16"
        >
          <span className={`inline-block mt-10 px-3 py-1.5 ${isDarkMode ? 'bg-blue-900/40 text-blue-300' : 'bg-indigo-100 text-indigo-700'} rounded-full text-sm font-medium mb-4`}>
            Career Services
          </span>
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gradient'}`}>CV & Jobs Portal</h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-indigo-600 to-blue-500 rounded-full mx-auto mb-6"></div>
          <p className={`max-w-3xl mx-auto text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Submit your CV to our database, track job applications, and access valuable employability resources.
            Our dedicated team will help you connect with the right opportunities.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* CV Submission Form */}
          <motion.div
            variants={itemVariants}
            className={`rounded-2xl shadow-xl p-8 ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'}`}
          >
            <h3 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gradient'}`}>Submit Your CV</h3>
            
            {submitted ? (
              <div className={`p-5 rounded-xl mb-8 ${isDarkMode ? 'bg-green-900/30 text-green-300 border border-green-800' : 'bg-green-50 text-green-700 border border-green-100'}`}>
                <h4 className="text-lg font-bold mb-1">Thank you!</h4>
                <p>Your CV has been successfully submitted. Our team will review it and contact you soon.</p>
              </div>
            ) : null}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <label htmlFor="name" className={`block font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Full Name*</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border border-gray-200'
                  }`}
                  required
                />
              </div>
              
              <div className="mb-5">
                <label htmlFor="email" className={`block font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Email Address*</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border border-gray-200'
                  }`}
                  required
                />
              </div>
              
              <div className="mb-5">
                <label htmlFor="phone" className={`block font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Phone Number*</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border border-gray-200'
                  }`}
                  required
                />
              </div>
              
              <div className="mb-5">
                <label htmlFor="education" className={`block font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Highest Education</label>
                <input
                  type="text"
                  id="education"
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border border-gray-200'
                  }`}
                />
              </div>
              
              <div className="mb-5">
                <label htmlFor="experience" className={`block font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Work Experience</label>
                <textarea
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  rows="3"
                  className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border border-gray-200'
                  }`}
                ></textarea>
              </div>
              
              <div className="mb-8">
                <label htmlFor="cvFile" className={`block font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Upload CV (PDF or DOC)*</label>
                <div className={`border-2 border-dashed rounded-xl p-6 text-center relative ${
                  isDarkMode ? 'border-blue-700 bg-blue-900/20' : 'border-indigo-200 bg-indigo-50/50'
                }`}>
                  <FaUpload className={`mx-auto text-2xl mb-3 ${isDarkMode ? 'text-blue-400' : 'text-indigo-400'}`} />
                  <p className={`font-medium mb-2 ${isDarkMode ? 'text-blue-300' : 'text-indigo-600'}`}>Click to browse or drag and drop</p>
                  <p className={`text-sm mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Maximum file size: 5MB</p>
                  <input
                    type="file"
                    id="cvFile"
                    onChange={handleFileChange}
                    className="w-full h-full opacity-0 absolute inset-0 cursor-pointer"
                    accept=".pdf,.doc,.docx"
                    required
                  />
                  {formData.cvFile && (
                    <div className={`mt-3 py-2 px-3 rounded-lg inline-block ${
                      isDarkMode ? 'bg-gray-700' : 'bg-white'
                    }`}>
                      <p className={`text-sm font-medium ${isDarkMode ? 'text-blue-300' : 'text-indigo-600'}`}>{formData.cvFile.name}</p>
                    </div>
                  )}
                </div>
              </div>
              
              <button
                type="submit"
                disabled={submitting}
                className={`w-full px-6 py-4 bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl ${
                  submitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {submitting ? 'Submitting...' : 'Submit CV'}
              </button>
            </form>
          </motion.div>

          {/* Employability Resources */}
          <motion.div
            variants={itemVariants}
            className={`rounded-2xl shadow-xl p-8 ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'}`}
          >
            <h3 className={`text-2xl font-bold mb-8 ${isDarkMode ? 'text-white' : 'text-gradient'}`}>Employability Resources</h3>
            
            <div className="space-y-8">
              {resources.map((resource) => (
                <motion.div
                  key={resource.id}
                  variants={itemVariants}
                  className={`border-b pb-8 last:border-b-0 last:pb-0 ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}
                >
                  <div className="flex items-start">
                    <div className={`flex-shrink-0 mr-4 w-14 h-14 rounded-xl flex items-center justify-center ${
                      isDarkMode ? 'bg-blue-900/40' : 'bg-indigo-100'
                    }`}>
                      <span className="text-3xl">{resource.emoji}</span>
                    </div>
                    <div>
                      <h4 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{resource.title}</h4>
                      <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>{resource.description}</p>
                      <a href="/resources" className={`inline-block mt-4 font-medium ${
                        isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-indigo-600 hover:text-indigo-700'
                      } transition-colors`}>
                        Learn more →
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className={`mt-10 p-6 rounded-xl ${
              isDarkMode ? 'bg-gradient-to-r from-blue-900/30 to-indigo-900/30' : 'bg-gradient-to-r from-indigo-50 to-blue-50'
            }`}>
              <h4 className={`text-lg font-bold mb-2 ${isDarkMode ? 'text-blue-300' : 'text-indigo-700'}`}>Need personalized help?</h4>
              <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Our career advisors can provide tailored guidance for your specific situation and career goals.
              </p>
              <a href="/contact" className={`inline-block px-6 py-3 font-semibold rounded-xl shadow-md transition-all duration-300 hover:shadow-lg ${
                isDarkMode ? 'bg-gray-700 text-blue-300 hover:bg-gray-600 border border-gray-600' : 'bg-white text-indigo-600 hover:bg-indigo-50 border border-indigo-100'
              }`}>
                Schedule a Consultation
              </a>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Job Listings Preview */}
        <motion.div
          variants={itemVariants}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gradient'}`}>Featured Job Opportunities</h3>
            <p className={`max-w-3xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Browse our curated selection of job opportunities from our partner organizations.
              Submit your CV to be considered for these positions and more.
            </p>
          </div>
          
          <div className={`rounded-2xl shadow-xl p-8 ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'}`}>
            <div className="text-center py-16">
              <FaSearch className={`mx-auto text-5xl mb-6 ${isDarkMode ? 'text-blue-400/50' : 'text-indigo-300'}`} />
              <h4 className={`text-2xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Job Board Coming Soon</h4>
              <p className={`max-w-lg mx-auto mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                We're currently building our job opportunities board. Submit your CV now to get early access
                and be among the first to apply when positions become available.
              </p>
              <a href="#cv-form" className={`inline-block px-6 py-3 font-semibold rounded-xl transition-all ${
                isDarkMode ? 'bg-blue-900/40 text-blue-300 hover:bg-blue-900/60' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
              }`}>
                Submit Your CV Above
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CVJobsPortal;