<template>
  <div class="center md:pt-2">
    <header
      class="top h-10 md:w-10/12 md:mx-auto md:h-6 bg-light-blue leading-5 flex items-center justify-between"
    >
      <div class="left flex p-0.5">
        <div class="home flex">
          <div
            class="logo w-5 h-5 border border-gray-50 logo-color flex justify-center items-center font-black mr-1"
          >
            <nuxt-link :to="'/'">H</nuxt-link>
          </div>
          <div class="logo font-black">
            <nuxt-link :to="'/'">Humour News</nuxt-link>
          </div>
        </div>
      </div>
      <div class="right p-0.5">
         <template v-if="currentUser">
            <span class="mx-2">
              {{ currentUser.displayName }}
            </span>
            <span class="mx-2 underline focus:outline-none cursor-pointer" @click="handleLogout">
              logout
            </span>
        </template>
        <template v-else>
          <nuxt-link class="mx-2 underline focus:outline-none cursor-pointer" :to="'/login'">
            login
          </nuxt-link> 
        </template>
      </div>
    </header>

    <!-- Page Content -->
    <main class="bg-color-main md:w-10/12 md:mx-auto pb-3">
      <div class="h-3"></div>
      <Nuxt />
    </main>
  </div>
</template>

<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.user
    }
  },
  methods: {
    handleLogout() {
      this.$store.dispatch('signOut')
    }
  }
}
</script>

<style scoped>
.bg-color-main {
  background-color: #f7f6ef;
}

.bg-light-blue {
  background-color: #00bfff;
}

.logo-color {
  color: #f9fafb;
}
</style>
