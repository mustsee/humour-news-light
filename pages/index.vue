<template>
  <div class="main">
    <figure 
      v-if="this.currentVideo" 
      :class="`fixed right-0 ${videoPlayerBottom ? 'bottom-0' : 'top-0'}`"
    >
      <figcaption 
        @click="videoPlayerBottom = !videoPlayerBottom" 
        class="bg-gray-600 text-white cursor-pointer h-8 flex items-center justify-center rounded-t-lg"
      >
        move window to {{ videoPlayerBottom ? 'top' : 'bottom' }}
      </figcaption>
      <iframe 
        width="356" 
        height="200" 
        :src="'https://www.youtube.com/embed/' + currentVideo + '?autoplay=1&&enablejsapi=1'" 
        allow="autoplay" 
        frameborder="0"
      >
      </iframe>
      <figcaption 
        @click="currentVideo=''" 
        class="bg-gray-600 text-white cursor-pointer h-8 flex items-center justify-center rounded-b-lg">
        close video
      </figcaption>
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
export default {
  data() {
    return {
      currentVideo: "",
      //links: [{"videoId":"7-xOKtB6MVs","points":0,"published_at":"2022-06-04T10:12:57Z","title":"L'artiste de la semaine - Lou Trotignon #FIEALD","created_at":{"seconds":1654436432,"nanoseconds":43000000},"source":"Le FIEALD","language":"fr"},{"videoId":"rufEIUE2jXI","published_at":"2022-06-04T09:00:20Z","created_at":{"seconds":1654436433,"nanoseconds":808000000},"source":"Vérino","points":0,"language":"fr","title":"Diffamation, Joconde et tarte à la crème // VERINO - Dis Donc Internet #232"},{"created_at":{"seconds":1654436427,"nanoseconds":768000000},"points":0,"title":"DJIMO - LE MARIAGE","published_at":"2022-06-04T08:45:00Z","source":"Paname Comedy Club","language":"fr","videoId":"aaqLScDOdCs"},{"language":"fr","published_at":"2022-06-03T18:00:13Z","points":0,"created_at":{"seconds":1654436429,"nanoseconds":550000000},"source":"Jamel Comedy Club","videoId":"QydZCiN22-E","title":"Kevin Razy - Les Hassanats - Jamel Comedy Club"},{"language":"fr","source":"France Inter","points":0,"videoId":"_ho0RVEYE4o","published_at":"2022-06-03T16:45:44Z","created_at":{"seconds":1654436426,"nanoseconds":547000000},"title":"Nin nin nin, Darmanin - La chanson de Frédéric Fromet"},{"source":"France Inter","created_at":{"seconds":1654436426,"nanoseconds":547000000},"title":"Comment Dora est-elle morte? - La Chronique de Christine Gonzalez","videoId":"jjoQQt7bjUI","published_at":"2022-06-03T16:42:16Z","points":0,"language":"fr"},{"source":"France Inter","language":"fr","created_at":{"seconds":1654436426,"nanoseconds":547000000},"videoId":"T7NL_y2khHk","published_at":"2022-06-03T16:40:11Z","points":0,"title":"Cumul fête juive et Pentecôte, match France-Danemark et fausses brèves - Le Journal de 17h17"},{"points":0,"title":"Making Your Girlfriend’s Mom an Online Dating Profile - Langston Kerman","published_at":"2022-06-03T16:00:05Z","created_at":{"seconds":1654436431,"nanoseconds":417000000},"source":"Comedy Central Stand-Up","language":"en","videoId":"7dti0WssbSg"},{"title":"L'allaitement en public, ok, mais bien caché - Tanguy Pastureau maltraite l'info","source":"France Inter","created_at":{"seconds":1654267962,"nanoseconds":56000000},"published_at":"2022-06-03T10:06:49Z","language":"fr","points":0,"videoId":"72NRXq0i_ks"},{"created_at":{"seconds":1654267962,"nanoseconds":56000000},"points":0,"title":"Guillermo Guiz a un préambule - La Drôle D'Humeur De Guillermo Guiz","published_at":"2022-06-03T10:01:10Z","source":"France Inter","videoId":"agWqyVq0CjY","language":"fr"},{"language":"fr","title":"Riad Sattouf - Morgane Cadignan n'aime pas","videoId":"iFwR9G_U2vA","published_at":"2022-06-03T09:57:32Z","created_at":{"seconds":1654260970,"nanoseconds":900000000},"source":"France Inter","points":0},{"title":"Retour sur l'odonymie - Le Billet de François Morel","published_at":"2022-06-03T07:33:08Z","language":"fr","created_at":{"seconds":1654259757,"nanoseconds":23000000},"source":"France Inter","videoId":"Ku0nln6ogTw","points":0},{"created_at":{"seconds":1654259757,"nanoseconds":23000000},"published_at":"2022-06-02T16:42:33Z","title":"Famine : faîtes des réserves - La chronique d'Aymeric Lompret","videoId":"oNs0sxkXIAY","language":"fr","source":"France Inter","points":0},{"language":"fr","points":0,"title":"Le jubilé de la reine - Le Moment Meurice","created_at":{"seconds":1654259757,"nanoseconds":23000000},"published_at":"2022-06-02T16:39:52Z","source":"France Inter","videoId":"4898rxA_8fw"},{"published_at":"2022-06-02T16:38:31Z","language":"fr","title":"Jubilé de la reine, Michel Sardou et grève de diplomates - Le Journal de 17h17","source":"France Inter","points":0,"videoId":"kNPEyB8BWig","created_at":{"seconds":1654259757,"nanoseconds":23000000}},{"published_at":"2022-06-02T16:00:04Z","language":"en","points":0,"created_at":{"seconds":1654436431,"nanoseconds":417000000},"title":"Working in a Luxury Sex Shop - Jes Tom - Stand-Up Featuring","source":"Comedy Central Stand-Up","videoId":"65WwTVf23as"},{"published_at":"2022-06-02T10:44:26Z","title":"Interdisons le foot - Tanguy Pastureau maltraite l'info","created_at":{"seconds":1654259757,"nanoseconds":23000000},"language":"fr","source":"France Inter","points":0,"videoId":"K-LJ6YkQcNg"},{"videoId":"Ev6lIeihOWc","published_at":"2022-06-02T10:33:02Z","source":"France Inter","title":"Elon Musk - Le héros du jour de Daniel Morin","language":"fr","points":0,"created_at":{"seconds":1654259757,"nanoseconds":23000000}},{"language":"fr","title":"Richard Gasquet - Morgane Cadignan n'aime pas","source":"France Inter","published_at":"2022-06-02T10:26:17Z","points":0,"created_at":{"seconds":1654259757,"nanoseconds":23000000},"videoId":"XbNgntAHXko"},{"source":"France Inter","title":"\"On rappelle les règles de base : ne jamais se fâcher avec Rachida Dati.\" - Le Journal de 17h17","videoId":"kXh7WrzLTPU","points":0,"published_at":"2022-06-02T08:33:58Z","created_at":{"seconds":1654259757,"nanoseconds":23000000},"language":"fr"},{"created_at":{"seconds":1654259757,"nanoseconds":23000000},"videoId":"l2dUxc8J8HI","title":"\"Allo Marlène\", bientôt sur France Inter ? Le billet de Tanguy Pastureau","language":"fr","published_at":"2022-06-02T07:45:09Z","source":"France Inter","points":0},{"videoId":"dqmKt63AKa4","points":0,"language":"en","title":"Валентин Сидоров про заботу мамы, неожиданные приезды девушек и трудности запоминания","published_at":"2022-06-02T07:10:49Z","source":"STAND UP","created_at":{"seconds":1654183220,"nanoseconds":422000000}},{"created_at":{"seconds":1654259757,"nanoseconds":23000000},"source":"France Inter","title":"Un prof livré en 30 minutes - Le Billet de Charline","videoId":"ydjK9sr5skA","published_at":"2022-06-02T06:43:19Z","points":0,"language":"fr"},{"points":0,"published_at":"2022-06-02T05:43:16Z","title":"Laisse-moi kiffer la vibe avec mon spliff ! Le billet de Daniel Morin","videoId":"afxr0SIEybU","source":"France Inter","created_at":{"seconds":1654259757,"nanoseconds":23000000},"language":"fr"},{"source":"France Inter","language":"fr","created_at":{"seconds":1654259757,"nanoseconds":23000000},"published_at":"2022-06-01T20:32:58Z","points":0,"title":"Les pitchouns du Djihad - Le Moment Meurice","videoId":"3rKy0Mq1egk"},{"created_at":{"seconds":1654436432,"nanoseconds":996000000},"published_at":"2022-06-01T17:26:11Z","language":"fr","title":"Paris-Brest Joyeux (Panier garni à Bruxelles)","points":0,"source":"Alexis Le Rossignol","videoId":"ucWzTPnHisI"},{"videoId":"1ah803ihW00","language":"en","created_at":{"seconds":1654436431,"nanoseconds":417000000},"title":"Why Hippos Are Scarier Than Sharks - Mike Mulloy - Stand-Up Featuring","source":"Comedy Central Stand-Up","points":0,"published_at":"2022-06-01T16:00:01Z"},{"points":0,"videoId":"-LlW0io5w30","source":"Montreux Comedy","created_at":{"seconds":1654436428,"nanoseconds":758000000},"title":"Laura Laune et Guillaume Bats – Le sexisme","published_at":"2022-06-01T16:00:00Z","language":"fr"},{"videoId":"17SrEfMxJos","published_at":"2022-06-01T14:35:32Z","title":"N'importe qui peut devenir prof - Tanguy Pastureau maltraite l'info","language":"fr","source":"France Inter","points":0,"created_at":{"seconds":1654259757,"nanoseconds":23000000}},{"created_at":{"seconds":1654259757,"nanoseconds":23000000},"language":"fr","published_at":"2022-06-01T10:32:17Z","points":0,"title":"un jeune escroc allemand - Le héros du jour de Daniel Morin","videoId":"Vzz6xkJPg1w","source":"France Inter"}],
      error: null,
      videoPlayerBottom: true
    };
  },
  computed: {
    links() {
      return this.$store.state.links
    },
    routeParams() {
      return this.$route.params
    }
  },
    // With asyncData, keep-alive doesn't work and pb when deploying  
/*   async asyncData() {
    try {
      const collection = await fireDb.collection('links').orderBy('published_at', 'desc').limit(30).get()
      let links = []
      collection.forEach(doc => {
        links.push(doc.data())
      })
      return { links }
    } catch (error) {
      return { error }
    }
  }, */
  methods: {
    playVideo(videoId) {
      this.currentVideo = videoId;
    },
  },
  activated() {
    const { routeParams } = this
    if (routeParams.action) {
      if (routeParams.action === 'vote') {
        this.$store.dispatch('upvote', routeParams.id )
      }
    }
  },
  mounted() {
    this.$store.dispatch('getLinks') // Put this API call to make it SSR
  }
};
</script>
