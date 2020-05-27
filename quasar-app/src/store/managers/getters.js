export function getEmail (state) {
  return adminEmail => state.data.filter(({ email }) => email === adminEmail)[0]
}

export function getId (state) {
  return adminId => state.data.filter(({ id }) => id === adminId)[0]
}
