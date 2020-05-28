import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:1337'
})

/**
 * Returns all data
 */
async function all (storeName) {
  const { data } = await instance.get(`${storeName}/`)
  return data
}

/**
 *
 * @param {int} id item id
 * Returns the item with id == id
 */
async function get (storeName, id) {
  const { data } = await instance.get(`${storeName}/${id}`)
  return data
}

/**
 * Send add request to the item api
 * @param {item} item object
 * Returns the item after adding to the server
 */
async function add (storeName, item) {
  const { data } = await instance.post(`${storeName}`, item)
  return data
}

/**
 * Update item data
 * @param {item} item item with id and update data
 * Returns the item after update
 */
async function update (storeName, item) {
  const { data } = await instance.put(`${storeName}/${item.id}`, item)
  return data
}

export {
  all, get, add, update
}
