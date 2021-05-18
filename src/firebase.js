// import firebase from "firebase";

// var firebaseConfig = {
//   apiKey: "AIzaSyDNuDfFHavCPi2cZdCyhF9fXynnVxwRcs0",
//   authDomain: "share-with-me-6d766.firebaseapp.com",
//   projectId: "share-with-me-6d766",
//   storageBucket: "share-with-me-6d766.appspot.com",
//   messagingSenderId: "1003893064578",
//   appId: "1:1003893064578:web:013ffc148b10c30743059b",
// };

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// const db = firebase.firestore();
// const auth = firebase.auth();
// export { auth };
// export { firebase };
// export default db;

import firebase from "firebase/app";
import "firebase/storage";
import "firebase/auth";
import "firebase/firestore";

const app = firebase.initializeApp({
  apiKey: "AIzaSyDNuDfFHavCPi2cZdCyhF9fXynnVxwRcs0",
  authDomain: "share-with-me-6d766.firebaseapp.com",
  projectId: "share-with-me-6d766",
  storageBucket: "share-with-me-6d766.appspot.com",
  messagingSenderId: "1003893064578",
  appId: "1:1003893064578:web:013ffc148b10c30743059b",
});
// const db = firebase.firestore();
export default app;
// const auth = firebase.auth();
// export { auth };
// export { firebase };
// export default db;
