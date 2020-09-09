import 'firebaseui/dist/firebaseui.css';
import store from '../store/index';

const firebase = require('firebase/app');

import 'firebase/analytics';
import 'firebase/storage';
import 'firebase/database';
import 'firebase/auth';

var firebaseConfig = {
  apiKey: "AIzaSyB-DcuNJi9VdKVwl_ECMWx5nqz7Id1zsu0",
  authDomain: "deliv-a2cd9.firebaseapp.com",
  databaseURL: "https://deliv-a2cd9.firebaseio.com",
  projectId: "deliv-a2cd9",
  storageBucket: "deliv-a2cd9.appspot.com",
  messagingSenderId: "714936426333",
  appId: "1:714936426333:web:a338c3b775885c2c6052b4",
  measurementId: "G-N8DX4PKDTR"
};

firebase.initializeApp(firebaseConfig);

const analytics = firebase.analytics();
const database = firebase.database()

// Set the user if they show up!
firebase.auth().onAuthStateChanged(user => {
  store.dispatch('fetchUser', user);
});

export {
  firebase,
  analytics,
  database
};