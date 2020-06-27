import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBwpH3VmoUM8u-K5VqoILo1IAH8Q8mruQU",
    authDomain: "air-quality-monitoring-46f28.firebaseapp.com",
    databaseURL: "https://air-quality-monitoring-46f28.firebaseio.com",
    projectId: "air-quality-monitoring-46f28",
    storageBucket: "air-quality-monitoring-46f28.appspot.com",
    messagingSenderId: "794593332188",
    appId: "1:794593332188:web:4746b845511babd6ad1d19",
    measurementId: "G-4SS9FDXR9M"
};

if (!firebase.apps.length) {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
}


export default firebaseConfig;