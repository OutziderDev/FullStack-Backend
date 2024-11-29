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

module.exports = { dummy, totalLikes, favoriteBlog }