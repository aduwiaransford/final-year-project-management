const express = require('express')
const router = express.Router()
const projectsController = require('../controllers/projectController')

router.route('/')
    .get(projectsController.getAllCategories)
    .post(projectsController.createCategory)


module.exports = router