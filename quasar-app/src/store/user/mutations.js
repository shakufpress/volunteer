export const updateRole = (state, role) => {
  state.role = role
}

export const loginVolunteer = (state, volunteer) => {
  state.id = volunteer.id
  state.email = volunteer.email
  state.full_name = volunteer.full_name
}
