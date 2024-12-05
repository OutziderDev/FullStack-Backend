const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const Blog = require('../models/blogModel')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const superTest = require('supertest')
const app = require('../app')

const blog_api = superTest(app)

describe('Blog_api_Tests',  () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    //console.log('Cleared')
    const blogObject = helper.initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObject.map(blog => blog.save())
    await Promise.all(promiseArray)
    //console.log('done')
  })

  test('notes are returned as json and correct list length', async () => {
    const response = await blog_api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.length,helper.initialBlogs.length)
  })

  after( async () => {
    await mongoose.connection.close()
  })
})