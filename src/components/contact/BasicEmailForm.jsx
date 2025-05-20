import React, { useRef, useState } from 'react';

const BasicEmailForm = () => {
  const formRef = useRef();
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('Sending...');

    const form = formRef.current;
    const data = new FormData(form);
    const xhr = new XMLHttpRequest();
    
    xhr.open(form.method, form.action);
    xhr.setRequestHeader("Accept", "application/json");
    
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      
      if (xhr.status === 200) {
        form.reset();
        setStatus("SUCCESS: Message sent successfully!");
        setLoading(false);
      } else {
        setStatus(`ERROR: ${xhr.statusText} (${xhr.status})`);
        setLoading(false);
      }
    };
    
    xhr.send(data);
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Basic Email Form</h2>
      <p className="mb-4 text-gray-600 dark:text-gray-300">
        This form uses a direct HTML submission to EmailJS, bypassing any React-specific issues.
      </p>
      
      {status && (
        <div className={`p-3 mb-4 rounded-md ${status.includes('ERROR') ? 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300' : 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300'}`}>
          {status}
        </div>
      )}
      
      <form
        ref={formRef}
        action="https://api.emailjs.com/api/v1.0/email/send-form"
        method="POST"
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input type="hidden" name="service_id" value="service_7g14rgi" />
        <input type="hidden" name="template_id" value="template_eaxoyqs" />
        <input type="hidden" name="user_id" value="sEomWR6Z3MeDGaE1t" />
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Name
          </label>
          <input
            type="text"
            name="user_name"
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email
          </label>
          <input
            type="email"
            name="user_email"
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Phone
          </label>
          <input
            type="tel"
            name="user_phone"
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Service
          </label>
          <select
            name="user_service"
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="">Select a service</option>
            <option value="International Student Recruitment">International Student Recruitment</option>
            <option value="Documents Assessment">Documents Assessment</option>
            <option value="University Selection">University Selection</option>
            <option value="Admission Process">Admission Process</option>
            <option value="Visa Application">Visa Application Guidance</option>
            <option value="Local Student Admissions">Local Student Admissions</option>
            <option value="Employability Services">Employability Services</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Message
          </label>
          <textarea
            name="message"
            rows="4"
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          ></textarea>
        </div>
        
        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BasicEmailForm;
