import dotenv from 'dotenv'
dotenv.config()

import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import config from './utils/config.js'
import logger from './utils/logger.js'
import middleware from './utils/middleware.js'
import router from './controllers/blogs.js'

const app = express()

const mongoUrl = process.env.MONGODB_URI
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/blogs', router)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

export default app