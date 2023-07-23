const Student = require('../models/Student')
const asyncHandler = require('express-async-handler')
const multer = require('multer')
const csv = require('csvtojson')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads')
    },

    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage }).single('file')

const uploadStudents = asyncHandler(async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        try {
            const jsonArray = await csv().fromFile(req.file.path);
            if (jsonArray.length === 0) {
                return res.status(400).json({ message: 'No data found in the CSV' });
            }
            // Insert the student data into the database
            await Student.insertMany(jsonArray);
            res.status(201).json({ message: 'File uploaded successfully', data: jsonArray });
        } catch (err) {
            return res.status(500).json({ message: 'Error while processing the CSV file' });
        }
    });
});


const createNewStudent = asyncHandler(async (req, res) => {
    const { firstname, lastname, index, contact, department } = req.body
    if (!firstname || !lastname || !index || !contact || !department) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const duplicate = await Student.findOne({ index }).lean().exec()
    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate index Number' })
    }

    const student = await Student.create({ firstname, lastname, index, contact, department })
    if (student) {
        res.status(201).json({ message: `New student ${firstname} created` })
    } else {
        res.status(400).json({ message: 'invalid data received' })
    }
})


const getAllStudents = asyncHandler(async (req, res) => {
    const students = await Student.find().lean().exec()
    if (!students?.length) {
        return res.status(400).json({ message: 'No students found' })
    }
    res.json(students)
})

const updateStudent = asyncHandler(async (req, res) => {
    const { id, firstname, lastname, index, contact, department } = req.body
    if (!id || !firstname) {
        return res.status(400).json({ message: 'All fields required' })
    }
    const student = await Student.findById(id).exec()
    if (!student) {
        return res.status(400).json({ message: 'Student not found' })
    }

    const duplicate = await Student.findOne({ index }).lean().exec()

    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate index Number' })
    }


    student.firstname = firstname
    student.lastname = lastname
    student.index = index
    student.contact = contact
    student.department = department

    const updatedStudent = await student.save()

    res.json({ message: 'Student updated', data: updatedStudent })

})

const deleteStudent = asyncHandler(async (req, res) => {
    const { id } = req.body
    if (!id) {
        return res.status(400).json({ message: 'All fields required' })
    }
    const student = await Student.findById(id).exec()
    if (!student) {
        return res.status(400).json({ message: 'Student not found' })
    }
    await Student.deleteOne({ _id: id })
    res.json({ message: `Student ${student.firstname} with index ${student.index} deleted` })
})

const studentsWithoutSupervisor = asyncHandler(async (req, res) => {
    const studentsWithoutSupervisor = await Student.find({ supervisor: null }).lean().exec();
    if (!studentsWithoutSupervisor?.length) {
        return res.status(404).json({ message: 'No students without supervisor found' });
    }
    res.json(studentsWithoutSupervisor);
});






module.exports = {
    uploadStudents,
    createNewStudent,
    getAllStudents,
    updateStudent,
    deleteStudent,
    studentsWithoutSupervisor
}