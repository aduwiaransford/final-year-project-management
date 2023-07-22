const User = require("../models/User");
const Student = require("../models/Student");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
// const Student = require('../models/Student')

//get all users
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select("-password").lean();
    if (!users?.length) {
        return res.status(400).json({ message: "No users found" });
    }
    res.json(users);
});

//create a new user
const createNewUser = asyncHandler(async (req, res) => {
    const { email, password, isAdmin, firstname, lastname, department, contact } = req.body;
    // check if we have data entered
    if (!email || !password || !firstname || !lastname || !department || !contact) {
        return res.status(400).json({ message: "All fields are required" });
    }

    //check for duplicates
    const duplicate = await User.findOne({ email }).lean().exec();

    if (duplicate) {
        return res.status(409).json({ message: "Username already exists" });
    }
    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const userObject = { email, password: hashedPassword, isAdmin, firstname, lastname, department, contact };
    //create and store new user

    const user = await User.create(userObject);
    if (user) {
        res.status(201).json({ message: `New user ${email} created` });
    } else {
        res.status(400).json({ message: "invalid data received" });
    }
});

//update user info
const updateUser = asyncHandler(async (req, res) => {
    const { id, email, password, isAdmin, firstname, lastname, contact, department } = req.body;

    if (!id || !email) {
        return res.status(400).json({ message: "All fields required" });
    }
    const user = await User.findById(id).exec();

    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }
    const duplicate = await User.findOne({ email }).lean().exec();

    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: "Duplicate email" });
    }

    user.email = email;
    user.isAdmin = isAdmin;
    user.firstname = firstname;
    user.lastname = lastname;
    user.contact = contact;
    user.department = department;


    if (password) {
        user.password = await bcrypt.hash(password, 10);
    }
    const updatedUser = await user.save();

    res.json({ message: `${updatedUser.email} updated` });
});

//delete a user
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.body;
    if (!id) {
        return res.status(400).json({ message: "User ID Requiured" });
    }
    const user = await User.findById(id).exec();

    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }
    const result = await user.deleteOne();

    const reply = `User ${result.firstname} with ID ${result._id} deleted`;
    res.json(reply);
});
//assign a Student
//assign a Student
const assignStudent = asyncHandler(async (req, res) => {
    const { studentId, supervisorId } = req.body;
    try {
        const studentFound = await Student.findOne({ _id: studentId });
        if (!studentFound) {
            return res.status(400).json({ message: "Student not found" });
        }

        const supervisorFound = await User.findOne({ _id: supervisorId });
        if (!supervisorFound) {
            return res.status(400).json({ message: "Supervisor not found" });
        }

        studentFound.supervisor = supervisorId;
        //save student assigned to supervisor
        await studentFound.save();

        res.json(`Student ${studentFound.index} assigned to supervisor ${supervisorFound.firstname + " " + supervisorFound.lastname}`);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error assigning student to supervisor" });
    }
});


module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser,
    assignStudent,
};
