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
    const blogObject = helper.initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObject.map(blog => blog.save())
    await Promise.all(promiseArray)
  })

  test('notes are returned as json and correct list length', async () => {
    const response = await blog_api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.length,helper.initialBlogs.length)
  })

  test('identifier property name id not _id in BD', async () => {
    const response = await blog_api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    response.body.forEach( blog => {
      assert.strictEqual(blog.id !== undefined,true)
      assert.strictEqual(blog._id, undefined)
    })

  })

  after( async () => {
    await mongoose.connection.close()
  })
})