const config = require('./utils/config')
const express = require('express')
const path = require('path')
require('express-async-errors')
const app = express()
const cors = require('cors')
const loginRouter = require('./controllers/login')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static(path.join(__dirname, 'ui', 'dist')))
app.use(express.json())

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

if (process.env.NODE_ENV !== 'test') {
  app.use(middleware.requestLogger)
}

app.use('/api/health', (req, res) => {
  res.send('ok')
})

app.use('/api/version', (req, res) => {
  res.send('7')
})

app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/blogs', blogsRouter)

// Handle unknown API endpoints
app.use('/api/*', middleware.unknownEndpoint)

// Serve React app for non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'ui', 'dist', 'index.html'))
})

app.use(middleware.errorHandler)

module.exports = app
