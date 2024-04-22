const mongoose = require("mongoose")

const votesSchema = new mongoose.Schema({ upVotes: {type: Number, default: 0}, downVotes: {type: Number, default: 0} }, { _id : false })

const videoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        videoLink: {
            type: String,
            required: true,
            trim: true
        },
        genre: {
            type: String,
            required: true,
            trim: true
        },
        contentRating: {
            type: String,
            required: true,
            trim: true
        },
        releaseDate: {
            type: String,
            required: true,
            trim: true
        },
        previewImage: {
            type: String,
            required: true,
            trim: true
        },
        votes:{
            type: votesSchema,
            default: { upVotes: 0, downVotes: 0 }
        },
        viewCount: {
            type: Number,
            default: 0,
        }
    },
    {
        timestamps: false,
    }
)

const Videos = mongoose.model('videos', videoSchema)

module.exports.Videos = Videos