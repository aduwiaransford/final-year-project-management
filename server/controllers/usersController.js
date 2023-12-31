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


//toggle admin status
const toggleAdmin = asyncHandler(async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ message: "User ID required" });
    }
    const user = await User.findById(id).exec();

    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }

    user.isAdmin = !user.isAdmin;
    await user.save();

    res.json({ message: `${user.name} admin status updated` });
});

//delete a user
const deleteUser = asyncHandler(async (req, res) => {
    const { ids } = req.body; // Array of student IDs
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({ message: 'Invalid User IDs provided' });
    }

    const deletedUserIds = [];

    for (const id of ids) {
        const user = await User.findById(id).exec();
        if (!user) {
            console.log("Lecturer not found");
            continue; // Skip this iteration and continue with the next ID
        }

        await User.deleteOne({ _id: id });
        deletedUserIds.push(id);
    }

    res.json({ message: 'Students deleted successfully', deletedUserIds });
});

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

//change user password
const changePassword = asyncHandler(async (req, res) => {
    const { userId, currentPassword, newPassword } = req.body;

    const user = await User.findById(userId).exec();
    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid current password" });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    res.json({ message: "Password updated successfully" });
});


const resetPassword = asyncHandler(async (req, res) => {
    const { userId, newPassword } = req.body;

    const user = await User.findById(userId).exec();
    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    res.json({ message: "Password updated successfully" });
});


module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser,
    assignStudent,
    changePassword,
    resetPassword,
    toggleAdmin
};
