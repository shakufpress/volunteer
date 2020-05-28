
import * as api from '../../utils/api/api'
const storeName = 'admin'

export async function all ({ commit }) {
  const items = await api.all(storeName)
  commit('setAll', { items })
}

export async function add ({ commit }, item) {
  const updateObj = await api.add(storeName, item)
  commit('add', updateObj)
}

export async function update ({ commit }, item) {
  const updateObj = await api.update(storeName, item)
  commit('update', updateObj)
}
