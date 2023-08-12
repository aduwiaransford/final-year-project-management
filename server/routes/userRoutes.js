const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')
// const verify = require('../middleware/verifyJWT')

// router.use(verify)

router.route('/')
    .get(usersController.getAllUsers)
    .post(usersController.createNewUser)
    .patch(usersController.updateUser)
    .delete(usersController.deleteUser)

router.route('/assign')
    .post(usersController.assignStudent)

router.route('/changepassword')
    .post(usersController.changePassword)

module.exports = router