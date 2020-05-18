
import * as api from '../../utils/api/api'
const store_name = 'volunteer';

export async function all({ commit }) {
  const items = await api.all(store_name)
  commit('setAll', { items });
}

export async function add({ commit }, item) {
  const update_obj = await api.add(store_name, item);
  commit('add', update_obj);
}

export async function update({ commit }, item) {
  const update_obj = await api.update(store_name, item);
  commit('update', update_obj);
}
