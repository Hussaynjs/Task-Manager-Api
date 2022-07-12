const express = require('express')
const { createUser, loginUser } = require('../controller/auth')
const router = express.Router()



router.route('/sign-up').post(createUser)
router.route('/login').post(loginUser)



module.exports = router