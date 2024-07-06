import { initializeApp } from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import {getAuth , GoogleAuthProvider} from "firebase/auth";
import { getFirestore , doc , setDoc } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCtvS3FClNaXgmSioOgf9aBQsa47aNi9Ws",
  authDomain: "finance-tracker-b62be.firebaseapp.com",
  projectId: "finance-tracker-b62be",
  storageBucket: "finance-tracker-b62be.appspot.com",
  messagingSenderId: "63162063922",
  appId: "1:63162063922:web:97304fea317a125150702b"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app)
const auth = getAuth(app);
const provider = new GoogleAuthProvider()

export {db , auth, provider, doc, setDoc }