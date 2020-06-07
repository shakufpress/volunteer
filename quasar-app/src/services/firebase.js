import * as firebase from 'firebase/app';
import 'firebase/auth';

function init(firebaseConfig) {
  firebase.initializeApp(firebaseConfig);
}

function auth(cb) {
  firebase.auth().onAuthStateChanged(cb)
}

async function login(email, password) {
  return await firebase.auth().signInWithEmailAndPassword(email, password)
}

async function logout() {
  await firebase.auth().signOut()
}

function getUser() {
  return firebase.auth().currentUser
}

export default {
  init,
  auth,
  login,
  logout,
  getUser
}
