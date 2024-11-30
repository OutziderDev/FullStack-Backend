const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length === 0 ) {
    return 0
  } else if (blogs.length === 1) {
    blogs[0].likes
  }

  const total = blogs.reduce((acumulador,bloglikes) => acumulador + bloglikes.likes  ,0)
  //console.log(total)
  return  total
}

const favoriteBlog = (blog) => {
  if (blog.length === 0){
    return {}
  }
  const favorite = blog.reduce((favorite,blogArray) => {
    return blogArray.likes > favorite.likes ? blogArray : favorite
  })

  const dataBlogExport = {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  }
  return dataBlogExport
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0)  return {}

  const authorBlogCounts = blogs.reduce((acc, blog) => {
    acc[blog.author] = (acc[blog.author] || 0) + 1
    return acc
  }, {})

  const maxAutor = Object.keys(authorBlogCounts).reduce((max,author) => {
    if (authorBlogCounts[author] > max.blogs) {
      return { author, blogs: authorBlogCounts[author] }
    }
    return max
  },{ author: '', blogs: 0 })

  return maxAutor
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs }