require('dotenv').config()
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const path = require('path')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const PORT = process.env.PORT || 2020

connectDB()

app.use(express.json())

app.use(cors())

app.use(cookieParser(corsOptions))

app.use('/', express.static(path.join(__dirname, 'public')))
app.use('/users', require('./routes/userRoutes'))
app.use('/students', require('./routes/studentsRoute'))
app.use('/login', require('./routes/authRoute'))
app.use('/projects', require('./routes/projectRoute'))

app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found')
    }
})

mongoose.connection.once('open', () => {
    console.log('connected to DATABASE');
    app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))
})

mongoose.connection.on('error', err => {
    console.log(err);
})