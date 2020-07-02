import mapSpecialtiesOptions from '../../utils/mapSpecialtiesOptions'
import * as api from '../../utils/api/api'
import firebaseService from '../../services/firebase'
const storeName = 'volunteers'

export async function all ({ rootState, commit, dispatch }, email) {
  await dispatch('specialties/all', {}, { root: true })
  let items
  if (rootState.user.role === 'admin') {
    items = await api.all(storeName)
  } else {
    const item = await getVolunteerByEmail(email || rootState.user.email)
    items = item ? [item] : []
  }
  commit('setAll', { items: items.map(mapFromServer(rootState.specialties.data)) })
}

async function getVolunteerByEmail(email) {
  const getVolunteerId = firebaseService.functions().httpsCallable('getVolunteerId')
  const id = await getVolunteerId({ email })
  if (id) {
    return await api.get(storeName, id)
  }
}

export async function add ({ dispatch }, item) {
  await api.add(storeName, mapToServer(item))
  dispatch('all')
}

export async function update ({ rootState, dispatch }, item) {
  if (item.email !== rootState.user.email) {
    // updating the volunteer email - make sure there isn't another volunteer with the same email
    v = await getVolunteerByEmail(item.email)
    if (v && v.length) {
      throw new Error('The provided email already exists')
    }
  }
  await api.update(storeName, mapToServer(item))
  dispatch('all')
}

function mapFromServer (specialties) {
  return (volunteer) => {
    const volSpecialties = volunteer.specialties.map(spec => {
      return specialties.find(el => el.id === spec)
    })
    return { ...volunteer, specialties: volSpecialties.map(mapSpecialtiesOptions) }
  }
}

function mapToServer (volunteer) {
  const v = { ...volunteer, specialties: volunteer.specialties.map(s => s.id) }
  delete v.projects
  return v
}
