import { fireAuth, fireDb, increment } from '@/plugins/firebase.js'

export const strict = false

export const state = () => ({
  links: [],
  user: null,
  votes: {}
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
        .orderBy('published_at', 'desc')
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
          commit('setVideoPoints', { 'upvote': true, videoId })
        }).catch(e => console.log('upvote userRef update', e))
      })
    }).catch(e => console.log('upvote videoRef update', e))
  },
  // Même remarque que ci-dessus
  unvote({ commit, state }, videoId) {
    const { user, votes } = state
    delete votes[videoId]
    const userRef = fireDb.collection('users').doc(user.email)
    const videoRef = fireDb.collection('links').doc(videoId);
    userRef.update({ votes }).then(() => {
      videoRef.update({ points: increment(-1)}).catch(e => console.log('handleUnvote videoRef update', e))
      commit('setVotes', Object.assign({}, votes))
      commit('setVideoPoints', { 'upvote': false, videoId})
    }).catch(e => console.log('handleUnvote userRef update', e))
  }
  
}