const express = require('express')

const authController = require('../controllers/authController')
const userController = require('../controllers/userController')

const router = express.Router()

router.post('/signup', authController.signup)
router.post('/login', authController.login)

router.post('/forgotPassword', authController.forgotPassword)
router.patch('/resetPassword/:token', authController.resetPassword)

// User must be authenticated after this middleware
router.use(authController.authenticated)

router.get('/', authController.restrictTo('admin'), userController.getAllUser)

router.get('/currentUser', userController.getUser)

router.patch(
  '/me',
  userController.uploadProfilePhoto,
  userController.resizeUserPhoto,
  userController.updateCurrentUser,
)
router.patch('/updateMyPassword', authController.updatePassword)
router.get('/deactivate', userController.deactivate)
router.post('/logout', authController.logout)

module.exports = router
