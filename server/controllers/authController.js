const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const foundUser = await User.findOne({ email }).exec();

    const match = await bcrypt.compare(password, foundUser.password);


    if (!match) {
        return res.status(401).json({ message: 'Wrong email or password' });
    }

    const accessToken = jwt.sign({ isAdmin: foundUser.isAdmin, id: foundUser._id, email: foundUser.email, firstname: foundUser.firstname }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const data = { accessToken, isAdmin: foundUser.isAdmin, firstname: foundUser.firstname }
    if (match) {
        return res.status(200).json({ data });
    }
});

module.exports = {
    login
};
