export const addTask = (state, newTask) => {
  state.data.push(newTask)
}

export const joinVolunteer = (state, { task, volunteer }) => {
  task.volunteers.push({
    id: volunteer.id,
    email: volunteer.email,
    full_name: volunteer.full_name,
    status: 0
  })
}
