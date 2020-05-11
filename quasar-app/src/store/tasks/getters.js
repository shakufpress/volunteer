export function getTask (state) {
  return taskId => state.data.filter(({ id }) => id === taskId)[0]
}
