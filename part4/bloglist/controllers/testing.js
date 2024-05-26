const { Router } = require('express')
const User = require('../models/user')
const Blog = require('../models/blog')

const testingRouter = Router()

testingRouter.post('/reset', async (request, response) => {
  await User.deleteMany({})
  await Blog.deleteMany({})

  response.status(204).end()
})

module.exports = testingRouter
