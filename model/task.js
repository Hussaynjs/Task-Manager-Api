const { required } = require('joi')
const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: String,
        default: false
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        required: true
    }
},{timestamps: true})

module.exports = mongoose.model('Task', taskSchema)