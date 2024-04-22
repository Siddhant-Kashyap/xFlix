const express = require('express')
const validator = require('../middlewares/validator')
const { videoController } = require('../controllers/index')
const { videoValidation } = require('../validations')

const router = express.Router()

router.patch(
    "/:videoId/votes",
    validator(videoValidation.patchVideoVotes),
    videoController.patchVideoVotes
)

router.patch(
    "/:videoId/views",
    validator(videoValidation.patchVideoViews),
    videoController.patchVideoViews
)

router.get(
    "/:videoId",
    validator(videoValidation.getVideosById),
    videoController.getVideosById
)

router.get(
    "",
    validator(videoValidation.getVideos),
    videoController.getVideos
)

router.post(
    "",
    validator(videoValidation.postVideo),
    videoController.postVideo
)

module.exports = router