import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaWhatsapp } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const Contact = () => {
  const { darkMode } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: "" });
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    if (!formData.message.trim()) errors.message = "Message is required";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      // Form submission logic would go here
      console.log("Form submitted:", formData);
      setFormSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    } else {
      setFormErrors(errors);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className={`min-h-screen pt-24 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-b from-blue-50 to-white text-gray-800'}`}>
      <div className="container mx-auto px-4 py-8">
        {/* Page Title */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${darkMode ? 'text-white' : 'bg-gradient-to-r from-blue-700 to-purple-600 bg-clip-text text-transparent'}`}>
            Contact Us
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Have questions or need assistance? We're here to help! Reach out to our friendly team using any of the methods below.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={`rounded-xl shadow-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white backdrop-blur-sm bg-opacity-70 hover:shadow-2xl transition-shadow duration-300'}`}
          >
            <motion.h2 
              variants={itemVariants}
              className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}
            >
              Send Us a Message
            </motion.h2>
            
            {formSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`p-6 rounded-lg text-center ${darkMode ? 'bg-gray-700' : 'bg-green-50'} mb-6`}
              >
                <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-green-400' : 'text-green-600'}`}>Thank You!</h3>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                  Your message has been sent successfully. We'll get back to you as soon as possible.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className={`mt-4 px-6 py-2 rounded-lg transition-all ${
                    darkMode 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                  }`}
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <motion.div variants={itemVariants} className="mb-4">
                    <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                      Your Name*
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full p-3 rounded-lg border ${
                        formErrors.name 
                          ? 'border-red-500' 
                          : darkMode 
                            ? 'border-gray-600 bg-gray-700 text-white' 
                            : 'border-gray-300 focus:border-blue-500 hover:border-blue-300'
                      } focus:outline-none transition duration-200`}
                      placeholder="John Doe"
                    />
                    {formErrors.name && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                    )}
                  </motion.div>
                  
                  <motion.div variants={itemVariants} className="mb-4">
                    <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                      Email Address*
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full p-3 rounded-lg border ${
                        formErrors.email 
                          ? 'border-red-500' 
                          : darkMode 
                            ? 'border-gray-600 bg-gray-700 text-white' 
                            : 'border-gray-300 focus:border-blue-500 hover:border-blue-300'
                      } focus:outline-none transition duration-200`}
                      placeholder="example@email.com"
                    />
                    {formErrors.email && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                    )}
                  </motion.div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <motion.div variants={itemVariants} className="mb-4">
                    <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full p-3 rounded-lg border ${
                        darkMode 
                          ? 'border-gray-600 bg-gray-700 text-white' 
                          : 'border-gray-300 focus:border-blue-500 hover:border-blue-300'
                      } focus:outline-none transition duration-200`}
                      placeholder="Your phone number"
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants} className="mb-4">
                    <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`w-full p-3 rounded-lg border ${
                        darkMode 
                          ? 'border-gray-600 bg-gray-700 text-white' 
                          : 'border-gray-300 focus:border-blue-500 hover:border-blue-300'
                      } focus:outline-none transition duration-200`}
                      placeholder="How can we help you?"
                    />
                  </motion.div>
                </div>

                <motion.div variants={itemVariants} className="mb-6">
                  <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                    Your Message*
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className={`w-full p-3 rounded-lg border ${
                      formErrors.message 
                        ? 'border-red-500' 
                        : darkMode 
                          ? 'border-gray-600 bg-gray-700 text-white' 
                          : 'border-gray-300 focus:border-blue-500 hover:border-blue-300'
                    } focus:outline-none transition duration-200`}
                    placeholder="Please provide details about your inquiry..."
                  ></textarea>
                  {formErrors.message && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.message}</p>
                  )}
                </motion.div>

                <motion.div variants={itemVariants}>
                  <button
                    type="submit"
                    className={`w-full py-3 px-6 rounded-lg font-medium transition-all ${
                      darkMode 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                    }`}
                  >
                    Send Message
                  </button>
                </motion.div>
              </form>
            )}
          </motion.div>

          {/* Contact Information */}
          <div>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className={`rounded-xl shadow-xl p-6 mb-8 ${darkMode ? 'bg-gray-800' : 'bg-white backdrop-blur-sm bg-opacity-70 hover:shadow-2xl transition-shadow duration-300'}`}
            >
              <motion.h2 
                variants={itemVariants}
                className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}
              >
                Contact Information
              </motion.h2>
              
              <div className="space-y-6">
                <motion.div variants={itemVariants} className="flex items-start">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${darkMode ? 'bg-blue-900/40' : 'bg-blue-100'} mr-4`}>
                    <FaMapMarkerAlt className={`text-xl ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                  </div>
                  <div>
                    <h3 className={`text-lg font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Our Location</h3>
                    <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                      City Gate House, 246–250 Romford Road, Stratford, London E7 9HZ
                    </p>
                  </div>
                </motion.div>
                
                <motion.div variants={itemVariants} className="flex items-start">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${darkMode ? 'bg-blue-900/40' : 'bg-blue-100'} mr-4`}>
                    <FaWhatsapp className={`text-xl ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                  </div>
                  <div>
                    <h3 className={`text-lg font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}>WhatsApp</h3>
                    <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                      +447309093612
                    </p>
                  </div>
                </motion.div>
                
                <motion.div variants={itemVariants} className="flex items-start">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${darkMode ? 'bg-blue-900/40' : 'bg-blue-100'} mr-4`}>
                    <FaPhoneAlt className={`text-xl ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                  </div>
                  <div>
                    <h3 className={`text-lg font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Phone</h3>
                    <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                      +4407988501805
                    </p>
                  </div>
                </motion.div>
                
                <motion.div variants={itemVariants} className="flex items-start">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${darkMode ? 'bg-blue-900/40' : 'bg-blue-100'} mr-4`}>
                    <FaEnvelope className={`text-xl ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                  </div>
                  <div>
                    <h3 className={`text-lg font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Email</h3>
                    <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                      info@stepseducation.co.uk
                    </p>
                  </div>
                </motion.div>
                
                <motion.div variants={itemVariants} className="flex items-start">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${darkMode ? 'bg-blue-900/40' : 'bg-blue-100'} mr-4`}>
                    <FaClock className={`text-xl ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                  </div>
                  <div>
                    <h3 className={`text-lg font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Opening Hours</h3>
                    <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                      Monday - Friday: 9:00 AM - 6:00 PM<br />
                      Saturday: 10:00 AM - 2:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
            
            {/* Map */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible" 
              className={`rounded-xl shadow-xl overflow-hidden ${darkMode ? 'bg-gray-800 p-1' : 'bg-white p-1'}`}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2481.9548542266766!2d0.0031595!3d51.5452423!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a7a8c0b0b0b3%3A0x4d3f9e3f8172a0eb!2sCity%20Gate%20House%2C%20246-250%20Romford%20Rd%2C%20London%20E7%209HZ!5e0!3m2!1sen!2suk!4v1651234567890!5m2!1sen!2suk"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Office Location"
                className="rounded-lg"
              ></iframe>
            </motion.div>
          </div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className={`mt-16 p-8 rounded-xl shadow-xl ${darkMode ? 'bg-gray-800' : 'bg-white backdrop-blur-sm bg-opacity-70'}`}
        >
          <h2 className={`text-2xl font-bold mb-8 text-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Frequently Asked Questions
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <h3 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                What are your office hours?
              </h3>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                Our office is open Monday to Friday from 9:00 AM to 6:00 PM, and Saturday from 10:00 AM to 2:00 PM. We are closed on Sundays and public holidays.
              </p>
            </div>
            
            <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <h3 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                How long does it take to get a response?
              </h3>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                We aim to respond to all inquiries within 24-48 business hours. For urgent matters, we recommend calling our office directly.
              </p>
            </div>
            
            <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <h3 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                Do you offer virtual consultations?
              </h3>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                Yes, we offer consultations via Zoom, Microsoft Teams, or other platforms of your choice. Simply mention your preference when booking your appointment.
              </p>
            </div>
            
            <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <h3 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                How do I book an appointment?
              </h3>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                You can book an appointment by calling our office, sending an email, or using the contact form on this page. Please provide your preferred date and time.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;