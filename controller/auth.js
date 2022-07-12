const { StatusCodes } = require('http-status-codes')
const User = require('../model/user')

const createUser = async(req, res) => {
  const user = await  User.create(req.body)
  const token =await user.generateAuthToken()
  res.status(StatusCodes.CREATED).json({user, token})
}

const loginUser = async(req, res) => {
   const user = await User.findByCredentials(req.body.email, req.body.password)
   const token =await user.generateAuthToken()
   res.status(StatusCodes.OK).json({user, token})
}

module.exports = {createUser, loginUser}