const Joi = require("joi")
const mongoose = require("mongoose")

const getVideos = {
    query: Joi.object().keys({
        genres: Joi.string().custom((value, helpers) => {
            const genres = value.split(',').map(item => item.trim())
            const allowed = ['Education', 'Sports', 'Movies', 'Comedy', 'Lifestyle', 'All']
            for(let i=0;i<genres.length;i++) {
                if (allowed.indexOf(genres[i]) == -1) {
                    return helpers.message(`Genre must be one of [${allowed}]`)
                }
            }
            return value
        }, 'custom validation').optional(),
        contentRating: Joi.string().valid("Anyone", "7+", "12+", "16+", "18+", "All").optional(),
        title: Joi.string().optional(),
        sortBy: Joi.string().custom((value, helpers) => {
            const allowed = ["viewCount", "releaseDate"]
            if (allowed.indexOf(value) == -1) {
                return helpers.message(`Sort must be one of [${allowed}]`)
            }
            return value
        }, 'custom validation').optional()
    })
}

const getVideosById = {
    params: Joi.object().keys({
        videoId: Joi.string().custom((value, helpers) => {
            const isValid = mongoose.Types.ObjectId.isValid(value)
            if (isValid) return value
            return helpers.message(`\"videoId\" must be a valid mongo id`)
        }).required()
    })
}

const postVideo = {
    body: Joi.object().keys({
       
        releaseDate: Joi.date().required(),
        contentRating: Joi.string().required(),
        genre: Joi.string().required(),
        title: Joi.string().required(),
        videoLink: Joi.string().required(),
        previewImage: Joi.string().required(),
    })
}

const patchVideoVotes = {
    params: Joi.object().keys({
        videoId: Joi.string().custom((value, helpers) => {
            const isValid = mongoose.Types.ObjectId.isValid(value)
            if (isValid) return value
            return helpers.message(`\"videoId\" must be a valid mongo id`)
        }).required()
    }),
    body: Joi.object().keys({
        vote: Joi.string().valid("downVote", "upVote"),
        change: Joi.string().valid("increase", "decrease")
    })
}

const patchVideoViews = {
    params: Joi.object().keys({
        videoId: Joi.string().custom((value, helpers) => {
            const isValid = mongoose.Types.ObjectId.isValid(value)
            if (isValid) return value
            return helpers.message(`\"videoId\" must be a valid mongo id`)
        }).required()
    })
}

module.exports = {
    getVideos,
    getVideosById,
    postVideo,
    patchVideoVotes,
    patchVideoViews
}