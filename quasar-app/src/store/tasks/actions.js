
import * as api from '../../utils/api/api'
const store_name = 'project';

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

const mapRow = task => {
  task.managerId = task.manager?.id
  task.status = task.statusObj?.value
  task.volunteers.forEach(v => { v.status = v.statusObj?.value })
}

export const joinVolunteer = (state, { taskId, volunteer }) => {
  const v = getTask(state)(taskId)
  const exists = v.volunteers.filter(({ id }) => id === volunteer.id).length
  if (!exists) {
    v.volunteers.push({
      id: volunteer.id,
      email: volunteer.email,
      full_name: volunteer.full_name,
      status: 0
    })
  }
}
