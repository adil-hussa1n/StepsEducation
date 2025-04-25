import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ContactForm = ({ services = [], onSubmitSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    service: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (!formData.service) {
      newErrors.service = 'Please select a service';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        if (onSubmitSuccess) {
          onSubmitSuccess();
        }
      }, 1500);
    }
  };

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-md p-6 text-center">
        <h3 className="text-xl font-semibold text-green-700 mb-2">Thank You!</h3>
        <p className="text-green-600 mb-4">Your message has been sent successfully.</p>
        <p className="text-gray-600">We'll get back to you as soon as possible.</p>
        <button 
          onClick={() => {
            setFormData({
              name: '',
              email: '',
              phone: '',
              message: '',
              service: ''
            });
            setSubmitted(false);
          }}
          className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-xl border ${
              errors.name 
                ? 'border-red-300 dark:border-red-700 focus:border-red-500 dark:focus:border-red-500 focus:ring-red-500 dark:focus:ring-red-500' 
                : 'border-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-500 focus:ring-indigo-500 dark:focus:ring-indigo-500'
            } focus:outline-none focus:ring-2 focus:ring-opacity-50 transition duration-150 ease-in-out bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100`}
            placeholder="John Doe"
          />
          {errors.name && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-xl border ${
              errors.email 
                ? 'border-red-300 dark:border-red-700 focus:border-red-500 dark:focus:border-red-500 focus:ring-red-500 dark:focus:ring-red-500' 
                : 'border-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-500 focus:ring-indigo-500 dark:focus:ring-indigo-500'
            } focus:outline-none focus:ring-2 focus:ring-opacity-50 transition duration-150 ease-in-out bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100`}
            placeholder="johndoe@example.com"
          />
          {errors.email && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-xl border ${
              errors.phone 
                ? 'border-red-300 dark:border-red-700 focus:border-red-500 dark:focus:border-red-500 focus:ring-red-500 dark:focus:ring-red-500' 
                : 'border-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-500 focus:ring-indigo-500 dark:focus:ring-indigo-500'
            } focus:outline-none focus:ring-2 focus:ring-opacity-50 transition duration-150 ease-in-out bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100`}
            placeholder="+44 123 456 7890"
          />
          {errors.phone && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.phone}</p>}
        </div>
        <div>
          <label htmlFor="service" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Service Interested In *
          </label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-xl border ${
              errors.service 
                ? 'border-red-300 dark:border-red-700 focus:border-red-500 dark:focus:border-red-500 focus:ring-red-500 dark:focus:ring-red-500' 
                : 'border-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-500 focus:ring-indigo-500 dark:focus:ring-indigo-500'
            } focus:outline-none focus:ring-2 focus:ring-opacity-50 transition duration-150 ease-in-out bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100`}
          >
            <option value="">Select a service</option>
            {Array.isArray(services) && services.length > 0 ? (
              services.map((service, index) => (
                <option key={index} value={typeof service === 'string' ? service : service.value}>
                  {typeof service === 'string' ? service : service.label}
                </option>
              ))
            ) : (
              <>
                <option value="International Student Recruitment">International Student Recruitment</option>
                <option value="Documents Assessment">Documents Assessment</option>
                <option value="University Selection">University Selection</option>
                <option value="Admission Process">Admission Process</option>
                <option value="Visa Application">Visa Application Guidance</option>
                <option value="Local Student Admissions">Local Student Admissions</option>
                <option value="Employability Services">Employability Services</option>
              </>
            )}
          </select>
          {errors.service && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.service}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          rows="4"
          value={formData.message}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-xl border ${
            errors.message 
              ? 'border-red-300 dark:border-red-700 focus:border-red-500 dark:focus:border-red-500 focus:ring-red-500 dark:focus:ring-red-500' 
              : 'border-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-500 focus:ring-indigo-500 dark:focus:ring-indigo-500'
          } focus:outline-none focus:ring-2 focus:ring-opacity-50 transition duration-150 ease-in-out bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100`}
          placeholder="Please provide details about your inquiry..."
        ></textarea>
        {errors.message && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message}</p>}
      </div>

      <div>
        <motion.button
          type="submit"
          disabled={isSubmitting}
          className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-md text-white bg-gradient-to-r from-indigo-600 to-purple-500 hover:from-indigo-700 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-800 transition duration-150 ease-in-out font-medium text-base 
          ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-lg transform hover:-translate-y-1'}`}
          whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
          whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            'Send Message'
          )}
        </motion.button>
      </div>
      
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
        By submitting this form, you agree to our <a href="#" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300">Terms of Service</a> and <a href="#" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300">Privacy Policy</a>.
      </p>
    </form>
  );
};

export default ContactForm;
