import mapSpecialtiesOptions from '../../utils/mapSpecialtiesOptions'
import * as api from '../../utils/api/api'
const storeName = 'volunteers'

export async function all ({ rootState, commit }) {
  await this.dispatch('specialties/all')
  let items = await api.all(storeName)
  items = items.map(item => {
    const specialties = item.specialties.map(spec => {
      return rootState.specialties.data.find(el => el.id == spec);
    });
    return {
      ...item,
      specialties: specialties,
    }
  })
  commit('setAll', { items: items.map(mapFromServer) })
}

export async function add ({ commit }, item) {
  const updateObj = await api.add(storeName, mapToServer(item))
  commit('add', updateObj)
}

export async function update ({ commit }, item) {
  const updateObj = await api.update(storeName, mapToServer(item))
  commit('update', updateObj)
}

function mapFromServer (volunteer) {
  return { ...volunteer, specialties: volunteer.specialties.map(mapSpecialtiesOptions) }
}

function mapToServer (volunteer) {
  return { ...volunteer, specialties: volunteer.specialties.map(s => s.id), projects: [] }
}
