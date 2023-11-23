// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBXA1M6xxt9yPIQ5y4vHfDaOu7Tv6lh8pQ",
    authDomain: "project01-8d42c.firebaseapp.com",
    projectId: "project01-8d42c",
    storageBucket: "project01-8d42c.appspot.com",
    messagingSenderId: "156801065969",
    appId: "1:156801065969:web:f1517101f71e48d7621a50",
    measurementId: "G-Y7RTEJE3TF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app)