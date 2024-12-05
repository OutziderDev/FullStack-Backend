const Blog = require('../models/blogModel')

const initialBlogs = [
  {
    title: 'Blog de Musica',
    author: 'Alejando Torres',
    url: 'AlejandroTorres@gmail.com',
    likes: 12
  },
  {
    title: 'Blog de Futbol',
    author: 'Cristiano Ronaldo',
    url: 'CR7@gmail.com',
    likes: 124
  }
]

const BlogInDB = async () => {
  const blogs = await Blog.find({})
  return blogs.map(b => b.toJSON)
}

module.exports = { initialBlogs, BlogInDB }