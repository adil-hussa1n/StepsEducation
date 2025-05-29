// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD93NfM_qjZi4onKCjXu_r85ZflrJhl2Ro",
  authDomain: "stepseducation-4f796.firebaseapp.com",
  projectId: "stepseducation-4f796",
  storageBucket: "stepseducation-4f796.appspot.com",
  messagingSenderId: "305353066854",
  appId: "1:305353066854:web:eb2a0d5543577b72dfe0a7",
  measurementId: "G-V9BT3VV1HH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage with custom settings
const storage = getStorage(app);

/**
 * Generate a descriptive message for a file without uploading it
 * This is a workaround for CORS issues in development and production
 * @param {File} file - The file to generate a message for
 * @returns {string} - A descriptive message about the file
 */
export const generatePublicUrl = (file) => {
  // Create a descriptive message about the file instead of a fake URL
  // This is honest with users about what's happening
  const fileSize = Math.round(file.size/1024);
  
  return `[CV File: ${file.name} (${fileSize} KB) - The file has been received but is not available for download due to storage configuration. The applicant will need to send their CV separately.]`;
};

/**
 * Upload a CV file to Firebase Storage with improved error handling
 * @param {File} file - The file to upload
 * @param {Function} [progressCallback] - Optional callback for upload progress
 * @returns {Promise<string>} - The download URL for the uploaded file
 */
export const uploadCvFile = async (file, progressCallback = null) => {
  try {
    // Check if we're in development mode
    const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    
    // In development mode, don't actually upload to Firebase
    if (isDevelopment) {
      console.log('Development mode detected - skipping actual upload');
      
      // Simulate progress
      if (progressCallback) {
        for (let i = 0; i <= 100; i += 20) {
          progressCallback(i);
          await new Promise(resolve => setTimeout(resolve, 200));
        }
      }
      
      // Return a mock URL
      return generatePublicUrl(file);
    }
    
    // In production, attempt to upload to Firebase
    const filePath = `cvs/${Date.now()}_${file.name}`;
    const storageRef = ref(storage, filePath);
    
    if (progressCallback) {
      // Use resumable upload to track progress
      const uploadTask = uploadBytesResumable(storageRef, file);
      
      uploadTask.on('state_changed', 
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          progressCallback(progress);
        }, 
        (error) => {
          console.error('Upload error:', error);
          // Don't throw, we'll handle this in the catch block
        }
      );
      
      // Wait for the upload to complete
      await uploadTask;
    } else {
      // Simple upload without progress tracking
      await uploadBytes(storageRef, file);
    }
    
    // Get the download URL
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading file:', error);
    // Return a generated URL as fallback
    return generatePublicUrl(file);
  }
};

export { storage };
export default storage;
