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


  test('chek Post route and count in BD', async () => {
    const addblog = {
      title: 'Geografia',
      author: 'Alejando Magno',
      url: 'Elmagnanimo@gmail.com',
      likes: 490
    }

    await blog_api
      .post('/api/blogs')
      .send(addblog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsTotal = await helper.BlogInDB()
    assert.strictEqual(blogsTotal.length,helper.initialBlogs.length + 1)
  })

  test('If likes is miss, prop 0 by default', async () => {
    const addblogWithoutLikes = {
      title: 'Blog de Quimica',
      author: 'Marie Curi',
      url: 'LosCurieteam@gmail.com'
    }

    const response = await blog_api
      .post('/api/blogs')
      .send(addblogWithoutLikes)
      .expect(201)

    const saveBlog = response.body
    assert.strictEqual(saveBlog.likes,0)
  })

  test('blog without other props is not added', async () => {
    const blogWithoutTitle = {
      author: 'Carl Sagan',
      url: 'cosmos@example.com',
    }

    const blogWithoutUrl = {
      author: 'Carl Sagan',
      title: 'Cosmos',
    }

    await blog_api
      .post('/api/blogs')
      .send(blogWithoutTitle)
      .expect(400)

    await blog_api
      .post('/api/blogs')
      .send(blogWithoutUrl)
      .expect(400)

    const countBdReally = await helper.BlogInDB()
    assert.strictEqual(helper.initialBlogs.length,countBdReally.length)
  })

  describe('4.13 for delete Test', () => {
    test('Test for delete unique obj in BD', async () => {
      const blogsBefore = await helper.BlogInDB()
      //console.log('blogbefore',blogsBefore)
      const objToDelete = blogsBefore[0]
      //console.log('objtodelete',objToDelete)

      await blog_api
        .delete(`/api/blogs/${objToDelete.id}`)
        .expect(204)

      const blogsAfter = await helper.BlogInDB()
      assert.strictEqual(blogsAfter.length, blogsBefore.length - 1  )

      const ids = blogsAfter.map(blog => blog.id)
      assert.strictEqual(ids.includes(objToDelete.id), false, )
    })
  })

  describe('Test 4.14 Update likes of Blogs', () => {
    test('correctly change Likes in blogs post', async () => {

      const totalBlogs = await helper.BlogInDB()
      const selectBlog = totalBlogs[0]
      //console.log('el seleccionado',selectBlog)
      const updateLikes = { ...selectBlog, likes: selectBlog.likes + 1000 }

      const response = await blog_api
        .put(`/api/blogs/${selectBlog.id}`)
        .send(updateLikes)
        .expect(200)

      assert.strictEqual(response.body.likes,selectBlog.likes + 1000)
    })
  })

  after( async () => {
    await mongoose.connection.close()
  })
})