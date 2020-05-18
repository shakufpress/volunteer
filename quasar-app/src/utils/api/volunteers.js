import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:1337/volunteer',
});

/**
 * Returns all data
 */
async function all() {
    const { data } = await instance.get("/");
    return data;
}


/**
 *
 * @param {int} id volunteer id
 * Returns the volunteer with id == id
 */
async function get(id) {
    const { data } = await instance.get("/id");
    return data;
}


/**
 * Send add request to the volunteer api
 * @param {volunteer} volunteer object
 * Returns the volunteer after adding to the server
 */
async function add(volunteer) {
    const { data } = await instance.post("/id", volunteer);
    return data;
}


/**
 * Update volunteer data
 * @param {volunteer} volunteer volunteer with id and update data
 * Returns the volunteer after update
 */
async function update(volunteer) {
    const { data } = await instance.post("/id", volunteer);
    return data;
}

export {
    all, get, add, update
}