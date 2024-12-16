
const errorHandler = (error,request,response,next) => {
  //console.log('errorArray',error )
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return response.status(400).json({ error:'The user exist, can be unique' })
  }

  next(error)
}

module.exports = { errorHandler }