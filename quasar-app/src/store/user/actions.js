import firebaseService from '../../services/firebase'

export async function auth({ commit, state: { role, id } }) {
  const user = firebaseService.getUser()
  if (user) {
    commit('loginAdmin', user)
  } else if (!(role === 'volunteer' && !!id)) {
    commit('logout')
  }
}

export async function loginVolunteer ({ commit }, item) {
  await this.dispatch('volunteers/all')
  const obj = this.getters['volunteers/getEmail'](item.email)
  if (obj) {
    commit('loginVolunteer', obj)
  }
  return !!obj
}

export async function loginAdmin ({ commit }, { username, password }) {
  try {
    const { user } = await firebaseService.login(username, password)
    if (user) {
      commit('loginAdmin', user)
    }
    return !!user
  } catch(ex) {
    // invalid signup
    return false
  }
}

export async function logout ({ commit }) {
  await firebaseService.logout()
  commit('logout')
}
