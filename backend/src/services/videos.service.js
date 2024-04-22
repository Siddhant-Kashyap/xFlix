const { Videos } = require('../models')
const ApiError = require('../utils/error')
const httpStatus = require('http-status')


/**
 * Get the video by Id
 * 
 * @param {String} videoId 
 * @returns {Promise<Videos>}
 */
const getVideoById = async (videoId) => {
    const data = await Videos.findById(videoId).exec()
    if (!data) throw new ApiError(httpStatus.NOT_FOUND, 'No video found with matching id')
    return data
}

/**
 * Get all videos
 * 
 * @returns {Promise<List<Videos>>}
 */
const getAllVideos = async () => {
    const data = await Videos.find({}).exec()
    return data
}

/**
 * Get videos based on query
 * 
 * @param {Object} query 
 * @returns {Promise<List<Videos>>}
 */
const getVideosByQuery = async (query) => {
    let findQuery = Videos.find()
    if ("genres" in query) {
        if (query.genres !== "All") {
            const genres = query.genres.split(',').map(i => i.trim())
            findQuery.where('genre').in(genres)
        }
    }
    if ("contentRating" in query) {
        const contentRating = query['contentRating'] // 12+ => 12%2B
        findQuery.where('contentRating').equals(contentRating)
    }
    if ("title" in query) {
        findQuery.find({ title: { $regex: new RegExp(`(${query["title"]})`, 'ig')}})
        // console.log("search for ", query.title)
    }
    if ("sortBy" in query) {
        const sortBy = query['sortBy']
        if (sortBy === "viewCount")
            findQuery.sort({"viewCount": -1})
        if (sortBy === "releaseDate")
            findQuery.sort({"releaseDate": -1})
        // console.log("sort query for", query.sortBy)
    }

    return await findQuery.exec()
}



const postVideo = async (video) => {
    const data = await Videos.create(video)
    return data
}

const patchVideoVotes = async (videoId, vote, change) => {
    const video = await getVideoById(videoId)

    switch (vote) {
        case "downVote":
            if (change === "increase") video.votes.downVotes++
            else video.votes.downVotes--
            break;
        case "upVote":
            if (change === "increase") video.votes.upVotes++
            else video.votes.upVotes--
    }

    await video.save()
}

const patchVideoViews = async (videoId) => {
    const video = await getVideoById(videoId)

    video.viewCount++

    await video.save()
}

module.exports = {
    getVideoById, getAllVideos, getVideosByQuery, postVideo, patchVideoVotes, patchVideoViews
}