const router = require('express').Router()

const { Blog, User, Reading } = require('../models')

router.post('/', async (req, res) => {
  const { userId, blogId } = req.body

  const user = await User.findByPk(userId)
  const blog = await Blog.findByPk(blogId)

  if (!user || !blog) {
    return res.status(400).json({ error: 'invalid user or blog' })
  }

  const reading = await Reading.create({
    userId,
    blogId,
  })

  res.status(201).json(reading)
})

module.exports = router
