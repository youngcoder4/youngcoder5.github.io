export const firebaseConfig = {
  apiKey: "AIzaSyCSK9Nldu6ReAWUhxMUaMS4buLbmuZxXSY",
  authDomain: "fir-eb725.firebaseapp.com",
  projectId: "fir-eb725",
  storageBucket: "fir-eb725.firebasestorage.app",
  messagingSenderId: "820917159382",
  appId: "1:820917159382:web:3fbcf25457b5027171d077",
  measurementId: "G-RME6LZEH95"
};

export function getFriendlyFirebaseError(error) {
  if (!error || typeof error !== "object") {
    return "Unable to continue. Please check your Firebase configuration and enable the required authentication providers.";
  }

  const message = error.message || "";

  if (message.includes("auth/configuration-not-found") || message.includes("apiKey")) {
    return "Firebase configuration is missing or invalid. Update the web config in Firebase Console and enable Authentication.";
  }

  if (message.includes("auth/operation-not-allowed") || message.includes("GoogleAuthProvider") && message.includes("not enabled")) {
    return "Firebase Authentication is not enabled for this project. Turn on Email/Password and Google sign-in in the Firebase Console.";
  }

  if (message.includes("auth/email-already-in-use")) {
    return "This email is already registered. Please log in instead or use a different email.";
  }

  if (message.includes("auth/invalid-credential") || message.includes("auth/user-not-found") || message.includes("auth/wrong-password")) {
    return "The email or password is incorrect. Please check your credentials and try again.";
  }

  if (message.includes("auth/network-request-failed")) {
    return "Network issue detected. Check your internet connection and try again.";
  }

  if (message.includes("auth/too-many-requests")) {
    return "Too many login attempts. Please wait a moment and try again.";
  }

  return message || "Unable to complete your request. Please check the Firebase project setup and try again.";
}
