import axios from 'axios'

// this is the firebase token of the current user.
// we send it to the server. The server should verify it with firebase:
// https://firebase.google.com/docs/auth/admin/verify-id-tokens#verify_id_tokens_using_the_firebase_admin_sdk
import firebaseService from '../../services/firebase'

const instance = axios.create({
  baseURL: 'http://localhost:1337'
})

async function getConfig() {
  const firebaseToken = await firebaseService.getIdToken()
  return {
    headers: {
      firebaseToken
    }
  }
}

/**
 * Returns all data
 */
async function all (storeName) {
  const { data } = await instance.get(`${storeName}/`, await getConfig())
  return data
}

/**
 *
 * @param {int} id item id
 * Returns the item with id == id
 */
async function get (storeName, id) {
  const { data } = await instance.get(`${storeName}/${id}`, await getConfig())
  return data
}

/**
 * Send add request to the item api
 * @param {item} item object
 * Returns the item after adding to the server
 */
async function add (storeName, item) {
  const { data } = await instance.post(`${storeName}`, item, await getConfig())
  return data
}

/**
 * Update item data
 * @param {item} item item with id and update data
 * Returns the item after update
 */
async function update (storeName, item) {
  const { data } = await instance.put(`${storeName}/${item.id}`, item, await getConfig())
  return data
}

export {
  all, get, add, update
}
