const userRouter = require('express').Router()
const User = require('../models/usersModel')
const bcrypt = require('bcryptjs')

userRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

userRouter.post('/', async (request,response) => {
  const { username, name, password } = request.body

  if (!username || !password ) {
    return response.status(400).json({ error: 'Missing password or username' })
  }
  const passwordHash = await bcrypt.hash(password,10)

  const newUser = new User({
    username,
    name,
    passwordHash
  })

  const saveUser = await newUser.save()
  response.status(201).json(saveUser)
})

module.exports = userRouter