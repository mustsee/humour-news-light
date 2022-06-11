import { fireAuth, fireDb, increment } from '@/plugins/firebase.js'

export const strict = false

export const state = () => ({
  links: [],
  user: null,
  votes: {},
  isVoting: false,
})

export const mutations = {
  setLinks(state, payload) {
    state.links = payload
  },
  setUser(state, payload) {
    state.user = payload
  },
  setVotes(state, payload) {
    state.votes = payload
  },
  setVideoPoints(state, { upvote, videoId }) {
    const updatedLinks = state.links.map(link => {
      if (link.videoId === videoId) {
        if (upvote) link.points += 1
        else link.points -= 1
      }
      return link
    })
    state.links = updatedLinks
  },
  setIsVoting(state, payload) {
    state.isVoting = payload
  }
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
  getLinks({ commit }) {
    fireDb.collection('links')
        .orderBy('score', 'desc')
        .limit(30)
        .get()
        .then((querySnapshot) => {
          let res = []
          querySnapshot.forEach((doc) => {
            res.push(doc.data())
          });
          commit('setLinks', res)
        }).catch((e) => console.log("getLinks error: ", e));
  },
  getUserInfos({ commit }, user) {
    const userRef = fireDb.collection('users').doc(user.email)
    userRef.get().then(doc => {
      const data = doc.data();
      if (data.votes) commit('setVotes', data.votes)
    })
  },
  // Ne pas attendre la confirmation firebase pour upvoter
  // Pas assez rapide au niveau de l'UI
  upvote({ commit, state }, videoId) {
    if (state.isVoting) return
    commit('setIsVoting', true)
    const user = state.user
    const userRef = fireDb.collection('users').doc(user.email)
    const videoRef = fireDb.collection('links').doc(videoId);
    userRef.get().then(doc => {
      let data = doc.data()
      if (!data.votes) data.votes = {}
      // Use case : when someone votes not logged in
      // When redirecting to homepage and when upvoting
      // Make sure the user didn't vote previously for the video !
      if(data.votes[videoId]) return
      data.votes[videoId] = true
      userRef.update({ votes: data.votes }).then(() => {
        commit('setVotes', data.votes)
        commit('setIsVoting', false)
        videoRef.update({ points: increment(1)}).then(() => {
          commit('setVideoPoints', { 'upvote': true, videoId })
        }).catch(e => {
          commit('setIsVoting', false)
          console.log('upvote videoRef update', e)
        })
      }).catch(e => {
        commit('setIsVoting', false)
        console.log('upvote userRef update', e)
      } )
    }).catch(e => {
      commit('setIsVoting', false)
      console.log('upvote userRef get', e)
    })
  },
  // Même remarque que pour l'action upvote
  unvote({ commit, state }, videoId) {
    if (state.isVoting) return
    const { user, votes } = state
    delete votes[videoId]
    const userRef = fireDb.collection('users').doc(user.email)
    const videoRef = fireDb.collection('links').doc(videoId);
    userRef.update({ votes }).then(() => {
      videoRef.update({ points: increment(-1)}).catch(e => console.log('handleUnvote videoRef update', e))
      commit('setVotes', Object.assign({}, votes))
      commit('setIsVoting', false)
      commit('setVideoPoints', { 'upvote': false, videoId})
    }).catch(e => {
      commit('setIsVoting', false)
      console.log('handleUnvote userRef update', e)
    })
  }
  
}