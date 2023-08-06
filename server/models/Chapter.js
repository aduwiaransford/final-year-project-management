const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
    },
    chapterNumbers: {
        type: [String], // An array of strings for chapter numbers
        required: true,
        enum: ['chapter1', 'chapter2', 'chapter3', 'chapter4', 'chapter5'],
    },
    remarks: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Chapter', chapterSchema);

