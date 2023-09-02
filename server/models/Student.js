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
    },
    email: {
        type: String,
        unique: true
    },
    index: {
        type: String,
        required: true
    },
    contact: {
        type: String,
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
    },
    year: {
        type: Number,
        default: 0,
    }
},
    {
        timestamps: true
    })

module.exports = mongoose.model('Student', studentSchema)