const blogRouter = require('express').Router()
const Blog = require('../models/blogModel')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const { title, url,author,likes } = request.body

  if(!title || !url){
    return response.status(400).json({ error:'tittle or url are required' })
  }

  const blog = new Blog ({
    title,
    url,
    author,
    likes: likes || 0
  })

  const saveBlog = await blog.save()
  response.status(201).json(saveBlog)

})

blogRouter.delete('/:id', async (req,res) => {
  //console.log('el id que llega',req.params.id)
  await Blog.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

module.exports = blogRouter