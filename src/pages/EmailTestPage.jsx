import React from 'react';
import EmailTest from '../components/contact/EmailTest';
import DirectEmailTest from '../components/contact/DirectEmailTest';
import BasicEmailForm from '../components/contact/BasicEmailForm';

const EmailTestPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">
        EmailJS Test Page
      </h1>
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <h2 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200">EmailJS Troubleshooting</h2>
          <p className="text-yellow-700 dark:text-yellow-300 text-sm mt-2">
            We've created multiple test components to help diagnose the EmailJS issue. Please try the Basic Email Form below, which uses a direct HTML approach to EmailJS.  
          </p>
        </div>
        
        <BasicEmailForm />
        
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
          <h3 className="text-lg font-semibold mb-4">Previous Test Components</h3>
          <EmailTest />
          <div className="mt-6"></div>
          <DirectEmailTest />
        </div>
      </div>
    </div>
  );
};

export default EmailTestPage;
