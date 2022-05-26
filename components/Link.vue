<template>
  <div class="item mx-2 mb-1">
    <div class="first-line flex">
      <div 
        @click="playVideo(link.url)"
        class="w-6 flex justify-center items-center text-gray-600 hover:text-gray-500 cursor-pointer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="h-4">
          <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3 18v-12l10 6-10 6z"/>
        </svg>
      </div>
      <div class="rank info-color w-5 mr-1 text-right">
        {{ index }}<span>.</span>
      </div>
      <!-- <div class="upvote info-color mx-1" title="vote">&#9650;</div> -->
      <div class="title">
        <!-- https://web.dev/external-anchors-use-rel-noopener/?utm_source=lighthouse&utm_medium=devtools -->
        <!-- <a
          :href="link.url"
          target="_blank"
          rel="noopener"
          >{{ link.title }}</a
        > -->
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
      <div v-if="link.created_at" class="points info-color text-xs leading-none">
        {{ getTimeSince(link.created_at) }} ago
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
