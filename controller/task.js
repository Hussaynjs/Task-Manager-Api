const Task = require('../model/task')
const {StatusCodes} = require('http-status-codes')
const {NotFoundError} = require('../errors')


const getAllTask = async(req, res) => {
    const tasks = await Task.find({createdBy: req.user._id}).sort('createdAt').limit(7)
    res.status(StatusCodes.OK).json({tasks})
}

const createTask = async(req, res) => {
   const task = await Task.create({...req.body, createdBy: req.user._id})
   res.status(StatusCodes.CREATED).json({task})
}

const getTask = async(req, res) => {
    const task = await Task.findOne({_id: req.params.id, createdBy: req.user._id})
    if(!task){
        throw new NotFoundError('no task with this id')
    }
    res.status(StatusCodes.OK).json({task})
}

const updateTask = async(req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['completed', 'description']
    const validUpdates = updates.every((update) => allowedUpdates.includes(update))

    if(!validUpdates){
        throw new BadRequestError('invalid update')
    }

    const task = await Task.findOne({_id: req.params.id, createdBy: req.user._id})
    if(!task){
        throw new NotFoundError('no task with this id')
    }
    updates.forEach((update) => task[update] = req.body[update])
    await task.save()
    res.json({task})
}

const deleteTask = async(req, res) => {
    const task = await Task.findOneAndDelete({_id: req.params.id, createdBy: req.user._id})
    if(task){
        throw new NotFoundError('no task with this id')
    }
    res.send(task)
}





module.exports = {
    getAllTask,
    getTask,
    updateTask,
    createTask,
    deleteTask
}