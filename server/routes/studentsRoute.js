const express = require('express')
const router = express.Router()
const studentsController = require('../controllers/studentsController')

router.route('/upload')
    .post(studentsController.uploadStudents)

router.route('/')
    .post(studentsController.createNewStudent)
    .get(studentsController.getAllStudents)
    .patch(studentsController.updateStudent)
    .delete(studentsController.deleteStudent)

router.route('/without-supervisor')
    .get(studentsController.studentsWithoutSupervisor)
router.route('/send-mail')
    .post(studentsController.sendMail)

module.exports = router