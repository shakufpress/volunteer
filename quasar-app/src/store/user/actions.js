export async function loginVolunteer ({ commit }, item) {
  await this.dispatch('volunteers/all')
  const obj = this.getters['volunteers/getEmail'](item.email)
  if (obj) {
    commit('loginVolunteer', obj)
  }
  return !!obj
}

export async function loginAdmin ({ commit }, item) {
  await this.dispatch('managers/all')
  const obj = this.getters['managers/getEmail'](item.username)
  if (obj) {
    commit('loginAdmin', obj)
  }
  return !!obj
}

export async function logout ({ commit }) {
  commit('logout')
}
