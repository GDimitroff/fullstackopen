const jwt = require('jsonwebtoken');
const morgan = require('morgan');
const chalk = require('chalk');
const logger = require('./logger');
const User = require('../models/user');

morgan.token('post-body', (req, res) => JSON.stringify(req.body));
const requestLogger = morgan((tokens, req, res) => {
  return [
    chalk.cyan(tokens.method(req, res)),
    chalk.greenBright(tokens.url(req, res)),
    chalk.magentaBright(tokens.status(req, res)),
    chalk.grey(tokens['response-time'](req, res) + ' ms'),
    chalk.whiteBright(tokens['post-body'](req, res))
  ].join(' ');
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  } else if (
    error.name === 'MongoServerError' &&
    error.message.includes('E11000 duplicate key error')
  ) {
    return response
      .status(400)
      .json({ error: 'expected `username` to be unique' });
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'token invalid' });
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired'
    });
  }

  next(error);
};

const getTokenFromRequest = (request) => {
  const authorization = request.get('authorization');

  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '');
  }

  return null;
};

const userExtractor = async (request, response, next) => {
  const token = getTokenFromRequest(request);

  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' });
  }

  const user = await User.findById(decodedToken.id);
  request.user = user;

  next();
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  userExtractor
};
