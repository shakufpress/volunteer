import { getId } from './getters'

export const setAll = (state, { items }) => {
  state.data = items
}

export const add = (state, item) => {
  state.data = [...state.data, item]
}

export const update = (state, item) => {
  let found = false;
  state.data = state.data.map(el => {
    if (el.id === item.id) {
      found = true
      return item
    } else {
      return el
    }
  })

  return found
}

export const addOrUpdate = (state, { items }) => {
  items.forEach(item => {
    if (!update(state, item)) {
      add(state, item)
    }
  })
}
