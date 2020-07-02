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
  const { data: id } = await getVolunteerId({ email })
  if (id) {
    return await api.get(storeName, id)
  }
}

export async function add ({ dispatch }, item) {
  await api.add(storeName, mapToServer(item))
  dispatch('all')
}

export async function update ({ rootState, dispatch }, item) {
  // if updating the volunteer email - make sure there isn't another volunteer with the same email
  const v = await getVolunteerByEmail(item.email)
  if (v && v.id !== item.id) {
    throw new Error('The provided email already exists. Update failed.')
  }

  await api.update(storeName, mapToServer(item))
  await dispatch('all')
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
