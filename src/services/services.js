import { auth } from '../config/firebase';
import { endpoints } from '../constants/urls';
import { httpClient } from './httpClient';
import '../App.css'

export const handleSignin = async (email, password) => {
    try {
      // Sign in with Firebase authentication
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      // User signed in successfully
      const user = userCredential.user;
      return user; // Return the user object if needed
    } catch (error) {
      // Handle sign-in errors
      console.log('Sign-in error:', error);
      throw error; // Throw the error to handle it in the calling code
    }
};

export const handleSignup = async (email, password) => {
    try {
      // Sign up with Firebase authentication
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      // User signed up successfully
      const user = userCredential.user;
      return user; // Return the user object if needed
    } catch (error) {
      // Handle sign-up errors
      console.log('Sign-up error:', error);
      throw error; // Throw the error to handle it in the calling code
    }
  };

export const handleSignout = async () => {
  try {
    await auth.signOut();
    console.log('User logged out successfully');
    return null; // Return null or an empty value if needed
  } catch (error) {
    console.error('Error logging out:', error);
    throw error; // Throw the error to handle it in the calling code
  }
};

export const handlePDFSend = async (file, PDFName) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('PDFName', PDFName)
  const response = await httpClient.post(endpoints.pdfgpt.askFile, formData);
  console.log(response.data);
  return response.data;
}

export const services = {
    handleSignin,
    handleSignup,
    handleSignout,
    handlePDFSend
}
  