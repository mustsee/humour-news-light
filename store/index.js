import { fireAuth, fireDb } from '@/plugins/firebase.js'
import Vue from 'vue'

export const strict = false

export const state = () => ({
  user: null,
  votes: {}
})

export const mutations = {
  setUser(state, payload) {
    state.user = payload
  },
  setVotes(state, payload) {
    state.votes = payload
  },
}

export const actions = {
  signOut({ commit }) {
    fireAuth
      .signOut()
      .then(() => {
        commit('setUser', null)
        commit('setVotes', {})
      })
      .catch(err => alert(err))
  },
  getUserInfos({ commit }, user) {
    const userRef = fireDb.collection('users').doc(user.email)
    userRef.get().then(doc => {
      const data = doc.data();
      if (data.votes) commit('setVotes', data.votes)
    })
  }
  
}