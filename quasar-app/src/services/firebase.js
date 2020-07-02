import * as firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/functions'

const firestoreDb = {}

function init (firebaseConfig) {
  firestoreDb.db = firebase
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
  return firestoreDb.db
}

function functions () {
  return firebase.functions()
}

export default {
  init,
  auth,
  login,
  logout,
  getUser,
  getIdToken,
  db,
  functions
}
