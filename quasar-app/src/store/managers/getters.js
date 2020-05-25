export function getEmail (state) {
  return adminEmail => state.data.filter(({ email }) => email === adminEmail)[0]
}
