
import { getTask } from './getters'
import * as api from '../../utils/api/api'
const store_name = 'project';

export async function all({ commit }) {
  const items = await api.all(store_name)
  items.map(el => {
    return {
      ...el,
      managerId: el.manager.id,
      phone: el.manager.phone,
      email: el.manager.email,
    }
  })
  commit('setAll', { items });
}

export async function add({ commit }, item) {
  const update_obj = await api.add(store_name, mapToServer(item));
  commit('add', mapFromServer(update_obj));
}

export async function update({ commit }, item) {
  const update_obj = await api.update(store_name, mapToServer(item));
  commit('update', mapFromServer(update_obj));
}

const mapToServer = task => {
  task.manager = task.manager?.id;
  task.status = task.statusObj?.value;
  task.categories = [];
  task.volunteers.forEach(v => { v.status = v.statusObj?.value })
  return task
}

const mapFromServer = task => {
  task.managerId = task.manager?.id
  return task
}

export async function joinVolunteer (state, { taskId, volunteer }) {
  const v = getTask(state)(taskId)
  const exists = v.volunteers.filter(({ id }) => id === volunteer.id).length
  if (!exists) {
    v.volunteers.push({
      id: volunteer.id,
      email: volunteer.email,
      full_name: volunteer.full_name,
      status: 0
    })
    return await update(state, v)
  }
}