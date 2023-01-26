// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
import "firebase/compat/storage"

const firebaseConfig = {
  apiKey: "AIzaSyCydAknMqUHAsA35Vzrj8uOEDImKzojdIA",
  authDomain: "auth-550f5.firebaseapp.com",
  projectId: "auth-550f5",
  storageBucket: "auth-550f5.appspot.com",
  messagingSenderId: "807238592916",
  appId: "1:807238592916:web:2d7b291eeebe1293470781",
  measurementId: "G-5Y20JZWFPL"
};

// Initialize Firebase
if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig)
}
export {firebase};