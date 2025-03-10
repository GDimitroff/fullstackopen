const router = require('express').Router()

const { Blog, User, Reading } = require('../models')
const { userExtractor } = require('../util/middleware')

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

router.put('/:id', userExtractor, async (req, res) => {
  const reading = await Reading.findByPk(req.params.id)

  if (!reading) {
    return res.status(404).json({ error: 'reading not found' })
  }

  if (reading.userId !== req.user.id) {
    return res.status(401).json({ error: 'unauthorized' })
  }

  await reading.update({ read: true })

  res.status(201).json(reading)
})

module.exports = router
