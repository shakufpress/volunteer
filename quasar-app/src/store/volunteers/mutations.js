import { getId } from './getters'

export const setAll = (state, { items }) => {
  state.data = items
}

export const add = (state, item) => {
  state.data = [...state.data, item]
}

export const update = (state, item) => {
  state.data = state.data.map(el => {
    if (el.id === item.id) {
      return item
    } else {
      return el
    }
  })
}
