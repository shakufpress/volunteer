import Vue from 'vue'
import Vuex from 'vuex'

// we first import the module
import user from './user'
import managers from './managers'
import specialties from './specialties'
import tasks from './tasks'
import volunteers from './volunteers'

Vue.use(Vuex)

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      // then we reference it
      user,
      managers,
      specialties,
      tasks,
      volunteers
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  /*
    if we want some HMR magic for it, we handle
    the hot update like below. Notice we guard this
    code with "process.env.DEV" -- so this doesn't
    get into our production build (and it shouldn't).
  */

  if (process.env.DEV && module.hot) {
    module.hot.accept(['./user'], () => {
      const newUser = require('./user').default
      Store.hotUpdate({ modules: { user: newUser } })
    })
    module.hot.accept(['./managers'], () => {
      const newManagers = require('./managers').default
      Store.hotUpdate({ modules: { managers: newManagers } })
    })
    module.hot.accept(['./specialties'], () => {
      const newSpecialties = require('./specialties').default
      Store.hotUpdate({ modules: { specialties: newSpecialties } })
    })
    module.hot.accept(['./tasks'], () => {
      const newTasks = require('./tasks').default
      Store.hotUpdate({ modules: { tasks: newTasks } })
    })
    module.hot.accept(['./volunteers'], () => {
      const newVolunteers = require('./volunteers').default
      Store.hotUpdate({ modules: { volunteers: newVolunteers } })
    })
  }

  return Store
}
