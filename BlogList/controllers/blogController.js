const blogRouter = require('express').Router()
const Blog = require('../models/blogModel')
const User = require('../models/usersModel')
const jwt = require('jsonwebtoken')
const secret = require('../utils/Config').SECRET

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user',{ username:1,name:1,id:1 })
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const { title, url,author,likes } = request.body

  if(!title || !url){
    return response.status(400).json({ error:'tittle or url are required' })
  }

  const decodedToken = jwt.verify(request.token,secret)
  if (!decodedToken.id) {
    return response.status(401).json({ errors: 'Token Invalid' })
  }
  //console.log('decoded token', decodedToken )
  const user = await User.findById(decodedToken.id)
  //console.log('usuario',user )
  const blog = new Blog ({
    title,
    url,
    author,
    likes: likes || 0,
    user:user._id
  })

  const saveBlog = await blog.save()
  user.blogs = user.blogs.concat(saveBlog._id)
  await user.save()

  response.status(201).json(saveBlog)
})

blogRouter.delete('/:id', async (req,res) => {
  //console.log('el id que llega',req.params.id)
  await Blog.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

blogRouter.put('/:id', async (request,response) => {
  const body = request.body

  const updateBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  const update = await Blog.findByIdAndUpdate(request.params.id, updateBlog, { new:true })
  response.json(update)
})

module.exports = blogRouter