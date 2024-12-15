const express = require('express')
const router = express.Router()
const { getAsync } = require('../redis')

router.get('/', async (req, res) => {
  const count = Number(await getAsync('added_todos')) || 0
  res.send({
    added_todos: count,
  })
})

module.exports = router
