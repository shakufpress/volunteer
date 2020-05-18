
import * as volunteersApi from '../../utils/api/volunteers'

async function all({ commit }) {
  const volunteers = await volunteersApi.all()
  console.table(volunteers)
  commit('setAll', { volunteers });
}

export {
  all,
}

