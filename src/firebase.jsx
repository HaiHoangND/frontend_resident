// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-bb4yi0y7UYG0SWegwjUeQVdtSDlOcCs",
  authDomain: "residentmanagement-21e3b.firebaseapp.com",
  projectId: "residentmanagement-21e3b",
  storageBucket: "residentmanagement-21e3b.appspot.com",
  messagingSenderId: "266037863689",
  appId: "1:266037863689:web:547583f4925b89cd069fd8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)