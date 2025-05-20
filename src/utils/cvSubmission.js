import emailjs from '@emailjs/browser';
import { uploadFile } from './firebase';
import { EMAILJS_SERVICE_ID, EMAILJS_PUBLIC_KEY } from './emailjs';

// Using EmailJS service and public key from the centralized utility file
// Using the contact form template for CV submissions as well
const CV_TEMPLATE_ID = 'template_eaxoyqs';

// Debug flag to help with troubleshooting
const DEBUG = true;

/**
 * Submit CV with file attachment or just send email with CV information
 * @param {Object} formData - Form data including user details
 * @param {File} file - CV file to upload
 * @param {Function} [onProgress] - Optional callback for upload progress
 * @returns {Promise<Object>} - Result of the submission
 */
export const submitCVWithFile = async (formData, file, onProgress) => {
  try {
    // Initialize EmailJS
    emailjs.init(EMAILJS_PUBLIC_KEY);
    
    // File information for the email
    const timestamp = new Date().getTime();
    const fileName = `${formData.name.replace(/\s+/g, '_')}_${timestamp}`;
    const filePath = `cvs/${fileName}_${file.name}`;
    let fileUrl = null;
    
    try {
      // 1. Try to upload file to Firebase
      console.log('Uploading file to Firebase...');
      fileUrl = await uploadFile(file, filePath, onProgress);
      console.log('File uploaded successfully, URL:', fileUrl);
    } catch (uploadError) {
      // Check if this is a CORS error
      const isCorsError = 
        uploadError.code === 'storage/cors-error' || 
        (uploadError.message && uploadError.message.includes('CORS')) ||
        (uploadError.serverResponse && uploadError.serverResponse.includes('CORS'));
      
      if (isCorsError) {
        console.warn('CORS policy prevented file upload - this is expected in development environment');
        // Set a placeholder message instead of the file URL
        fileUrl = 'File upload failed due to CORS policy. The applicant will send the CV separately.';
      } else {
        console.error('File upload failed for non-CORS reason:', uploadError);
        fileUrl = `File upload failed: ${uploadError.message || 'Unknown error'}. Please try again or send CV separately.`;
      }
      
      // Continue with email sending despite upload failure
      if (onProgress) {
        onProgress(100); // Set progress to 100% to continue with form submission
      }
    }
    
    // 2. Prepare EmailJS parameters
    // Make sure these parameter names match exactly what's expected in your EmailJS template
    const emailParams = {
      from_name: formData.name,
      reply_to: formData.email,
      to_name: 'Steps Education Team',
      user_name: formData.name,
      user_email: formData.email,
      user_phone: formData.phone || 'Not provided',
      subject: 'CV Submission',
      education: formData.education || 'Not specified',
      experience: formData.experience || 'Not specified',
      cv_file_url: fileUrl,
      message: `CV Submission from ${formData.name}\n\nEducation: ${formData.education || 'Not specified'}\nExperience: ${formData.experience || 'Not specified'}\n\nCV File: ${fileUrl}`
    };
    
    if (DEBUG) {
      console.log('CV File URL:', fileUrl);
      console.log('Email Parameters:', emailParams);
    }
    
    // 3. Send email with CV information and file URL
    console.log('Sending email with CV information...');
    console.log('Service ID:', EMAILJS_SERVICE_ID);
    console.log('Template ID:', CV_TEMPLATE_ID);
    console.log('Parameters:', emailParams);
    
    try {
      // Ensure EmailJS is initialized again right before sending
      emailjs.init(EMAILJS_PUBLIC_KEY);
      
      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        CV_TEMPLATE_ID,
        emailParams
      );
      
      console.log('CV submitted successfully:', result);
      
      // Check if there was a CORS error during file upload
      const hadCorsError = fileUrl && fileUrl.includes('CORS policy');
      
      return { 
        success: true, 
        result,
        corsError: hadCorsError,
        fileUrl: fileUrl
      };
    } catch (emailError) {
      console.error('EmailJS error while sending CV:', emailError);
      return { 
        success: false, 
        error: emailError.text || 'Failed to send CV email. Please try again.'
      };
    }
  } catch (error) {
    console.error('Error submitting CV:', error);
    return { 
      success: false, 
      error: error.message || 'Failed to submit CV. Please try again.' 
    };
  }
};
