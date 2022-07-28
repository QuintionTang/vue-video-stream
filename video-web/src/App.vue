<template>
    <div id="app">
        <div class="player-container">
            <div class="title">requestVideoFrameCallback() 简单实例</div>
            <div class="item-container left">
                <div class="item-container-in">
                    <video controls playsinline muted autoplay></video>
                    <div class="item-header">Video</div>
                </div>
            </div>
            <div class="item-container right">
                <div class="item-container-in">
                    <canvas></canvas>
                    <div class="item-header">Canvas</div>
                </div>
            </div>
            <div class="fps-info" v-if="fpsInfo">
                <strong>FPS：</strong>
                <i>{{ fpsInfo }}</i>
            </div>
            <div class="metadata-info" v-if="metadata">
                <textarea readonly v-model="metadata"></textarea>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "App",
    data() {
        return {
            fpsInfo: null,
            metadata: null,
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            const video = document.querySelector("video");
            const canvas = document.querySelector("canvas");
            const ctx = canvas.getContext("2d");

            video.addEventListener("play", () => {
                if (
                    !("requestVideoFrameCallback" in HTMLVideoElement.prototype)
                ) {
                    return alert(
                        "你的浏览器不支持接口 `Video.requestVideoFrameCallback()`"
                    );
                }
            });

            let width = canvas.width;
            let height = canvas.height;

            let paintCount = 0;
            let startTime = 0.0;

            const updateCanvas = (now, metadata) => {
                if (startTime === 0.0) {
                    startTime = now;
                }

                ctx.drawImage(video, 0, 0, width, height);

                const elapsed = (now - startTime) / 1000.0;
                const fps = (++paintCount / elapsed).toFixed(3);
                this.fpsInfo = !isFinite(fps) ? 0 : fps;
                this.metadata = JSON.stringify(metadata, null, 2);

                video.requestVideoFrameCallback(updateCanvas);
            };

            video.src = "https://vjs.zencdn.net/v/oceans.mp4";
            video.requestVideoFrameCallback(updateCanvas);
        },
    },
};
</script>

<style>
* {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    background: #000;
}
.title {
    position: absolute;
    left: 0;
    top: 30;
    height: 60px;
    line-height: 60px;
    font-size: 24px;
    color: #fff;
    text-align: center;
    width: auto;
    right: 0px;
    background-color: #000;
    z-index: 100;
    border-bottom: 1px rgba(255, 255, 255, 0.6) solid;
}
.player-container {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    position: relative;
}
.item-container {
    position: absolute;
    width: 50%;
    height: 100%;
    padding: 50px;
    top: 0px;
    z-index: 1;
}
.item-container.left {
    left: -5px;
    border-right: 1px rgba(255, 255, 255, 0.6) solid;
}
.item-container-in {
    width: 100%;
    height: 100%;
    position: relative;
}
.item-header {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 100px;
    z-index: 9;
    color: rgba(255, 255, 255, 0.8);
    font-weight: 700;
}
.item-container.right {
    right: -5px;
    border-left: 1px rgba(255, 255, 255, 0.6) solid;
}
.item-container canvas,
.item-container video {
    position: absolute;
    left: 50%;
    top: 50%;
    margin: -180px 0px 0px -320px;
    width: 640px;
    height: 360px;
}
.item-container::before {
    position: absolute;
    content: "";
    width: 1px;
    height: 100%;
    overflow: hidden;
    background-color: rgba(#fff, 0.6);
}
.fps-info {
    position: absolute;
    width: 200px;
    height: 50px;
    line-height: 20px;
    font-family: Arial, Helvetica, sans-serif;
    left: 50px;
    bottom: 50px;
    z-index: 10;
    padding: 15px;
    background-color: rgba(255, 255, 255, 0.5);
    text-align: left;
    color: #000;
}
.fps-info i {
    font-style: normal;
}
.metadata-info {
    position: absolute;
    width: 600px;
    height: 180px;
    line-height: 20px;
    font-family: Arial, Helvetica, sans-serif;
    right: 50px;
    bottom: 50px;
    z-index: 10;
    padding: 15px;
    background-color: rgba(255, 255, 255, 0.5);
    text-align: left;
    color: #000;
}
.metadata-info textarea {
    display: block;
    width: 100%;
    height: 100%;
    background-color: transparent;
    border: none;
}
</style>
