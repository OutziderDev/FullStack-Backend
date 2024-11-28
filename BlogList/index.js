const app = require('./app')
const config = require('./utils/Config')
const logger = require('./utils/Logger')

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
  logger.info('Press Ctrl + C to Exit of App')
})
