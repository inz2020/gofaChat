import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';


const auth= firebase.initializeApp({

  apiKey: "AIzaSyCsh1ZV_DYBTLWTugGpZifAUO1wghIQ4Zk",
  authDomain: "gofachat.firebaseapp.com",
  projectId: "gofachat",
  storageBucket: "gofachat.appspot.com",
  messagingSenderId: "338943327097",
  appId: "1:338943327097:web:c5245e68736bd6d1070da8"


}).auth();

export default auth;