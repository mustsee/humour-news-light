<template>
  <div class="main">
    <figure 
      v-if="this.currentVideo" 
      :class="`fixed right-0 ${videoPlayerBottom ? 'bottom-0' : 'top-0'}`"
    >
      <figcaption 
        @click="videoPlayerBottom = !videoPlayerBottom" 
        class="bg-gray-800 text-white text-center cursor-pointer"
      >
        move window to {{ videoPlayerBottom ? 'top' : 'bottom' }}
      </figcaption>
      <iframe width="356" height="200" :src="currentVideo + '?autoplay=1&&enablejsapi=1'" allow="autoplay" frameborder="0"></iframe>
      <figcaption @click="currentVideo=''" class="bg-gray-800 text-white text-center cursor-pointer">close video</figcaption>
    </figure>
    <div v-for="(link, i) in links" :key="i">
      <Link 
        :link="link" 
        :index="i + 1" 
        :playVideo="playVideo" 
        :stopVideo="() => currentVideo=''" 
        :currentVideoPlaying="currentVideo" 
      />
    </div>
  </div>
</template>

<script>
import { firedB } from '/plugins/firebase.js'

export default {
  data() {
    return {
      currentVideo: "",
      links: [],
      error: null,
      videoPlayerBottom: true
    };
  },
  methods: {
    playVideo(url) {
      this.currentVideo = url;
    },
    loadLinks() {
      firedB.collection('links')
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
