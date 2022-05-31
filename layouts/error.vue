<template>
  <div>
    <h1 v-if="error.statusCode === 404" class="text-center">Page not found</h1>
    <h1 v-else class="text-center">An error occurred</h1>
    <div class="flex justify-center">
      <NuxtLink to="/" class="underline">
        Home page
      </NuxtLink>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['error'],
    layout: 'error' // you can set a custom layout for the error page
  }
</script>