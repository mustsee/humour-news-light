<template>
  <div class="main">
    <figure v-if="this.currentVideo" class="fixed bottom-0 right-0">
      <iframe width="356" height="200" :src="currentVideo + '?autoplay=1&&enablejsapi=1'" allow="autoplay" frameborder="0"></iframe>
      <figcaption @click="currentVideo=''" class="bg-gray-800 text-white text-center cursor-pointer">close video</figcaption>
    </figure>
    <div v-for="(link, i) in links" :key="i">
      <Link :link="link" :index="i + 1" :playVideo="playVideo" />
    </div>
  </div>
</template>

<script>
import LinkItem from "/components/Link.vue";
import db from '/plugins/firebase.js'

export default {
  components: {
    Link: LinkItem
  },
  data() {
    return {
      currentVideo: "",
      links: [],
      error: null
    };
  },
  methods: {
    playVideo(url) {
      this.currentVideo = url;
    },
    loadLinks() {
      db.collection('links')
        .orderBy('published_at', 'desc')
        .limit(30)
        .get()
        .then((querySnapshot) => {
          let res = []
          querySnapshot.forEach((doc) => {
            res.push(doc.data())
          });
          this.links = res
        }).catch((error) => {
          this.error = true // TODO: handle in code
          console.log("Error getting documents: ", error);
        });
    },
  },
  async mounted() {
    this.loadLinks() // Put this API call to make it SSR
  }
};
</script>
