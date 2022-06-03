import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCUyNmz6GgQTBwW5J0Nk-WJSnyvaA41rEM",
  authDomain: "striker-c801e.firebaseapp.com",
  projectId: "striker-c801e",
  storageBucket: "striker-c801e.appspot.com",
  messagingSenderId: "138694789364",
  appId: "1:138694789364:web:aa9c5f2c3383a55936f6a1",
  measurementId: "G-33SSCCZCQM",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };
export default app;
