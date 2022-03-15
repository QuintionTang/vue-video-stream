const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/", (req, res) => {
    // 根目录路由
    res.sendFile(__dirname + "/index.html");
});
// 视频路由
app.use("/video", require("./routes/index"));

const PORT = process.env.PORT || 8100;

app.listen(PORT, () => {
    console.log(`服务运行端口：${PORT}`);
});
