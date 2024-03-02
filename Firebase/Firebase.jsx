

import { initializeApp } from "firebase/app";
import { getAuth , createUserWithEmailAndPassword , signInWithEmailAndPassword , onAuthStateChanged , signOut  } from "firebase/auth";
import { collection, addDoc , getFirestore , doc, updateDoc , getDocs , getDoc , onSnapshot , deleteDoc  } from "firebase/firestore"; 
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBhJds05uVR4Ie4kMWXO5hCr9ecI0wu9pM",
    authDomain: "event-organization-app-326d8.firebaseapp.com",
    projectId: "event-organization-app-326d8",
    storageBucket: "event-organization-app-326d8.appspot.com",
    messagingSenderId: "1007334106258",
    appId: "1:1007334106258:web:a6eb902bf7e1b3a055f24b"
};


  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const storage = getStorage();
  const storageRef = ref(storage);


export {
    initializeApp,
    app , auth , collection , addDoc , createUserWithEmailAndPassword,
    db , signInWithEmailAndPassword , onAuthStateChanged , signOut,
    doc, updateDoc , storage , storageRef , uploadBytesResumable, getDownloadURL,
    getDocs , getDoc , ref , onSnapshot , deleteDoc 
}