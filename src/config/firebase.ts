// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJxkHBr9F7XHdd0eNYUgV1DAojDXLA_lc",
  authDomain: "react-js-todo-c1c9c.firebaseapp.com",
  projectId: "react-js-todo-c1c9c",
  storageBucket: "react-js-todo-c1c9c.firebasestorage.app",
  messagingSenderId: "963388911923",
  appId: "1:963388911923:web:59de91d91117b0fe50ce46"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
export const firestoreDb = getFirestore(app);
export default app;