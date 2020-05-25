function getId (state) {
  return volunteerId => state.data.filter(({ id }) => id === volunteerId)[0]
}

function getEmail (state) {
  return volunteerEmail => state.data.filter(({ email }) => email === volunteerEmail)[0]
}

export {
  getId,
  getEmail
}
