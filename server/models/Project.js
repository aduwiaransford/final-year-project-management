const mongoose = require("mongoose");

const projectTitleSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
    },
    projectTitle: {
        type: String,
        required: true,
    },
    projectCategory: {
        type: String,
        required: true,
    }
});

const ProjectTitle = mongoose.model("ProjectTitle", projectTitleSchema);

module.exports = ProjectTitle;
