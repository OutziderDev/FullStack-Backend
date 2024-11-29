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

module.exports = { dummy, totalLikes }