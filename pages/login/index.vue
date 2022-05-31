<template>
  <div class="main">
    <div class="h-2"></div>
      <div id="firebaseui-auth-container"></div>
  </div>
</template>

<script>
import { fireAuth, authProviders  } from '/plugins/firebase.js'

export default {
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
          signInSuccessWithAuthResult: this.signInResult
        }
      }
      ui.start('#firebaseui-auth-container', config)
    },
    signInResult() {
      this.$router.push({ path: '/'})
      return false
    }
  },
  mounted() {
    this.showAuthContainer()
  }
}
</script>

<style src="~/node_modules/firebaseui/dist/firebaseui.css"></style>
