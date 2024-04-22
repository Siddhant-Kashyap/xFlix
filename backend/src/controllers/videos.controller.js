const catchAsync = require('../utils/catchAsync')
const { videoService } = require('../services/index')

/**
 * Get videos API controller
 * 
 */
const getVideos = catchAsync(async(req, res) => {
    const { query } = req
    let data
    if (Object.keys(query).length === 0) {
        data = await videoService.getAllVideos()
    }
    else {
        data = await videoService.getVideosByQuery(query)
    }
    res.send({ "videos": data })
})


/**
 * Get video by Id controller
 * 
 */
const getVideosById = catchAsync(async(req, res) => {
    const { params } = req
    
    const data = await videoService.getVideoById(params.videoId)

    res.send(data)
})


const postVideo = catchAsync(async(req, res) => {
    const { body } = req

    const data = await videoService.postVideo(body)

    res.send(data)
})

const patchVideoVotes = catchAsync(async(req, res) => {
    const { params, body } = req

    await videoService.patchVideoVotes(params.videoId, body.vote, body.change)

    res.send()
})

const patchVideoViews = catchAsync(async(req, res) => {
    const { params } = req

    await videoService.patchVideoViews(params.videoId)

    res.send()
})

module.exports = { getVideos, getVideosById, postVideo, patchVideoVotes, patchVideoViews }