const blogRouter = require('express').Router()
const Blog = require('../models/blogModel')
//const User = require('../models/usersModel')
const jwt = require('jsonwebtoken')
const secret = require('../utils/Config').SECRET
const middleware = require('../utils/middleware')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user',{ username:1,name:1,id:1 })
  response.json(blogs)
})

blogRouter.post('/',middleware.userExtractor, async (request, response) => {
  const { title, url,author,likes } = request.body
  //console.log('title',title )
  if(!title || !url){
    return response.status(400).json({ error:'tittle or url are required' })
  }

  const decodedToken = jwt.verify(request.token,secret)

  if (!decodedToken.id) {
    return response.status(401).json({ errors: 'Token Invalid' })
  }
  //console.log('decoded token', decodedToken )
  //const user = await User.findById(decodedToken.id)
  const user = request.user
  //console.log('usuario igual a el request user', user )
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
  const decodedToken = jwt.verify(req.token,secret)
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'Token Invalid' })
  }

  const blog = await Blog.findById(req.params.id)

  if (!blog) {
    return res.status(404).json({ error: 'Blog not found' })
  }

  if (decodedToken.id.toString() === blog.user.toString()) {
    await Blog.findByIdAndDelete(req.params.id)
    return res.status(204).end()
  }else{
    return res.status(403).json({ error: 'you arent the own of this blog' })
  }
})

blogRouter.put('/:id', async (request,response) => {
  const body = request.body

  const updateBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  const update = await Blog.findByIdAndUpdate(request.params.id, updateBlog, { new:true }).populate('user',{ username:1,name:1,id:1 })
  response.json(update)
})

module.exports = blogRouter