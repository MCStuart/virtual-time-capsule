// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
 // ...
};

// Initialize Firebase with a "default" Firebase project
var timeCapsule = firebase.initializeApp(firebaseConfig);

console.log(defaultProject.name);  // "[DEFAULT]"

// Option 1: Access Firebase services via the defaultProject variable
var defaultStorage = defaultProject.storage();
var defaultDatabase = defaultProject.database();

// Option 2: Access Firebase services using shorthand notation
defaultStorage = firebase.storage();
defaultDatabase = firebase.database();
