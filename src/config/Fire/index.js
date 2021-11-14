import * as firebase from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyA0Q-I8zpNxx3mwpbXNka05rcgqUfzgAKM",
    authDomain: "my-doctor-01-1825f.firebaseapp.com",
    projectId: "my-doctor-01-1825f",
    storageBucket: "my-doctor-01-1825f.appspot.com",
    messagingSenderId: "993021453788",
    appId: "1:993021453788:web:224c299b0307c9d7ce1b19",
    databaseURL: "https://my-doctor-01-1825f-default-rtdb.asia-southeast1.firebasedatabase.app/"
  };
  
  // Initialize Firebase
  const Fire = (type) => {
    const app = firebase.initializeApp(firebaseConfig);
    const database = getDatabase(app);
    const auth = getAuth(app);

    if(type === 'database') {
      return database;
    }
    else if (type === 'auth'){
      return auth;
    }
    return app;
  };

  export default Fire;