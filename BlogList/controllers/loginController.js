const loginRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const bscrypt = require('bcryptjs')
const User = require('../models/usersModel')

/*loginRouter.get('/', async (request,response) => {
  response.json({ message:'in route' })
})*/

loginRouter.post('/', async (request,response) => {
  const { username, password } = request.body

  const userData = await User.findOne({ username })

  const correctPassword = userData === null
    ? false
    : await bscrypt.compare(password,userData.passwordHash)

  if (!(userData && correctPassword)) {
    response.status(401).json({ error: 'Invalid username or password' })
  }

  const userForToken = {
    username: userData.username,
    id:userData._id
  }

  const token = jwt.sign(userForToken, process.env.SECRET,{ expiresIn : 60*60 })

  response.status(200).send({ token,username: userData.username, name: userData.name })
})

module.exports = loginRouter