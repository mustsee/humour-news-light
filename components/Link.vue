<template>
  <div class="item mx-2 mb-1">
    <div class="first-line flex">
      <div
        v-if="link.url != currentVideoPlaying" 
        @click="playVideo(link.url)"
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
      </div>
      <div class="rank info-color w-5 mr-1 text-right">
        {{ index }}<span>.</span>
      </div>
      <!-- <div class="upvote info-color mx-1" title="vote">&#9650;</div> -->
      <div class="title">
        <span 
          @click="playVideo(link.url)"
          class="cursor-pointer"
        >
          {{ link.title }}
        </span>
        <span class="info-color mr-1 text-xs">{{
          link.source ? "(" + link.source + ")" : ""
        }}</span>
      </div>
    </div>
    <!-- <div class="second-line flex ml-8"> -->
    <div class="second-line flex ml-6">
      <!-- <div class="points info-color text-xs leading-none">
        {{ score }} points by admin {{ date }} hour ago
      </div> -->
      <div v-if="link.published_at" class="points info-color text-xs leading-none">
        {{ getTimeSince(link.published_at) }} ago
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate, timeSince } from "@/helpers";

export default {
  props: {
    link: Object,
    index: Number,
    playVideo: Function,
    stopVideo: Function,
    currentVideoPlaying: String,
  },
  methods: {
    getTimeSince(date) {
      const formattedDate = formatDate(date);
      return timeSince(formattedDate.getTime());
    }
  }
};
</script>

<style scoped>
.info-color {
  color: #525252;
}
</style>
