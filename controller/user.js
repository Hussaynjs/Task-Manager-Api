const { BadRequestError,
    CustomAPIError,
    NotFoundError} = require('../errors')


const getProfile = async(req, res) => {
    res.send(req.user)
    console.log(req.user)
}

const logoutUser = async(req, res) => {
    req.user.Tokens = req.user.Tokens.filter((token) => token.token !== req.token)
    await req.user.save()
    res.send()
}

const logoutAll = async (req, res) => {
    req.user.Tokens = []
    await req.user.save()
    res.send()
}

const updateUser = async(req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const validUpdates = updates.every((update) => allowedUpdates.includes(update))

    if(!validUpdates){
        throw new BadRequestError('invalid update')
    }

    updates.forEach((update) => req.user[update] = req.body[update])
    await req.user.save()
    res.json(req.user)
}

const deleteUser = async(req, res) => {
    await req.user.remove()
    await req.user.save()
    res.send('deleted')
}





module.exports = {
    logoutAll,
    getProfile,
    logoutUser,
    updateUser,
    deleteUser
}