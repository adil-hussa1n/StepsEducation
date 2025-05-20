import React, { useState } from 'react';
import { sendEmail } from '../../utils/emailjs';

const EmailTest = () => {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const sendTestEmail = async () => {
    setLoading(true);
    setResult('');
    setError('');

    try {
      console.log('Testing with enhanced sendEmail utility');

      const templateParams = {
        user_name: 'Test User',
        user_email: 'test@example.com',
        user_phone: '1234567890',
        user_service: 'Test Service',
        message: 'This is a test message from EmailTest component.'
      };

      const { success, result, error } = await sendEmail(templateParams);

      if (success) {
        console.log('SUCCESS!', result);
        setResult(`Email sent successfully! Status: ${result.status}, Text: ${result.text}`);
      } else {
        console.error('FAILED...', error);
        setError(`Failed to send email: ${error?.text || error?.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('FAILED...', error);
      setError(`Failed to send email: ${error?.text || error?.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">EmailJS Test</h2>
      
      <div className="mb-4">
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
          Click the button below to test your EmailJS configuration.
        </p>
        <button
          onClick={sendTestEmail}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Sending...' : 'Send Test Email'}
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
        <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Configuration</h3>
        <div className="grid grid-cols-1 gap-2 text-sm">
          <div className="flex">
            <span className="font-medium text-gray-700 dark:text-gray-300 w-32">Service ID:</span>
            <span className="text-gray-600 dark:text-gray-400">{EMAILJS_SERVICE_ID}</span>
          </div>
          <div className="flex">
            <span className="font-medium text-gray-700 dark:text-gray-300 w-32">Template ID:</span>
            <span className="text-gray-600 dark:text-gray-400">{EMAILJS_TEMPLATE_ID}</span>
          </div>
          <div className="flex">
            <span className="font-medium text-gray-700 dark:text-gray-300 w-32">Public Key:</span>
            <span className="text-gray-600 dark:text-gray-400">{EMAILJS_PUBLIC_KEY}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailTest;
