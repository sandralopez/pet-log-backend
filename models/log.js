const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
    id: {
        required: false,
        type: mongoose.Schema.Types.ObjectId
    },
    tag: {
        required: true,
        type: String
    },
    date: {
        required: true,
        type: Date
    },
    value: {
        required: true,
        type: String
    },
    detail: {
        required: false,
        type: String
    },
    pet: {
        required: true,
        type: mongoose.Schema.Types.ObjectId
    },
    created_at: {
        required: true,
        type: Date
    },
})

module.exports = mongoose.model('log', LogSchema);