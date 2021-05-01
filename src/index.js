import ReactDOM from 'react-dom';
import App from './App';
import "./App.css"

import firebase from 'firebase/app';
import 'firebase/firestore';

  firebase.initializeApp({
    apiKey: "AIzaSyAcFApq2wB6RH_OoSKWZUCvc06ZreknUNw",
    authDomain: "evernote-clone-e2901.firebaseapp.com",
    databaseURL: "https://evernote-clone-e2901-default-rtdb.firebaseio.com",
    projectId: "evernote-clone-e2901",
    storageBucket: "evernote-clone-e2901.appspot.com",
    messagingSenderId: "1046755296428",
    appId: "1:1046755296428:web:0702255e4173816a24cb09",
    measurementId: "G-H8JENFN3YP"
  });

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);