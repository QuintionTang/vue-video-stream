import Vue from "vue";
import App from "./App.vue";
import VueCoreVideoPlayer from "vue-core-video-player";

Vue.use(VueCoreVideoPlayer, {
    lang: "zh-CN",
});
Vue.config.productionTip = false;

new Vue({
    render: (h) => h(App),
}).$mount("#app");
