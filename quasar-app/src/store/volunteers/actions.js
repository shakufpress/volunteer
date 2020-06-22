import mapSpecialtiesOptions from '../../utils/mapSpecialtiesOptions'
import * as api from '../../utils/api/api'
const storeName = 'volunteers'

export async function all ({ rootState, commit, dispatch }) {
  await dispatch('specialties/all', {}, { root: true })
  let items = await api.all(storeName)
  commit('setAll', { items: items.map(mapFromServer(rootState.specialties.data)) })
}

export async function add ({ dispatch }, item) {
  await api.add(storeName, mapToServer(item))
  dispatch('all')
}

export async function update ({ dispatch }, item) {
  await api.update(storeName, mapToServer(item))
  dispatch('all')
}

function mapFromServer (specialties) {
  return (volunteer) => {
    const vol_specialties = volunteer.specialties.map(spec => {
      return specialties.find(el => el.id == spec);
    });
    return { ...volunteer, specialties: vol_specialties.map(mapSpecialtiesOptions) }
  }
}

function mapToServer (volunteer) {
  return { ...volunteer, specialties: volunteer.specialties.map(s => s.id) }
}
