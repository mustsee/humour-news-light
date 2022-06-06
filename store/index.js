import { fireAuth, fireDb, increment } from '@/plugins/firebase.js'
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
  },
  upvote({ commit, state }, videoId) {
    const user = state.user
    const userRef = fireDb.collection('users').doc(user.email)
    const videoRef = fireDb.collection('links').doc(videoId);
    videoRef.update({ points: increment(1)}).then(() => {
      userRef.get().then(doc => {
        let data = doc.data()
        if (!data.votes) data.votes = {}
        data.votes[videoId] = true
        userRef.update({ votes: data.votes }).then(() => {
          commit('setVotes', data.votes)
        }).catch(e => console.log('upvote userRef update', e))
      })
    }).catch(e => console.log('upvote videoRef update', e))
  },
  unvote({ commit, state }, videoId) {
    const { user, votes } = state
    delete votes[videoId]
    const userRef = fireDb.collection('users').doc(user.email)
    const videoRef = fireDb.collection('links').doc(videoId);
    userRef.update({ votes }).then(() => {
      videoRef.update({ points: increment(-1)}).catch(e => console.log('handleUnvote videoRef update', e))
      commit('setVotes', Object.assign({}, votes))
    }).catch(e => console.log('handleUnvote userRef update', e))
  }
  
}