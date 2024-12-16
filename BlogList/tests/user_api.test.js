const { test, describe, after,beforeEach } = require('node:test')
const assert = require('node:assert')
const superTest = require('supertest')
const app = require('../app')
const api = superTest(app)
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const User = require('../models/usersModel')
const helper = require('../tests/test_helper')

describe('Test for users', () => {

  beforeEach( async () => {
    await User.deleteMany({})
    const pass = '123'
    const passwordHash = await bcrypt.hash(pass,10)
    const user = new User({ username:'mluukkai',name:'Matti Luukkainen', passwordHash:passwordHash })
    await user.save()
  })

  test('when user is duplicate', async () => {
    const userAtStart = await helper.UserInBd()
    //console.log('totalstar',userAtStart.length )

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: '123'
    }
    //console.log('newUser',newUser )
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    //console.log('rest body',result.body )
    //console.log('result', result )
    assert(result.body.error.includes('The user exist, can be unique' ))

    const usersAtEnd = await helper.UserInBd()
    //console.log('totalEnd',usersAtEnd.length )
    assert.strictEqual(usersAtEnd.length, userAtStart.length)
  })

  after( async () => {
    mongoose.connection.close()
  })
})