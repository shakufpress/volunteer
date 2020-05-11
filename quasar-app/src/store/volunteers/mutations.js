import { getVolunteer } from './getters'

export const editVolunteer = (state, { newValue, columns }) => {
  const v = getVolunteer(state)(newValue.id)
  columns.forEach(c => { v[c.name] = newValue[c.name] })
}
