const router = require("express").Router();
const videoController = require("../controller/videoController");

router.get("/:videoId", videoController.streamVideo);

module.exports = router;
