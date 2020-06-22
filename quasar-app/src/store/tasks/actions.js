import mapSpecialtiesOptions from '../../utils/mapSpecialtiesOptions'
import * as api from '../../utils/api/api'
const storeName = 'projects'
const statusStoreName = 'status'

export async function all ({ commit }) {
  const items = await api.all(storeName)
  commit('setAll', { items: items.map(mapFromServer) })
}

export async function add ({ dispatch }, item) {
  await api.add(storeName, mapToServer(item))
  dispatch('all')
}

export async function update ({ dispatch }, item) {
  for (const v of item.volunteers) {
    await api.update(statusStoreName, {
      id: v.statusId,
      status: v.statusObj?.value,
      volunteer: v.id,
      project: item.id
    })
  }
  await api.update(storeName, mapToServer(item))
  dispatch('all')
}

const mapToServer = task => {
  return {
    ...task,
    status: task.statusObj?.value,
    categories: task.categories.map(s => s.id),
    volunteers: []
  }
}

const mapFromServer = task => {
  return {
    ...task,
    volunteers: task.volunteers.map(({ volunteer, status, id }) => ({ status, id: volunteer, statusId: id })),
    categories: task.categories.map(mapSpecialtiesOptions)
  }
}

export async function joinVolunteer (state, { taskId, volunteer }) {
  const v = { ...(state.getters.getTask(taskId)) }
  const exists = v.volunteers.filter(({ id }) => id === volunteer.id).length
  if (!exists) {
    await api.add(statusStoreName, {
      status: 0,
      volunteer: volunteer.id,
      project: taskId
    })
    v.volunteers = [] // we don't need to update the status of existing volunteers to the server
    await update(state, v)
  }
}
