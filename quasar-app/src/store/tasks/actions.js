
import * as api from '../../utils/api/api'
const store_name = 'project';
const status_store_name = 'status'

export async function all({ commit }) {
  const items = await api.all(store_name)
  commit('setAll', { items: items.map(mapFromServer) });
}

export async function add({ commit }, item) {
  const update_obj = await api.add(store_name, mapToServer(item));
  commit('add', mapFromServer(update_obj));
}

export async function update({ commit }, item) {
  const update_obj = await api.update(store_name, mapToServer(item));
  await item.volunteers.forEach(async v => {
    await api.update(status_store_name, {
      id: v.statusId,
      status: v.statusObj?.value,
      volunteer: v.id,
      project: item.id
    })
  })
  commit('update', mapFromServer(update_obj));
}

const mapToServer = task => {
  return {
    ...task,
    manager: task.manager?.id,
    status: task.statusObj?.value,
    categories: [], // TODO: remove after implementing categories in the UI,
    volunteers: undefined
  }
}

const mapFromServer = task => {
  return {
    ...task,
    managerId: task.manager?.id,
    phone: task.manager?.phone,
    email: task.manager?.email,
    volunteers: task.volunteers.map(({volunteer, status, id}) => ({ status, id: volunteer, statusId: id }))
  }
}

export async function joinVolunteer (state, { taskId, volunteer }) {
  const v = { ...(state.getters.getTask(taskId)) }
  const exists = v.volunteers.filter(({ id }) => id === volunteer.id).length
  if (!exists) {
    await api.add(status_store_name, {
      status: 0,
      volunteer: volunteer.id,
      project: taskId
    })
    await all(state)
  }
}