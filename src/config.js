import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyACH1lu3BwIWILUshbdPli8lD62c5YKjV8",
    authDomain: "air-quality-monitoring-ispu.firebaseapp.com",
    databaseURL: "https://air-quality-monitoring-ispu.firebaseio.com",
    projectId: "air-quality-monitoring-ispu",
    storageBucket: "air-quality-monitoring-ispu.appspot.com",
    messagingSenderId: "934910939157",
    appId: "1:934910939157:web:90e6fb2c337fd3e4dafe1c",
    measurementId: "G-4MVKX6KMVG"
};

if (!firebase.apps.length) {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
}


export default firebaseConfig;