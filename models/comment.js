const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    id: {
        required: false,
        type: mongoose.Schema.Types.ObjectId
    },
    user: {
        required: true,
        type: mongoose.Schema.Types.ObjectId
    },
    comment: {
        required: true,
        type: String
    },
    created_at: {
        required: true,
        type: Date
    },
})

module.exports = mongoose.model('comment', CommentSchema);