import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB_JtioExsHCmex9Tq9ARiyehNaUCfK9do",
  authDomain: "kasol-krusade.firebaseapp.com",
  projectId: "kasol-krusade",
  storageBucket: "kasol-krusade.appspot.com",
  messagingSenderId: "1037305692644",
  appId: "1:1037305692644:web:255625486df32c2b7787f1",
};

const app = initializeApp(firebaseConfig);
var db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
