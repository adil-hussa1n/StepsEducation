import emailjs from '@emailjs/browser';
import { uploadCvFile } from './firebase';

// EmailJS configuration
const EMAILJS_SERVICE_ID = 'service_7g14rgi';
const EMAILJS_TEMPLATE_ID = 'template_eaxoyqs';
const EMAILJS_PUBLIC_KEY = 'sEomWR6Z3MeDGaE1t';

/**
 * Submit CV with file attachment
 * @param {Object} formData - Form data including user details
 * @param {File} file - CV file to upload
 * @param {Function} [setProgress] - Optional callback for upload progress
 * @returns {Promise<Object>} - Result of the submission
 */
export const submitCV = async (formData, file, setProgress = null) => {
  try {
    // Show initial loading state
    if (setProgress) setProgress(20);
    
    // Initialize EmailJS
    emailjs.init(EMAILJS_PUBLIC_KEY);
    
    // Update progress to show we're starting the upload
    if (setProgress) setProgress(30);
    
    // Check if we're in development mode
    const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    
    // Simulate progress in development mode
    if (isDevelopment && setProgress) {
      // Create a progress simulation in development
      setTimeout(() => setProgress(40), 300);
      setTimeout(() => setProgress(60), 600);
    }
    
    let fileUrl = '';
    
    try {
      // Upload the file to Firebase (or get placeholder in development)
      fileUrl = await uploadCvFile(file);
      if (setProgress) setProgress(80);
    } catch (uploadError) {
      console.error('File upload failed:', uploadError);
      // Continue with submission even if upload fails
      fileUrl = 'File upload failed. Please contact the applicant directly for their CV.';
      // Ensure progress continues
      if (setProgress) setProgress(80);
    }
    
    // Prepare email parameters
    const emailParams = {
      to_name: 'Steps Education Team',
      from_name: formData.name,
      reply_to: formData.email,
      subject: 'CV Submission from ' + formData.name,
      user_name: formData.name,
      user_email: formData.email,
      user_phone: formData.phone || 'Not provided',
      education: formData.education || 'Not specified',
      experience: formData.experience || 'Not specified',
      cv_file: fileUrl,  // This must match your EmailJS template parameter
      message: `CV Submission from ${formData.name}\n\nEducation: ${formData.education || 'Not specified'}\nExperience: ${formData.experience || 'Not specified'}`
    };
    
    // Send the email
    if (setProgress) setProgress(90);
    
    const result = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      emailParams
    );
    
    console.log('Email sent successfully:', result);
    if (setProgress) setProgress(100);
    
    return { 
      success: true, 
      message: 'Your CV was submitted successfully!',
      fileUrl,
      emailResult: result
    };
  } catch (error) {
    console.error('Error submitting CV:', error);
    if (setProgress) setProgress(100);
    
    return { 
      success: false, 
      message: 'Failed to submit your CV. Please try again or contact us directly.',
      error
    };
  }
};
