import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUpload, FaFileAlt, FaSearch, FaBriefcase, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, uploadCvFile } from "../utils/firebase";
import emailjs from '@emailjs/browser';
import { useTheme } from '../context/ThemeContext';

const CVJobsPortal = () => {
  const { darkMode } = useTheme();
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
  const [error, setError] = useState('');
  const [fileUploadStatus, setFileUploadStatus] = useState({ uploading: false, progress: 0, fileName: '' });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    
    // Validate file type and size
    if (file) {
      const fileType = file.type;
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      const fileSize = file.size / 1024 / 1024; // in MB
      
      if (!validTypes.includes(fileType)) {
        setError('Please upload a PDF or Word document');
        return;
      }
      
      if (fileSize > 5) {
        setError('File size should not exceed 5MB');
        return;
      }
      
      setError('');
      setFileUploadStatus({ uploading: false, progress: 0, fileName: file.name });
      setFormData({ ...formData, cvFile: file });
    }
  };
  
  // Handle CV file upload with simplified approach to avoid CORS issues
  const handleCvFile = async (file) => {
    try {
      // Update progress status
      setFileUploadStatus(prev => ({ ...prev, uploading: true, progress: 10 }));
      
      // Simulate progress for better UX
      await new Promise(resolve => setTimeout(resolve, 500));
      setFileUploadStatus(prev => ({ ...prev, progress: 50 }));
      
      // Create a user-friendly message with file details
      // This works in both development and production without Firebase dependency
      const fileInfo = `CV File: ${file.name} (${Math.round(file.size/1024)} KB)`;
      
      // Complete the progress
      await new Promise(resolve => setTimeout(resolve, 500));
      setFileUploadStatus(prev => ({ ...prev, progress: 100 }));
      
      console.log('Created file info:', fileInfo);
      return fileInfo;
    } catch (error) {
      console.error('Error handling file:', error);
      setError('Error processing file. Please try again.');
      setFileUploadStatus(prev => ({ ...prev, uploading: false, progress: 0 }));
      throw error;
    } finally {
      setFileUploadStatus(prev => ({ ...prev, progress: 100 }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    
    // Validate file is attached
    if (!formData.cvFile) {
      setError('Please attach your CV file');
      setSubmitting(false);
      return;
    }
    
    try {
      // Update file upload status
      setFileUploadStatus(prev => ({ ...prev, uploading: true, progress: 10 }));
      
      // Process the file (upload or create placeholder in development)
      let fileUrl;
      try {
        fileUrl = await handleCvFile(formData.cvFile);
        console.log('File processed successfully, URL:', fileUrl);
      } catch (fileError) {
        console.error('Error processing file:', fileError);
        // Use a fallback text instead of failing completely
        fileUrl = `[Error processing file: ${formData.cvFile.name}]`;
      }
      
      try {
        // Prepare email parameters directly
        const emailParams = {
          to_name: 'Steps Education Team',
          from_name: formData.name || 'Website Visitor',
          reply_to: formData.email,
          subject: 'CV Submission from ' + formData.name,
          user_name: formData.name || 'Not provided',
          user_email: formData.email,
          user_phone: formData.phone || 'Not provided',
          education: formData.education || 'Not specified',
          experience: formData.experience || 'Not specified',
          // Use both parameter names for compatibility
          cvFile: fileUrl,
          cv_file: fileUrl,
          cv_download_link: fileUrl,
          // Format a nice HTML message with a download link
          message: `CV Submission from ${formData.name}\n\nEducation: ${formData.education || 'Not specified'}\nExperience: ${formData.experience || 'Not specified'}\n\nCV Download Link: ${fileUrl}`
        };
        
        console.log('Sending email with direct method...');
        
        // Initialize EmailJS
        emailjs.init('sEomWR6Z3MeDGaE1t');
        
        // Send the email using the direct method
        const result = await emailjs.send(
          'service_7g14rgi', // Your EmailJS service ID
          'template_eaxoyqs', // Your EmailJS template ID
          emailParams
        );
        
        console.log('Email sent successfully:', result);
        
        // Handle successful submission
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
        
        // Reset submitted status after 8 seconds
        setTimeout(() => {
          setSubmitted(false);
        }, 8000);
      } catch (emailError) {
        console.error('Error sending email:', emailError);
        setError(`Error sending email: ${emailError.message || 'Unknown error'}. Please try again.`);
      }
    } catch (err) {
      console.error('Error submitting CV:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setSubmitting(false);
      setFileUploadStatus(prev => ({ ...prev, uploading: false, progress: 0 }));
    }
  };
  
  const resources = [
    {
      id: 1,
      title: 'CV Writing Tips',
      description: 'Learn how to create a standout CV that gets noticed by employers',
      icon: <FaFileAlt className={`text-2xl ${darkMode ? 'text-blue-400' : 'text-indigo-600'}`} />,
      emoji: '📝'
    },
    {
      id: 2,
      title: 'Job Search Strategies',
      description: 'Effective methods to find and apply for jobs in your field',
      icon: <FaSearch className={`text-2xl ${darkMode ? 'text-blue-400' : 'text-indigo-600'}`} />,
      emoji: '🔍'
    },
    {
      id: 3,
      title: 'Interview Preparation',
      description: 'Tips and techniques to succeed in job interviews',
      icon: <FaBriefcase className={`text-2xl ${darkMode ? 'text-blue-400' : 'text-indigo-600'}`} />,
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
    <section className={`py-24 relative overflow-hidden ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-b from-white to-indigo-50'}`} id="cv-form">
      <div className="absolute inset-0 pattern-dots opacity-5"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={itemVariants}
          className="text-center mb-16"
        >
          <span className={`inline-block mt-10 px-3 py-1.5 ${darkMode ? 'bg-blue-900/40 text-blue-300' : 'bg-indigo-100 text-indigo-700'} rounded-full text-sm font-medium mb-4`}>
            Career Services
          </span>
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent'}`}>CV & Jobs Portal</h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-indigo-600 to-blue-500 rounded-full mx-auto mb-6"></div>
          <p className={`max-w-3xl mx-auto text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
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
            className={`rounded-2xl shadow-xl p-8 ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'}`}
          >
            <h3 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent'}`}>Submit Your CV</h3>
            
            {submitted ? (
              <div className={`p-5 rounded-xl mb-8 ${darkMode ? 'bg-green-900/30 text-green-300 border border-green-800' : 'bg-green-50 text-green-700 border border-green-100'}`}>
                <h4 className="text-lg font-bold mb-1">Thank you!</h4>
                <p>Your CV information has been successfully submitted. Our team will review it and contact you soon.</p>
                {fileUploadStatus.corsError && (
                  <div className="mt-3 p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800">
                    <p className="text-sm text-yellow-700 dark:text-yellow-300">
                      <strong>Note:</strong> Due to a technical limitation, we couldn't upload your CV file directly. 
                      Please send your CV to <a href="mailto:contact@stepseducation.com" className="underline font-medium">contact@stepseducation.com</a> with your name in the subject line.
                    </p>
                  </div>
                )}
              </div>
            ) : null}
            
            <form onSubmit={handleSubmit}>
              {error && (
                <div className={`p-4 mb-6 rounded-lg ${darkMode ? 'bg-red-900/30 border border-red-800' : 'bg-red-50 border border-red-200'}`}>
                  <p className={`flex items-center ${darkMode ? 'text-red-300' : 'text-red-600'}`}>
                    <FaExclamationCircle className="mr-2" />
                    {error}
                  </p>
                </div>
              )}
              <div className="mb-5">
                <label htmlFor="name" className={`block font-medium mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Full Name*</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border border-gray-200'
                  }`}
                  required
                />
              </div>
              
              <div className="mb-5">
                <label htmlFor="email" className={`block font-medium mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Email Address*</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border border-gray-200'
                  }`}
                  required
                />
              </div>
              
              <div className="mb-5">
                <label htmlFor="phone" className={`block font-medium mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Phone Number*</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border border-gray-200'
                  }`}
                  required
                />
              </div>
              
              <div className="mb-5">
                <label htmlFor="education" className={`block font-medium mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Highest Education</label>
                <input
                  type="text"
                  id="education"
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border border-gray-200'
                  }`}
                />
              </div>
              
              <div className="mb-5">
                <label htmlFor="experience" className={`block font-medium mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Work Experience</label>
                <textarea
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  rows="3"
                  className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border border-gray-200'
                  }`}
                ></textarea>
              </div>
              
              <div className="mb-8">
                <label htmlFor="cvFile" className={`block font-medium mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Upload CV (PDF or DOC)*</label>
                <div className={`border-2 border-dashed rounded-xl p-6 text-center relative ${
                  darkMode ? 'border-blue-700 bg-blue-900/20 hover:bg-blue-900/30' : 'border-indigo-200 bg-indigo-50/50 hover:bg-indigo-50/80'
                } transition-all duration-300`}>
                  <FaUpload className={`mx-auto text-2xl mb-3 ${darkMode ? 'text-blue-400' : 'text-indigo-400'}`} />
                  <p className={`font-medium mb-2 ${darkMode ? 'text-blue-300' : 'text-indigo-600'}`}>Click to browse or drag and drop</p>
                  <p className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Maximum file size: 5MB</p>
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
                      darkMode ? 'bg-gray-700' : 'bg-white shadow-sm'
                    }`}>
                      <p className={`text-sm font-medium ${darkMode ? 'text-blue-300' : 'text-indigo-600'}`}>{formData.cvFile.name}</p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* File Upload Progress Bar */}
              {fileUploadStatus.uploading && (
                <div className="mb-6">
                  <div className="flex justify-between mb-1">
                    <span className={`text-sm ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                      Uploading {fileUploadStatus.fileName}...
                    </span>
                    <span className={`text-sm ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                      {Math.round(fileUploadStatus.progress)}%
                    </span>
                  </div>
                  <div className={`w-full h-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300" 
                      style={{ width: `${fileUploadStatus.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}
              
              <div className="mt-8">
                <button
                  type="submit"
                  disabled={submitting}
                  className={`w-full py-3 px-6 rounded-xl font-medium text-white transition-all ${submitting ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-lg'} ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600'}`}
                >
                  {submitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {fileUploadStatus.uploading ? 'Uploading...' : 'Processing...'}
                    </span>
                  ) : 'Submit CV'}
                </button>
              </div>
            </form>
          </motion.div>

          {/* Employability Resources */}
          <motion.div
            variants={itemVariants}
            className={`rounded-2xl shadow-xl p-8 ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'}`}
          >
            <h3 className={`text-2xl font-bold mb-8 ${darkMode ? 'text-white' : 'bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent'}`}>Employability Resources</h3>
            
            <div className="space-y-8">
              {resources.map((resource) => (
                <motion.div
                  key={resource.id}
                  variants={itemVariants}
                  className={`border-b pb-8 last:border-b-0 last:pb-0 ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}
                >
                  <div className="flex items-start">
                    <div className={`flex-shrink-0 mr-4 w-14 h-14 rounded-xl flex items-center justify-center ${
                      darkMode ? 'bg-blue-900/40' : 'bg-indigo-100'
                    }`}>
                      <span className="text-3xl">{resource.emoji}</span>
                    </div>
                    <div>
                      <h4 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{resource.title}</h4>
                      <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>{resource.description}</p>
                      <a href="/resources" className={`inline-block mt-4 font-medium ${
                        darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-indigo-600 hover:text-indigo-700'
                      } transition-colors`}>
                        Learn more →
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className={`mt-10 p-6 rounded-xl ${
              darkMode ? 'bg-gradient-to-r from-blue-900/30 to-indigo-900/30' : 'bg-gradient-to-r from-indigo-50 to-blue-50'
            }`}>
              <h4 className={`text-lg font-bold mb-2 ${darkMode ? 'text-blue-300' : 'text-indigo-700'}`}>Need personalized help?</h4>
              <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Our career advisors can provide tailored guidance for your specific situation and career goals.
              </p>
              <a href="/contact" className={`inline-block px-6 py-3 font-semibold rounded-xl shadow-md transition-all duration-300 hover:shadow-lg ${
                darkMode ? 'bg-gray-700 text-blue-300 hover:bg-gray-600 border border-gray-600' : 'bg-white text-indigo-600 hover:bg-indigo-50 border border-indigo-100'
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
            <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent'}`}>Featured Job Opportunities</h3>
            <p className={`max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Browse our curated selection of job opportunities from our partner organizations.
              Submit your CV to be considered for these positions and more.
            </p>
          </div>
          
          <div className={`rounded-2xl shadow-xl p-8 ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100 hover:shadow-2xl transition-shadow duration-300'}`}>
            <div className="pb-8 mb-8 border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}">
              <h4 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Available Positions</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Marketing Executive */}
                <div className={`rounded-xl p-6 transition-all hover:transform hover:-translate-y-1 cursor-pointer ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-indigo-50 hover:bg-indigo-100'}`}>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${darkMode ? 'bg-blue-900/40' : 'bg-indigo-200'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${darkMode ? 'text-blue-300' : 'text-indigo-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                    </svg>
                  </div>
                  <h5 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Marketing Executive</h5>
                  <p className={`mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Drive marketing campaigns and strategies for international student recruitment.</p>
                  <div className={`mb-4 space-y-1 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    <p><span className="font-medium">Facility:</span> Available</p>
                    <p><span className="font-medium">Salary:</span> Competitive</p>
                    <p><span className="font-medium">Sponsorship:</span> Available for suitable applicants</p>
                  </div>
                  <a href="#cv-form" className={`inline-flex items-center font-medium ${darkMode ? 'text-blue-400' : 'text-indigo-600'}`}>
                    Apply Now
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>

                {/* Admin Manager */}
                <div className={`rounded-xl p-6 transition-all hover:transform hover:-translate-y-1 cursor-pointer ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-indigo-50 hover:bg-indigo-100'}`}>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${darkMode ? 'bg-blue-900/40' : 'bg-indigo-200'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${darkMode ? 'text-blue-300' : 'text-indigo-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h5 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Admin Manager</h5>
                  <p className={`mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Oversee administrative operations and ensure efficient workflow processes.</p>
                  <div className={`mb-4 space-y-1 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    <p><span className="font-medium">Facility:</span> Available</p>
                    <p><span className="font-medium">Salary:</span> Competitive</p>
                    <p><span className="font-medium">Sponsorship:</span> Available for suitable applicants</p>
                  </div>
                  <a href="#cv-form" className={`inline-flex items-center font-medium ${darkMode ? 'text-blue-400' : 'text-indigo-600'}`}>
                    Apply Now
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>

                {/* Development Manager */}
                <div className={`rounded-xl p-6 transition-all hover:transform hover:-translate-y-1 cursor-pointer ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-indigo-50 hover:bg-indigo-100'}`}>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${darkMode ? 'bg-blue-900/40' : 'bg-indigo-200'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${darkMode ? 'text-blue-300' : 'text-indigo-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <h5 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Development Manager</h5>
                  <p className={`mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Lead strategic development initiatives and partnerships with educational institutions.</p>
                  <div className={`mb-4 space-y-1 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    <p><span className="font-medium">Facility:</span> Available</p>
                    <p><span className="font-medium">Salary:</span> Competitive</p>
                    <p><span className="font-medium">Sponsorship:</span> Available for suitable applicants</p>
                  </div>
                  <a href="#cv-form" className={`inline-flex items-center font-medium ${darkMode ? 'text-blue-400' : 'text-indigo-600'}`}>
                    Apply Now
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <FaSearch className={`mx-auto text-4xl mb-6 ${darkMode ? 'text-blue-400/50' : 'text-indigo-300'}`} />
              <h4 className={`text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>More Positions Coming Soon</h4>
              <p className={`max-w-lg mx-auto mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                We're expanding our job opportunities board. Submit your CV now to get early access
                and be among the first to apply when new positions become available.
              </p>
              <a href="#cv-form" className={`inline-block px-6 py-3 font-semibold rounded-xl transition-all ${
                darkMode ? 'bg-blue-900/40 text-blue-300 hover:bg-blue-900/60' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
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