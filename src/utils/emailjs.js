import emailjs from '@emailjs/browser';

// EmailJS configuration constants
export const EMAILJS_SERVICE_ID = 'service_7g14rgi'; // Your EmailJS service ID
export const EMAILJS_TEMPLATE_ID = 'template_eaxoyqs'; // Your EmailJS template ID
export const EMAILJS_PUBLIC_KEY = 'sEomWR6Z3MeDGaE1t'; // Your EmailJS public key

// Initialize EmailJS with your user ID
// This should be called once when your app starts
export const initEmailJS = () => {
  try {
    // Initialize with user ID
    emailjs.init(EMAILJS_PUBLIC_KEY);
    console.log('EmailJS initialized with public key:', EMAILJS_PUBLIC_KEY);
  } catch (error) {
    console.error('Failed to initialize EmailJS:', error);
  }
};

// Helper function to send emails directly using the EmailJS API
export const sendEmail = async (templateParams) => {
  console.log('Attempting to send email with EmailJS');
  console.log('Template params:', templateParams);
  
  if (!templateParams.user_email) {
    console.error('Error: Missing user email');
    return { success: false, error: { text: 'Missing email address' } };
  }
  
  // Prepare parameters with all required fields
  const params = {
    from_name: templateParams.user_name || 'Website Visitor',
    reply_to: templateParams.user_email,
    to_name: 'Steps Education Team',
    user_name: templateParams.user_name || 'Not provided',
    user_email: templateParams.user_email,
    user_phone: templateParams.user_phone || 'Not provided',
    user_service: templateParams.user_service || 'Not specified',
    message: templateParams.message || 'No message content',
  };
  
  console.log('Sending with params:', params);
  
  try {
    // Ensure EmailJS is initialized
    emailjs.init(EMAILJS_PUBLIC_KEY);
    
    // Try using the direct send method
    const result = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      params
    );
    
    console.log('EmailJS API response:', result);
    return { success: true, result };
  } catch (error) {
    console.error('EmailJS error:', error);
    return { 
      success: false, 
      error: { 
        text: error.text || 'Failed to send email. Please try again later.'
      } 
    };
  }
}
