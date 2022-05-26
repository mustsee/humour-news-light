<template>
  <div class="main">
    <!-- <button @click="handleClick">call API</button> -->
    <figure v-if="this.currentVideo" class="fixed bottom-0 right-0">
      <iframe width="356" height="200" :src="currentVideo + '?autoplay=1&&enablejsapi=1'" allow="autoplay" frameborder="0"></iframe>
      <figcaption @click="currentVideo=''" class="bg-gray-800 text-white text-center">close video</figcaption>
    </figure>
    <div v-for="(link, i) in links" :key="i">
      <Link :link="link" :index="i + 1" :playVideo="playVideo" />
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
      currentVideo: "",
      links: [],
      /* links: [
        {"url":"https://www.youtube.com/embed/OZ_40BHGXt4","title":"Histoires vraies - Le billet de Daniel Morin","created_at":"2022-05-26T05:24:42Z","source":"youtube.com"},
        {"url":"https://www.youtube.com/embed/dP-cBtJ5mW4","title":"Total écologie - Le Moment Meurice","created_at":"2022-05-25T17:11:00Z","source":"youtube.com"},
        {"url":"https://www.youtube.com/embed/WuZm7jbUY78","title":"Damien Abbad, les stock-options de Moderna, les pleurs de Jo-Wilfried Tsonga ! - Le Journal de 17h17","created_at":"2022-05-25T17:02:59Z","source":"youtube.com"},
        {"url":"https://www.youtube.com/embed/1BL5G1W4CSQ","title":"Une inconnue au tribunal - Le héros du jour de Daniel Morin","created_at":"2022-05-25T10:51:18Z","source":"youtube.com"},
        {"url":"https://www.youtube.com/embed/1VilzmpWxJA","title":"Messmer envoie son public à l'hosto - Tanguy Pastureau maltraite l'info","created_at":"2022-05-25T10:48:56Z","source":"youtube.com"},
        {"url":"https://www.youtube.com/embed/zNaKUbmEqhM","title":"Justine la stagiaire tente de s'imposer - Le billet de Lison Daniel","created_at":"2022-05-25T07:33:49Z","source":"youtube.com"},
        {"url":"https://www.youtube.com/embed/-dPnozyjQmE","title":"Agnès et Amélie font de l’écologie - Le Billet de Charline","created_at":"2022-05-25T06:43:35Z","source":"youtube.com"},
        {"url":"https://www.youtube.com/embed/v9HqClp2mkA","title":"Châteauroux, ville du glamour - Le billet de Daniel Morin","created_at":"2022-05-25T06:17:23Z","source":"youtube.com"},
        {"url":"https://www.youtube.com/embed/RPaLxZz7sHU","title":"Pap Ndiaye alias le woke - La chronique de Djamil le Shlag","created_at":"2022-05-24T16:04:32Z","source":"youtube.com"},
        {"url":"https://www.youtube.com/embed/T5xXdD07B3Y","title":"Grande cause du quinquennahahah - Le Moment Meurice","created_at":"2022-05-24T16:02:19Z","source":"youtube.com"},
        {"url":"https://www.youtube.com/embed/sa9TK9vibCk","title":"\"Panier-Runacher critiquée par les écolos, réforme des retraites, et pas de douche pour Vizorek le d","created_at":"2022-05-24T16:02:05Z","source":"youtube.com"},
        {"url":"https://www.youtube.com/embed/zrQxlYBnSo4","title":"Tout nu dans les bois avec un masque de chien - Tanguy Pastureau maltraite l'info","created_at":"2022-05-24T10:29:56Z","source":"youtube.com"},
        {"url":"https://www.youtube.com/embed/rjStLbb4uFE","title":"Touche pas au compost - Le billet d'Alex Vizorek","created_at":"2022-05-24T07:40:05Z","source":"youtube.com"},
        {"url":"https://www.youtube.com/embed/xS0rmyQsbJA","title":"#JeSuisFriteuse - Le Billet de Charline","created_at":"2022-05-24T07:37:43Z","source":"youtube.com"}], */
      error: null
    };
  },
  methods: {
    playVideo(url) {
      this.currentVideo = url;
    },
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
          console.log(item)
          return {
            url:
              "https://www.youtube.com/embed/" +
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
    this.loadLinks() // Put this API call to make it SSR
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
