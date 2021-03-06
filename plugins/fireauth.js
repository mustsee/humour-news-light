import { fireAuth } from '@/plugins/firebase.js'

export default context => {
  const { store } = context

  return new Promise((resolve) => {
    fireAuth.onAuthStateChanged(user => {
      store.commit('setUser', user)
      if (user) {
        store.dispatch('getUserInfos', user)
      }
      resolve()
    })
  })
}