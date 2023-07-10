const mongoose = require('mongoose')
const {Schema, model} = mongoose

const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    featured: {
        type: Boolean,
        required: true
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps: true})

const PostModel = model('Post', PostSchema)

module.exports = PostModel