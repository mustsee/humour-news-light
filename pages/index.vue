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
import LinkItem from "/components/Link.vue";
import { firedB } from '/plugins/firebase.js'

export default {
  components: {
    Link: LinkItem
  },
  data() {
    return {
      currentVideo: "",
      error: null,
      videoPlayerBottom: true
    };
  },
  async asyncData() {
    try {
      const collection = await firedB.collection('links').orderBy('published_at', 'desc').limit(30).get()
      let links = []
      collection.forEach(doc => {
        links.push(doc.data())
      })
      return { links }
    } catch (error) {
      this.error = true // TODO: handle in code
      console.log("Error getting documents: ", error);
    }
   
  },
  methods: {
    playVideo(url) {
      this.currentVideo = url;
    },
  },
};
</script>
