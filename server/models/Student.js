const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,

    },
    lastname: {
        type: String,
        required: true,

    },
    department: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    index: {
        type: Number,
        required: true
    },
    contact: {
        type: Number,
        required: true
    },
    supervisor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null,
        // required: true,
    },
    projectTitle: {
        type: String,
        default: "",
    },
    projectCategory: {
        type: String,
        default: "",
    }
},
    {
        timestamps: true
    })

module.exports = mongoose.model('Student', studentSchema)