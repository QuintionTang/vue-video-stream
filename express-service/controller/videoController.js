const fs = require("fs");
module.exports.streamVideo = (req, res) => {
    const range = req.headers.range;
    const videoId = req.params.videoId; // ID或者视频文件名称
    if (!range) {
        res.status(400).send("无效Range");
    }
    const processPath = process.cwd(); // 获取服务运行路径
    const videoPath = `${processPath}/resources/${videoId}.mp4`;
    const videoSize = fs.statSync(videoPath).size;
    const chunkSize = 10 ** 6; // 1 mb
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + chunkSize, videoSize - 1);
    const contentLength = end - start + 1;
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
    };
    res.writeHead(206, headers);
    const videoStream = fs.createReadStream(videoPath, { start, end });
    videoStream.pipe(res);
};
