const express = require('express')
const router = express.Router()
const { logoutAll,
    getProfile,
    logoutUser,
    updateUser,
    deleteUser} = require('../controller/user')


router.route('/profile').get(getProfile)
router.route('/me').patch(updateUser)
router.route('/deleteAccount').delete(deleteUser)
router.route('/logout').post(logoutUser)
router.route('/logoutAll').post(logoutAll)


module.exports = router