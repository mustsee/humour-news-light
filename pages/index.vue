<template>
  <div class="main">
    <!-- <button @click="handleClick">call API</button> -->
    <div v-for="(link, i) in links" :key="i">
      <Link :link="link" :index="i + 1" />
    </div>
  </div>
</template>

<script>
import artists from "/artists.js"
import LinkItem from "/components/Link.vue";
import axios from "axios";

export default {
  components: {
    Link: LinkItem
  },
  data() {
    return {
      links: [],
      error: null
    };
  },
  methods: {
    async loadLinks() {
      // A search request costs 100 units.
      //const start = "https://www.googleapis.com/youtube/v3/search?";
      const key = "key=" + process.env.youtubeApiKey;
      const franceInterChannelId = "UCJldRgT_D7Am-ErRHQZ90uw";
      //const params = `&channelId=${franceInterChannelId}&part=snippet,id&order=date&maxResults=20`;
      /*     try {
      const response = await axios.get(start + key + params)
      console.log('response', response.data)

      const items = response.data.items.map(item => {
        const id = item.id.videoId
        const url = 'https://www.youtube.com/watch?v=' + id
        const title = item.snippet.title
        return { url, title }
      })
      console.log('items', items)

    } catch (error) {
      console.log('error', error, error.response)
    }
     */

      // A read operation that retrieves a list of resources -- channels, videos, playlists -- usually costs 1 unit.

      const url1 =
        "https://www.googleapis.com/youtube/v3/channels?id=" +
        franceInterChannelId +
        "&" +
        key +
        "&part=contentDetails";
      let uploadId;
      try {
        const response = await axios.get(url1);
        //console.log("response", response.data);
        uploadId =
          response.data.items[0].contentDetails.relatedPlaylists.uploads;
      } catch (error) {
        console.log("error", error);
      }

      const url2 =
        "https://www.googleapis.com/youtube/v3/playlistItems?playlistId=" +
        uploadId +
        "&" +
        key +
        "&part=snippet&maxResults=50";
      try {
        const res = await axios.get(url2);

        const filteredByArtists = res.data.items.filter(item => {
          const title = item.snippet.title
          const hasArtist = artists.find(artist => {
            if (title.includes(artist)) return true
          });
          if (hasArtist) return true
        });

        const items = filteredByArtists.map(item => {
          return {
            url:
              "https://www.youtube.com/watch?v=" +
            item.snippet.resourceId.videoId,
            title: item.snippet.title,
            created_at: item.snippet.publishedAt,
            source: "youtube.com"
          };        
        });

        this.links = items
      } catch (error) {
        console.log("error", error);
      }
    }
  },
  async mounted() {
    this.loadLinks()
    // try {
      // So when you do axios.get, underlying, Axios creates an instance on the fly before using it.
      // When you do this.$axios.get, you use an already created instance which got customized
      // somewhere else in your code (by adding some HTTP headers for example)

      // const response = await this.$axios.get();
      // this.links = response.data;
    // } catch (error) {
      // this.error = error;
      // TODO: afficher un message si ça ne fonctionne pas, comme la dernière fois avec la 503
    // }
  }
};
</script>
