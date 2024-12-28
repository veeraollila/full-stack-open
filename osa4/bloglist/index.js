import app from './app.js'
import logger from './utils/logger.js'
import config from './utils/config.js'

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})