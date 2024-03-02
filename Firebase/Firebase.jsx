

import { initializeApp } from "firebase/app";
import { getAuth , createUserWithEmailAndPassword , signInWithEmailAndPassword , onAuthStateChanged , signOut  } from "firebase/auth";
import { collection, addDoc , getFirestore , doc, updateDoc , getDocs , getDoc , onSnapshot , deleteDoc  } from "firebase/firestore"; 
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// firebaseConfig



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