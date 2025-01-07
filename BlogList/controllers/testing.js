const testingRouter = require('express').Router()
const blogTesting = require('../models/blogModel')
const userTesting = require('../models/usersModel')

testingRouter.post('/reset', async (request,response) => {
  await blogTesting.deleteMany({})
  await userTesting.deleteMany({})
  response.status(204).end()
})

module.exports = testingRouter