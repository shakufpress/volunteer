
import * as api from '../../utils/api/api'
const store_name = 'volunteer';

export async function all({ commit }) {
  const items = await api.all(store_name)
  commit('setAll', { items });
}

export async function add({ commit }, item) {
  const update_obj = await api.add(store_name, mapToServer(item));
  commit('add', update_obj);
}

export async function update({ commit }, item) {
  const update_obj = await api.update(store_name, mapToServer(item));
  commit('update', update_obj);
}

function mapToServer(volunteer)
{
  volunteer.specialties = volunteer.specialties.map(s => s.id);
  return volunteer;
}