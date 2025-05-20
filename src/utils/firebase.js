// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD93NfM_qjZi4onKCjXu_r85ZflrJhl2Ro",
  authDomain: "stepseducation-4f796.firebaseapp.com",
  projectId: "stepseducation-4f796",
  storageBucket: "stepseducation-4f796.appspot.com", // Corrected storage bucket
  messagingSenderId: "305353066854",
  appId: "1:305353066854:web:eb2a0d5543577b72dfe0a7",
  measurementId: "G-V9BT3VV1HH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let analytics;

// Only initialize analytics in browser environment
try {
  analytics = getAnalytics(app);
} catch (error) {
  console.warn('Firebase Analytics not initialized:', error.message);
}

// Initialize Firebase Storage
const storage = getStorage(app);
console.log('Firebase initialized with storage bucket:', firebaseConfig.storageBucket);

/**
 * Upload a file to Firebase Storage with progress tracking
 * @param {File} file - The file to upload
 * @param {string} path - The path in Firebase Storage
 * @param {Function} [onProgress] - Optional callback for upload progress
 * @returns {Promise<string>} - The download URL of the uploaded file
 */
export const uploadFile = async (file, path, onProgress) => {
  try {
    console.log('Starting file upload to Firebase:', { fileName: file.name, fileSize: file.size, path });
    
    // Create a storage reference
    const storageRef = ref(storage, path);
    
    // Return a promise that resolves with the download URL
    return new Promise((resolve, reject) => {
      // Set a timeout to handle CORS issues in development environment
      const timeout = setTimeout(() => {
        console.warn('Upload timed out - likely due to CORS restrictions in development environment');
        // Create a custom error for CORS issues
        const corsError = new Error('CORS policy restriction prevented file upload');
        corsError.code = 'storage/cors-error';
        reject(corsError);
      }, 8000); // 8 second timeout
      
      // Use resumable upload for better reliability and progress tracking
      const uploadTask = uploadBytesResumable(storageRef, file);
      
      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      uploadTask.on('state_changed', 
        (snapshot) => {
          // Get upload progress
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload progress: ' + progress.toFixed(2) + '%');
          
          // Call progress callback if provided
          if (onProgress) {
            onProgress(progress);
          }
        }, 
        (error) => {
          // Handle unsuccessful uploads
          clearTimeout(timeout);
          console.error('Error during file upload:', error);
          
          // Check if this is a CORS-related error
          if (error.code === 'storage/unauthorized' || 
              error.message?.includes('CORS') || 
              error.serverResponse?.includes('CORS')) {
            const corsError = new Error('CORS policy restriction prevented file upload');
            corsError.code = 'storage/cors-error';
            reject(corsError);
          } else {
            reject(error);
          }
        }, 
        async () => {
          // Handle successful uploads on complete
          clearTimeout(timeout);
          console.log('Upload completed successfully');
          
          try {
            // Get the download URL
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log('File download URL:', downloadURL);
            resolve(downloadURL);
          } catch (urlError) {
            console.error('Error getting download URL:', urlError);
            reject(urlError);
          }
        }
      );
    });
  } catch (error) {
    console.error('Error setting up file upload:', error);
    throw error;
  }
};

export default storage;
