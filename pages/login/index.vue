<template>
  <div class="main">
    <div class="h-2"></div>
      <div class="text-center">{{ loginPageMessage }}</div>
      <div id="firebaseui-auth-container"></div>
  </div>
</template>

<script>
import { fireAuth, fireDb, authProviders  } from '/plugins/firebase.js'

export default {
  computed: {
    loginPageMessage() {
      const { action } = this.$route.params
      if (!action) return null
      else return `You have to be logged in to ${action}.`
    }
  },
  // Remove access to this page if user is logged
  methods: {
    showAuthContainer() {
      const firebaseui = require('firebaseui')
      let ui = firebaseui.auth.AuthUI.getInstance()
      if (!ui) {
        ui = new firebaseui.auth.AuthUI(fireAuth)
      }
      const config = {
        signInOptions: [authProviders.Google],
        signInFlow: 'popup',
        callbacks: {
          signInSuccessWithAuthResult: (authResult) => this.signInResult(authResult)
        }
      }
      ui.start('#firebaseui-auth-container', config)
    },
    signInResult(authResult) {
      const { email, displayName } = authResult.user
      // Comment faire pour gérer un souci de firebase ? catch and ?
      fireDb.collection("users").doc(email).set({ email, displayName }, { merge: true })
      this.$router.push({ path: '/'})
      return false
    }
  },
  activated() {
    this.showAuthContainer()
  },
  mounted() {
    this.showAuthContainer()
  }
}
</script>

<style src="~/node_modules/firebaseui/dist/firebaseui.css"></style>
