// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// const { REACT_APP_FIREBASE_API_KEY } = import.;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDq5ocMUNEHjYBlU5moQiFzDatW7BpJmFQ',
  authDomain: 'graphiql-app-de454.firebaseapp.com',
  projectId: 'graphiql-app-de454',
  storageBucket: 'graphiql-app-de454.appspot.com',
  messagingSenderId: '816201380456',
  appId: '1:816201380456:web:2a1ea45e0e3c57210401dd',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
