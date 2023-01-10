import { FirebaseApp, initializeApp } from "firebase/app";
import { FirebaseStorage, getStorage } from "firebase/storage";

const firebaseConfig: object = {
    apiKey: "AIzaSyCtEciU0RBFc1FUzmrsm9oSJJGijkIbDJo",
    authDomain: "test-2f5b1.firebaseapp.com",
    databaseURL: "https://test-2f5b1-default-rtdb.firebaseio.com",
    projectId: "test-2f5b1",
    storageBucket: "test-2f5b1.appspot.com",
    messagingSenderId: "212941067327",
    appId: "1:212941067327:web:86603d1d543e193134d48a"
};

export const app: FirebaseApp = initializeApp(firebaseConfig);
export const storage: FirebaseStorage = getStorage(app);