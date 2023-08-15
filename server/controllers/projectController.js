const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const Category = require("../models/Category");
const Chapter = require('../models/Chapter')
const ProjectTitle = require('../models/Project');
const Student = require("../models/Student");

// Create a new category
const createCategory = asyncHandler(async (req, res) => {
    try {
        const { name } = req.body;
        const category = await Category.create({ name });
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ message: "Error creating category" });
    }
});



// Fetch all categories
const getAllCategories = asyncHandler(async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: "Error fetching categories" });
    }
});


// chapters
const createOrUpdateChapter = asyncHandler(async (req, res) => {
    try {
        const { id, remarks, chapters } = req.body;

        // Find existing chapters for the student
        const existingChapters = await Chapter.find({ studentId: id });

        // Check if chapters data is provided
        if (!chapters) {
            return res.status(400).json({ message: 'Chapters data not provided' });
        }

        // Loop through the provided chapters
        for (let i = 0; i < chapters.length; i++) {
            const chapterNumber = chapters[i];
            const remark = remarks[chapterNumber];

            // Find the existing chapter with the same chapter number
            const existingChapter = existingChapters.find(
                (chapter) => chapter.chapterNumbers[0] === chapterNumber
            );

            // If the chapter already exists, update the remarks
            if (existingChapter) {
                existingChapter.remarks = remark;
                await existingChapter.save();
            } else {
                // If the chapter doesn't exist, create a new chapter with the remarks
                const newChapter = await Chapter.create({
                    studentId: id,
                    chapterNumbers: [chapterNumber],
                    remarks: remark,
                });
                existingChapters.push(newChapter);
            }
        }

        // Send the updated or created chapters in the response
        res.json(existingChapters);
    } catch (error) {
        res.status(500).json({ message: "Error creating or updating chapters", error: error.message });
    }
});


//Fetch all chapters for a specific student
const getChaptersByStudentId = asyncHandler(async (req, res) => {
    try {
        const { id } = req.body
        const chapters = await Chapter.find({ studentId: id });
        console.log(id);
        // Check if there are chapters found for the given student ID
        if (!chapters || chapters.length === 0) {
            return res.status(404).json({ message: "No chapters found for the given student ID" });
        }

        res.json(chapters);
    } catch (error) {
        // Handle any errors that occurred during the Chapter.find operation
        res.status(500).json({ message: "Error fetching chapters", error: error.message });
    }
});

const getSummaryByStudentId = asyncHandler(async (req, res) => {
    try {
        const { studentId } = req.params;
        const chapters = await Chapter.find({ studentId });
        // Calculate the summary report based on the chapters and their remarks
        // ... (implement your logic here)
        res.json(chapters);
    } catch (error) {
        res.status(500).json({ message: "Error fetching summary report", error: error.message });
    }
});

// add project title
const addProjectTitle = asyncHandler(async (req, res) => {
    try {
        const { id, projectTitle, projectCategory } = req.body;

        let student = await Student.findOne({ _id: id }); // Use findOne instead of find
        console.log(student);
        if (!student) {
            return res.status(404).json({ message: "Student not found" }); // Return the response and exit the function
        }

        student.projectTitle = projectTitle;
        student.projectCategory = projectCategory;

        await student.save(); // Use save on the retrieved document
        res.json(student);
    } catch (error) {
        res.status(500).json({ message: "Error adding project title", error: error.message });
    }
});


module.exports = {
    createCategory,
    getAllCategories,
    createOrUpdateChapter,
    getChaptersByStudentId,
    getSummaryByStudentId,
    addProjectTitle,
}
