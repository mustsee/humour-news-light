<template>
  <div class="item mx-2 mb-1">
    <div class="first-line flex">
      <div 
        @click="playVideo(link.url)"
        class="w-5 flex justify-center text-gray-600 hover:text-gray-500 cursor-pointer"
      >
          &#9658;
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
