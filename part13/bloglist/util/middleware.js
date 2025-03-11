const jwt = require('jsonwebtoken')

const { User, Session } = require('../models')

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  if (error.name === 'SequelizeValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'SequelizeDatabaseError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'token invalid' })
  }

  next(error)
}

const getTokenFromRequest = (request) => {
  const authorization = request.get('authorization')

  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }

  return null
}

const userExtractor = async (request, response, next) => {
  const token = getTokenFromRequest(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findByPk(decodedToken.id)
  const session = await Session.findOne({ where: { userId: user.id } })

  if (!session) {
    return response.status(401).json({ error: 'session invalid' })
  }

  request.user = user

  next()
}

module.exports = {
  unknownEndpoint,
  errorHandler,
  userExtractor,
}
