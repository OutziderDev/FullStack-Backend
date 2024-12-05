const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogRouter = require('./controllers/blogController')
const config = require('./utils/Config')
const logger = require('./utils/Logger')
const mongoose = require('mongoose')

app.use(cors())
app.use(express.json())
//Connecting BD
mongoose.set('strictQuery',false)
mongoose.connect(config.MONGO_URL)
  .then(() => {
    logger.info('connected to MongoDB')
  }).catch((err) => {
    logger.error('error',err)
  })

//Routes
app.use('/api/blogs',blogRouter)

module.exports = app