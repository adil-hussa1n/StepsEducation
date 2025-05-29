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

// Initialize Firebase Storage
const storage = getStorage(app);

/**
 * Create a data URL from a file (works in both development and production)
 * @param {File} file - The file to create a data URL for
 * @returns {Promise<string>} - A data URL containing the file content
 */
export const createDataUrl = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      // This creates a data URL that can be used directly as a download link
      resolve(reader.result);
    };
    reader.readAsDataURL(file);
  });
};

/**
 * Upload a CV file and get a download URL that works in both development and production
 * @param {File} file - The file to upload
 * @param {Function} [progressCallback] - Optional callback for upload progress
 * @returns {Promise<string>} - A URL that can be used to download the file
 */
export const uploadCvFile = async (file, progressCallback = null) => {
  try {
    // Check if we're in development mode
    const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    
    // Update progress to 20%
    if (progressCallback) progressCallback(20);
    
    // In development mode, create a data URL instead of uploading to Firebase
    if (isDevelopment) {
      console.log('Development mode - creating data URL');
      
      // Simulate progress
      if (progressCallback) progressCallback(50);
      
      // Create a data URL from the file
      const dataUrl = await createDataUrl(file);
      
      // Complete progress
      if (progressCallback) progressCallback(100);
      
      console.log('Created data URL for file');
      return dataUrl;
    }
    
    // In production, try to upload to Firebase first
    try {
      console.log('Production mode - uploading to Firebase');
      
      // Create a unique file path with timestamp to avoid conflicts
      const timestamp = Date.now();
      const filePath = `cvs/${timestamp}_${file.name}`;
      const storageRef = ref(storage, filePath);
      
      // Update progress to 30%
      if (progressCallback) progressCallback(30);
      
      // Upload the file
      await uploadBytes(storageRef, file);
      
      // Update progress to 70%
      if (progressCallback) progressCallback(70);
      
      // Get the download URL
      const downloadURL = await getDownloadURL(storageRef);
      
      // Complete progress
      if (progressCallback) progressCallback(100);
      
      console.log('Firebase upload successful, URL:', downloadURL);
      return downloadURL;
    } catch (firebaseError) {
      console.error('Firebase upload failed, using data URL instead:', firebaseError);
      
      // If Firebase upload fails, fall back to data URL
      if (progressCallback) progressCallback(50);
      
      const dataUrl = await createDataUrl(file);
      
      if (progressCallback) progressCallback(100);
      return dataUrl;
    }
  } catch (error) {
    console.error('Error handling file:', error);
    
    // If all else fails, return a descriptive message
    const fileSize = Math.round(file.size/1024);
    return `CV File: ${file.name} (${fileSize} KB) - File processing failed. Please contact support.`;
  }
};

export { storage };
export default storage;
