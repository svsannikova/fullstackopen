const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users)
})

userRouter.get('/:id', async (request, response, next) => {
    try{
        const user = await User.findById(request.params.id)
        if (user) {
            response.json(user)
        } else {
            response.status(404).end()
        }
    }
    catch(ex)
    {
        next(ex)
    }
})

userRouter.post('/', async (request, response, next) => {
    const body = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        password: passwordHash,
        name: body.name
    })

    try
    {
        if(body.username.length < 3 || body.password.length < 3)
        {
            response.status(400).end()
        }
        else
        {
            const savedUser = await user.save()
            response.json(savedUser)
        }
    }
    catch(ex)
    {
        next(ex)
    }
})

userRouter.delete('/:id', async (request, response, next) => {
    try
    {
        await User.findByIdAndRemove(request.params.id)
        response.status(204).end()
    }
    catch(ex)
    {
        next(ex)
    }
})

userRouter.put('/:id', async (request, response, next) => {
    const body = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = {
        username: body.username,
        password: passwordHash,
        name: body.name
    }

    try
    {
        const updatedUser = await User.findByIdAndUpdate(request.params.id, user, { new: true })
        response.json(updatedUser)
    }
    catch(ex)
    {
        next(ex)
    }
})

module.exports = userRouter