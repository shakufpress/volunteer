import mapSpecialtiesOptions from '../../utils/mapSpecialtiesOptions'
import * as api from '../../utils/api/api'
const storeName = 'projects'
const statusStoreName = 'projectsRequestStatuses'

export async function all ({ commit, dispatch, rootState }) {
  await dispatch('specialties/all', {}, { root: true })
  let statuses
  if (rootState.user.role === 'admin') {
    statuses = await api.all(statusStoreName)
  } else {
    statuses = await api.query(statusStoreName, 'volunteer', '==', rootState.user.id)
  }
  const items = await api.all(storeName)
  commit('setAll', { items: items.map(mapFromServer(rootState.specialties.data, statuses)) })
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
  const t = {
    ...task,
    status: task.statusObj?.value,
    categories: task.categories.map(s => s.id)
  }
  delete t.statusObj
  delete t.statusStr
  delete t.volunteers
  return t
}

const mapFromServer = (specialties, statuses) => (task) => {
  const specs = task.categories.map(spec => {
    return specialties.find(el => el.id === spec)
  })

  const projVolStats = statuses.filter(s => s.project === task.id)
  return {
    ...task,
    volunteers: projVolStats.map(({ volunteer, status, id }) => ({ status, id: volunteer, statusId: id })),
    categories: specs.map(mapSpecialtiesOptions)
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
    await state.dispatch('all')
  }
}
