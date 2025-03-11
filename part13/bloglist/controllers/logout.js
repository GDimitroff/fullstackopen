const router = require('express').Router()

const { Session } = require('../models')
const { userExtractor } = require('../util/middleware')

router.delete('/', userExtractor, async (request, response) => {
  await Session.destroy({ where: { userId: request.user.id } })

  response.status(204).end()
})

module.exports = router
