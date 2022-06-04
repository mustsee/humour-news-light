import Vue from 'vue';
import VueGtag from 'vue-gtag';

if (process.env.NODE_ENV === "production") {
    Vue.use(VueGtag, {
        config: {id: "G-BPRDRJ6HZX"},
        appName: 'humour-news-light',
    });
}