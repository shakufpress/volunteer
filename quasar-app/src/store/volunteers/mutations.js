import { getVolunteer } from './getters'

const editVolunteer = (state, { newValue, columns }) => {
  const v = getVolunteer(state)(newValue.id)
  columns.forEach(({ field }) => { v[field] = newValue[field] })
}

const setAll = (state, { volunteers }) => {
  state.data = volunteers;
}

export {
  editVolunteer,
  setAll,
}
