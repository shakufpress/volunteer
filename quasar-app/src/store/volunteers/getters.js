export function getVolunteer (state) {
  return volunteerId => state.data.filter(({ id }) => id === volunteerId)[0]
}
