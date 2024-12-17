
const errorHandler = (error,request,response,next) => {
  //console.log('errorArray',error )
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return response.status(400).json({ error:'The user exist, can be unique' })
  }

  if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error:'Token Expired' })
  }

  if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'Token Invalid' })
  }
  next(error)
}

const tokenExtractor = (request,response,next) => {
  const authorization = request.get('authorization')

  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '')
    //return authorization.replace('Bearer ', '')
  }else {
    request.token = null
  }

  next()
}

module.exports = { errorHandler,tokenExtractor }