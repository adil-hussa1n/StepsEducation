import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

// Direct configuration without using the utility
const SERVICE_ID = 'service_7g14rgi';
const TEMPLATE_ID = 'template_eaxoyqs';
const PUBLIC_KEY = 'sEomWR6Z3MeDGaE1t';

const DirectEmailTest = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const sendDirectTestEmail = async () => {
    setLoading(true);
    setResult('');
    setError('');

    try {
      console.log('Sending direct test email without utility function');
      
      // Initialize EmailJS directly
      emailjs.init(PUBLIC_KEY);
      
      // Create test parameters
      const params = {
        from_name: 'Test User',
        reply_to: 'test@example.com',
        to_name: 'Steps Education Team',
        user_name: 'Test User',
        user_email: 'test@example.com',
        user_phone: '1234567890',
        user_service: 'Test Service',
        message: 'This is a direct test message bypassing the utility function.'
      };
      
      console.log('Sending with params:', params);
      console.log('Service ID:', SERVICE_ID);
      console.log('Template ID:', TEMPLATE_ID);
      
      // Send directly using EmailJS
      const response = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        params
      );
      
      console.log('Direct email response:', response);
      setResult(`Email sent successfully! Status: ${response.status}, Text: ${response.text}`);
    } catch (err) {
      console.error('Direct email error:', err);
      setError(`Failed to send email: ${err.text || err.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md mt-8">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Direct EmailJS Test</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
        This component bypasses the utility function and tests EmailJS directly.
      </p>
      
      <div className="mb-4">
        <button
          onClick={sendDirectTestEmail}
          disabled={loading}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
        >
          {loading ? 'Sending...' : 'Send Direct Test Email'}
        </button>
      </div>
      
      {result && (
        <div className="p-3 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-md mb-3">
          {result}
        </div>
      )}
      
      {error && (
        <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-md">
          {error}
        </div>
      )}
      
      <div className="mt-4 border-t pt-4 border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Direct Configuration</h3>
        <div className="grid grid-cols-1 gap-2 text-sm">
          <div className="flex">
            <span className="font-medium text-gray-700 dark:text-gray-300 w-32">Service ID:</span>
            <span className="text-gray-600 dark:text-gray-400">{SERVICE_ID}</span>
          </div>
          <div className="flex">
            <span className="font-medium text-gray-700 dark:text-gray-300 w-32">Template ID:</span>
            <span className="text-gray-600 dark:text-gray-400">{TEMPLATE_ID}</span>
          </div>
          <div className="flex">
            <span className="font-medium text-gray-700 dark:text-gray-300 w-32">Public Key:</span>
            <span className="text-gray-600 dark:text-gray-400">{PUBLIC_KEY}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DirectEmailTest;
