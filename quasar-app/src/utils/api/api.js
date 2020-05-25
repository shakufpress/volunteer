import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:1337',
});

/**
 * Returns all data
 */
async function all(store_name) {
    const { data } = await instance.get(`${store_name}/`);
    return data;
}


/**
 *
 * @param {int} id item id
 * Returns the item with id == id
 */
async function get(store_name, id) {
    const { data } = await instance.get(`${store_name}/${id}`);
    return data;
}


/**
 * Send add request to the item api
 * @param {item} item object
 * Returns the item after adding to the server
 */
async function add(store_name, item) {
    const { data } = await instance.post(`${store_name}`, item);
    return data;
}


/**
 * Update item data
 * @param {item} item item with id and update data
 * Returns the item after update
 */
async function update(store_name, item) {
    const { data } = await instance.put(`${store_name}/${item.id}`, item);
    return data;
}

export {
    all, get, add, update
}