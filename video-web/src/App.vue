<template>
    <div id="app">
        <div class="player-container">
            <vue-core-video-player
                :src="videoSource"
                controls="auto"
                logo="https://www.devpoint.cn/Apps/Site/View/devpoint/public/images/logo.png"
            ></vue-core-video-player>
        </div>
    </div>
</template>

<script>
export default {
    name: "App",
    data() {
        //在实际项目中可以根据情况为不同分辨率设置相应的视频源
        const videoSource = [
            {
                src: "http://127.0.0.1:8100/video/20220315",
                resolution: "360p",
            },
            {
                src: "http://127.0.0.1:8100/video/20220315",
                resolution: "720p",
            },
            {
                src: "http://127.0.0.1:8100/video/20220315",
                resolution: "1080p",
            },
        ];
        return {
            videoSource,
        };
    },
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
.player-container {
    width: 800px;
    margin: 20px auto;
}
</style>
