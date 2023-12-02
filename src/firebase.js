import firebase from "firebase/compat/app"
import "firebase/compat/auth"


const firebaseConfig = { // Have the firebase config here
    apiKey: "AIzaSyBh9_-2kG0ZhEHyZUty2StdKsZFXN-vNxs",
    authDomain: "rechat-b0bac.firebaseapp.com",
    projectId: "rechat-b0bac",
    storageBucket: "rechat-b0bac.appspot.com",
    messagingSenderId: "835298170927",
    appId: "1:835298170927:web:41bd98fe14f1d265e00eda"
  };

  const auth = firebase.initializeApp(firebaseConfig).auth()

//   const auth = firebase.auth();


// const auth = firebase.initializeApp({
//     apiKey: "AIzaSyBh9_-2kG0ZhEHyZUty2StdKsZFXN-vNxs",
//     authDomain: "rechat-b0bac.firebaseapp.com",
//     projectId: "rechat-b0bac",
//     storageBucket: "rechat-b0bac.appspot.com",
//     messagingSenderId: "835298170927",
//     appId: "1:835298170927:web:41bd98fe14f1d265e00eda"
// }).auth();

export default auth 