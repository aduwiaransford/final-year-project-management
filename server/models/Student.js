const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        unique: true
    },
    lastname: {
        type: String,
        required: true,
        unique: true
    },
    department: {
        type: String,
        required: true,
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
},
    {
        timestamps: true
    })

module.exports = mongoose.model('Student', studentSchema)