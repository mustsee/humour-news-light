<template>
  <div class="item mx-2 mb-1">
    <div class="first-line flex">
<!--       <div
        v-if="link.videoId != currentVideoPlaying" 
        @click="playVideo(link.videoId)"
        class="w-6 h-6 flex justify-center items-center text-gray-600 cursor-pointer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="h-4">
          <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3 18v-12l10 6-10 6z"/>
        </svg>
      </div>
      <div
        v-else 
        @click="stopVideo"
        class="w-6 h-6 flex justify-center items-center text-gray-600 cursor-pointer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="h-4">
          <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5 17h-10v-10h10v10z"/>
        </svg>
      </div> -->
      <div class="rank info-color w-5 mr-1 text-right">
        {{ index }}<span>.</span>
      </div>
      <!--  <div class="info-color w-5">
        <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m16.843 13.789c.108.141.157.3.157.456 0 .389-.306.755-.749.755h-8.501c-.445 0-.75-.367-.75-.755 0-.157.05-.316.159-.457 1.203-1.554 3.252-4.199 4.258-5.498.142-.184.36-.29.592-.29.23 0 .449.107.591.291 1.002 1.299 3.044 3.945 4.243 5.498z"/></svg>
      </div> -->
      <div 
        v-if="!votes[link.videoId]"
        class="upvote info-color mx-1 cursor-pointer" 
        title="vote" 
        @click="handleUpvote(link.videoId)"
      >
        &#9650;
      </div>
      <div v-else class="w-4 mx-1"></div>
      <div class="title">
        <span 
          @click="playVideo(link.videoId)"
          class="cursor-pointer text-neutral-500"
        >
          {{ link.title }}
        </span>
        <span class="info-color mr-1 text-xs">{{
          link.source ? "(" + link.source + ")" : ""
        }}</span>
      </div>
    </div>
    <div class="second-line flex ml-12">
    <!-- <div class="second-line flex ml-6"> -->
      <!-- <div class="points info-color text-xs leading-none">
        {{ score }} points by admin {{ date }} hour ago
      </div> -->
      <div class="points info-color text-xs leading-none">
        <span v-if="link.published_at" >{{ getTimeSince(link.published_at) }} ago</span>
        <span v-if="votes[link.videoId]"> |
          <span @click="handleUnvote(link.videoId)" class="cursor-pointer">unvote</span>
        </span>
        <span></span>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate, timeSince } from "@/helpers";
import { fireDb, increment } from '/plugins/firebase.js'

export default {
  props: {
    link: Object,
    index: Number,
    playVideo: Function,
    stopVideo: Function,
    currentVideoPlaying: String,
  },
  computed: {
    votes() {
      return this.$store.state.votes
    },
    user() {
      return this.$store.state.user
    }
  },
  methods: {
    getTimeSince(date) {
      const formattedDate = formatDate(date);
      return timeSince(formattedDate.getTime());
    },
    handleUpvote(videoId) {
      const user = this.user
      if (!user) {
        this.$router.push({ name: 'login', params: { goTo: '/', action: 'vote', id: videoId, how: 'up'}})
      } else {
        const userRef = fireDb.collection('users').doc(user.email)
        const videoRef = fireDb.collection('links').doc(videoId);
        videoRef.update({ points: increment(1)}).then(() => {
          userRef.get().then(doc => {
            let data = doc.data()
            if (data.votes) {
              if (data.votes[videoId]) delete data.votes[videoId]
              else data.votes[videoId] = true
            } else {
              data.votes = {}
              data.votes[videoId] = true
            }
            userRef.update({ votes: data.votes }).then(() => {
              this.$store.commit('setVotes', data.votes)
            }).catch(e => console.log('handleUpvote userRef update', e))
          })
        }).catch(e => console.log('handleUpvote videoRef update', e))
      }
    },
    handleUnvote(videoId) {
      const user = this.user
      const votes = this.votes
      delete votes[videoId]
      const userRef = fireDb.collection('users').doc(user.email)
      const videoRef = fireDb.collection('links').doc(videoId);
      userRef.update({ votes }).then(() => {
        videoRef.update({ points: increment(-1)}).catch(e => console.log('handleUnvote videoRef update', e))
        this.$store.commit('setVotes', Object.assign({}, votes))
      }).catch(e => console.log('handleUnvote userRef update', e))
    }
  }
};
</script>

<style scoped>
.info-color {
  color: #525252;
}
</style>
