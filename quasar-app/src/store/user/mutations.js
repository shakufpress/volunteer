const login = (state, user, role) => {
  state.id = user.id || user.uid
  state.email = user.email
  state.full_name = user.full_name || user.email
  state.role = role
}

export const loginVolunteer = (state, volunteer) => {
  login(state, volunteer, 'volunteer')
}

export const loginAdmin = (state, admin) => {
  login(state, admin, 'admin')
}

export const logout = (state) => {
  state.id = null
  state.email = ''
  state.full_name = ''
  state.role = ''
}
