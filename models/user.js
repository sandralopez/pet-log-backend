const mongoose = require('mongoose');

const ReminderSchema = new mongoose.Schema({
    id: {
        required: false,
        type: mongoose.Schema.Types.ObjectId
    },
    date: {
        required: true,
        type: Date
    },
    subject: {
        required: true,
        type: String
    },
    detail: {
        required: false,
        type: String
    },
    oneWeekNotified: {
        required: false,
        type: Boolean
    },
    threeDaysNotified: {
        required: false,
        type: Boolean
    },
    created_at: {
        required: true,
        type: Date
    }
})

const PetSchema = new mongoose.Schema({
    id: {
        required: false,
        type: mongoose.Schema.Types.ObjectId
    },
    name: {
        required: true,
        type: String
    },
    species: {
        required: true,
        type: String
    },
    birthdate: {
        required: true,
        type: Date
    },
    image: {
        required: false,
        type: String
    },
    reminders: [ReminderSchema],
    created_at: {
        required: true,
        type: Date
    }
})

const TagSchema = new mongoose.Schema({
    id: {
        required: false,
        type: mongoose.Schema.Types.ObjectId
    },
    name: {
        required: true,
        type: String
    },
    datatype: {
        required: true,
        type: String
    },
    measureUnit: {
        required: false,
        type: String
    },
    timeUnit: {
        required: false,
        type: String
    },
    created_at: {
        required: true,
        type: Date
    }
})

const UserSchema = new mongoose.Schema({
    id: {
        required: false,
        type: mongoose.Schema.Types.ObjectId
    },
    email: {
        required: true,
        type: String
    },
    username: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    role: {
        required: true,
        type: String
    },
    pets: [PetSchema],
    tags: [TagSchema],
    created_at: {
        required: true,
        type: Date
    }
});

module.exports = mongoose.model('user', UserSchema);