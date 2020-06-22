import axios from 'axios'

// this is the firebase token of the current user.
// we send it to the server. The server should verify it with firebase:
// https://firebase.google.com/docs/auth/admin/verify-id-tokens#verify_id_tokens_using_the_firebase_admin_sdk
import firebaseService from '../../services/firebase'

/**
 * Returns all data
 */
async function all (storeName) {
  const data = []
  const snapshot = await firebaseService.db().collection(storeName).get()
  snapshot.forEach(doc => {
    data.push({
      id: doc.id,
      ...doc.data(),
    })
  })
  return data
}

/**
 *
 * @param {int} id item id
 * Returns the item with id == id
 */
async function get (storeName, id) {
  const doc = await firebaseService.db().collection(storeName).doc(id).get()
  return {
    id: doc.id,
    ...doc.data(),
  }
}

/**
 * Send add request to the item api
 * @param {item} item object
 * Returns the item after adding to the server
 */
async function add (storeName, item) {
  const data = await firebaseService.db().collection(storeName).add(item)
  return data
}

/**
 * Update item data
 * @param {item} item item with id and update data
 * Returns the item after update
 */
async function update (storeName, item) {
  await firebaseService.db().collection(storeName).doc(item.id).update(item)
  return item
}

export {
  all, get, add, update
}
