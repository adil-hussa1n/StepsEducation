import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUpload, FaFileAlt, FaSearch, FaBriefcase } from 'react-icons/fa';
import useTheme from '../../hooks/useTheme';

const CVJobsPortal = () => {
  const theme = useTheme();
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
      icon: <FaFileAlt className="text-indigo-600 text-2xl" />,
      emoji: '📝'
    },
    {
      id: 2,
      title: 'Job Search Strategies',
      description: 'Effective methods to find and apply for jobs in your field',
      icon: <FaSearch className="text-indigo-600 text-2xl" />,
      emoji: '🔍'
    },
    {
      id: 3,
      title: 'Interview Preparation',
      description: 'Tips and techniques to succeed in job interviews',
      icon: <FaBriefcase className="text-indigo-600 text-2xl" />,
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
    <section className="py-24 bg-gradient-to-b from-white to-indigo-50 relative overflow-hidden" id="cv-form">
      <div className="absolute inset-0 pattern-dots opacity-5"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={itemVariants}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-4">
            Career Services
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">CV & Jobs Portal</h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-indigo-600 to-blue-500 rounded-full mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
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
            className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8"
          >
            <h3 className="text-2xl font-bold text-gradient mb-6">Submit Your CV</h3>
            
            {submitted ? (
              <div className="bg-green-50 text-green-700 p-5 rounded-xl border border-green-100 mb-8">
                <h4 className="text-lg font-bold mb-1">Thank you!</h4>
                <p>Your CV has been successfully submitted. Our team will review it and contact you soon.</p>
              </div>
            ) : null}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Full Name*</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  required
                />
              </div>
              
              <div className="mb-5">
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address*</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  required
                />
              </div>
              
              <div className="mb-5">
                <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Phone Number*</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  required
                />
              </div>
              
              <div className="mb-5">
                <label htmlFor="education" className="block text-gray-700 font-medium mb-2">Highest Education</label>
                <input
                  type="text"
                  id="education"
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>
              
              <div className="mb-5">
                <label htmlFor="experience" className="block text-gray-700 font-medium mb-2">Work Experience</label>
                <textarea
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                ></textarea>
              </div>
              
              <div className="mb-8">
                <label htmlFor="cvFile" className="block text-gray-700 font-medium mb-2">Upload CV (PDF or DOC)*</label>
                <div className="border-2 border-dashed border-indigo-200 rounded-xl p-6 text-center bg-indigo-50/50 relative">
                  <FaUpload className="mx-auto text-indigo-400 text-2xl mb-3" />
                  <p className="text-indigo-600 font-medium mb-2">Click to browse or drag and drop</p>
                  <p className="text-sm text-gray-500 mb-2">Maximum file size: 5MB</p>
                  <input
                    type="file"
                    id="cvFile"
                    onChange={handleFileChange}
                    className="w-full h-full opacity-0 absolute inset-0 cursor-pointer"
                    accept=".pdf,.doc,.docx"
                    required
                  />
                  {formData.cvFile && (
                    <div className="mt-3 bg-white py-2 px-3 rounded-lg inline-block">
                      <p className="text-sm text-indigo-600 font-medium">{formData.cvFile.name}</p>
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
            className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8"
          >
            <h3 className="text-2xl font-bold text-gradient mb-8">Employability Resources</h3>
            
            <div className="space-y-8">
              {resources.map((resource) => (
                <motion.div
                  key={resource.id}
                  variants={itemVariants}
                  className="border-b border-gray-100 pb-8 last:border-b-0 last:pb-0"
                >
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center mr-5 flex-shrink-0">
                      <span className="text-2xl">{resource.emoji}</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-indigo-700 mb-2">{resource.title}</h4>
                      <p className="text-gray-600 mb-3">{resource.description}</p>
                      <button className="px-4 py-2 border border-indigo-200 text-indigo-600 font-medium rounded-lg hover:bg-indigo-50 transition-colors">
                        Learn More
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-10 bg-gradient-to-br from-indigo-500/90 to-blue-600/90 p-6 rounded-xl shadow-lg">
              <div className="bg-white/10 rounded-lg p-5 backdrop-blur-sm border border-white/20">
                <h4 className="text-white font-bold text-xl mb-3">Job Application Tracking</h4>
                <p className="text-white/90 mb-4">
                  Register or login to track your job applications, receive notifications about new positions, 
                  and get personalized job recommendations based on your profile.
                </p>
                <button className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-md">
                  Register Now
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CVJobsPortal; 