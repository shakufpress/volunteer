export default async function (store) {
  await store.dispatch('user/auth')
  return store.state.user
}