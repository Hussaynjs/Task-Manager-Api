const User = require('../model/user')
const jwt = require('jsonwebtoken')
const { UnauthenticatedError} = require('../errors')
require('dotenv').config()

const auth = async(req, res, next) => {
try {
    const token = req.header('Authorization').replace('Bearer ', '')
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findOne({_id:decoded._id, 'Tokens.token': token})
    if(!user){
        throw new Error()
    }
    req.user = user
    req.token = token

    
    next()
} catch (error) {
    res.status(401).send({ error: 'Please authenticate.' })
}
}

module.exports = auth