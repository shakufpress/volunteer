import * as firebase from 'firebase/app'
import * as firestore from 'firebase/firestore'
import 'firebase/auth'

const firestore_db = {}

function init (firebaseConfig) {
  firestore_db.db = firebase
          .initializeApp(firebaseConfig)
          .firestore()
}

function auth (cb) {
  firebase.auth().onAuthStateChanged(cb)
}

async function login (email, password) {
  return await firebase.auth().signInWithEmailAndPassword(email, password)
}

async function logout () {
  await firebase.auth().signOut()
}

function getUser () {
  return firebase.auth().currentUser
}

async function getIdToken () {
  return await getUser()?.getIdToken(/* forceRefresh */ true)
}

function db () {
  return firestore_db.db;
}

export default {
  init,
  auth,
  login,
  logout,
  getUser,
  getIdToken,
  db,
}
