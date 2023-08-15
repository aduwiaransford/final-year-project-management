const express = require('express')
const router = express.Router()
const projectsController = require('../controllers/projectController')

router.route('/')
    .get(projectsController.getAllCategories)
    .post(projectsController.createCategory)
router.route('/chapters')
    .get(projectsController.getChaptersByStudentId)
    .post(projectsController.createOrUpdateChapter)
router.route("/summary/:studentId")
    .get(projectsController.getSummaryByStudentId)

router.route("/project-title")
    .post(projectsController.addProjectTitle)

module.exports = router