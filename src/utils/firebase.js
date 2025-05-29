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
 * Upload a CV file to Firebase Storage
 * @param {File} file - The file to upload
 * @param {Function} [progressCallback] - Optional callback for upload progress
 * @returns {Promise<string>} - The download URL for the uploaded file
 */
export const uploadCvFile = async (file, progressCallback = null) => {
  try {
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
          throw error;
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
    throw error;
  }
};

export { storage };
export default storage;
