const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { BadRequestError } = require('../errors')

const userSchema = new mongoose.Schema({
  name: {
      required: true,
      type: String,
      trim: true,
      minlength: 4
  },
  email:{
      type: String,
      trim: true,
      unique: true,
      required: true,
      lowercase: true,
      validate(value){
          if(!validator.isEmail(value)){
              throw new Error('invalid email')
          }
      }
  },
  age: {
      type: Number,
      default: 0,
      validate(value){
          if(value < 0){
              throw new Error('age must be a positive number')
          }
      }
  },
  password: {
      type: String,
      required: true,
      trim: true,
      minlength: 7
  },
  Tokens: [{
      token: {
          required: true,
          type: String
      }
  }]
})

userSchema.methods.toJSON = function(){
    const userObject = this.toObject()

    delete userObject.password;
    delete userObject.Tokens;

    return userObject
}

userSchema.methods.generateAuthToken = async function(){
    const token = jwt.sign({_id:this._id.toString()}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME})
    
    this.Tokens = this.Tokens.concat({token})
    await this.save()
    return token
}

userSchema.statics.findByCredentials = async(email, password) => {
    const user = await User.findOne({email})
    if(!user){
        throw new BadRequestError('invalid credentials')
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        throw new BadRequestError('invalid credentials')
    }

    return user
}

// hashing password
userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
    }

    next()
})

// deleting user task

const User = mongoose.model('User', userSchema)

module.exports = User