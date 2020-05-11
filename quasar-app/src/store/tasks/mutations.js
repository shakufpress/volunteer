import { getTask } from './getters'

const mapRow = task => {
  task.managerId = task.manager.id
  task.status = task.statusObj.value
  task.volunteers.forEach(v => { v.status = v.statusObj.value })
}

export const addTask = (state, newTask) => {
  newTask.id = state.data.length + 1
  mapRow(newTask)
  state.data.push(newTask)
}

export const editTask = (state, { newValue, columns }) => {
  mapRow(newValue)

  const v = getTask(state)(newValue.id)
  columns.forEach(({ field }) => { v[field] = newValue[field] })
  v.managerId = newValue.managerId
  v.status = newValue.status
  v.volunteers = newValue.volunteers
}

export const joinVolunteer = (state, { task, volunteer }) => {
  mapRow(task)

  const v = getTask(state)(task.id)
  const exists = v.volunteers.filter(({ id }) => id === volunteer.id).length
  if (!exists) {
    v.volunteers.push({
      id: volunteer.id,
      email: volunteer.email,
      full_name: volunteer.full_name,
      status: 0
    })
  }
}
