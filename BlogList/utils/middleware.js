const jwt = require('jsonwebtoken')
const User = require('../models/usersModel')
const secret = require('../utils/Config').SECRET

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
  //console.log('autorization is', authorization)
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '')
    //return authorization.replace('Bearer ', '')
  }else {
    request.token = null
  }

  next()
}

const userExtractor = async (request,response,next) => {
  const token = request.token
  //console.log('toten in middle', token)
  const decoded = jwt.verify(token,secret)
  //console.log('decoded in middleware', decoded )
  if (!decoded.id) {
    return response.status(401).json({ error: 'Token invalid' })
  }
  //console.log('desde midleware el ID ->', decoded.id )
  const user = await User.findById(decoded.id)
  //console.log('user in middleware',user )
  //console.log('el usuario despues de buscar',user )
  request.user = user
  next()
}

module.exports = { errorHandler,tokenExtractor,userExtractor }