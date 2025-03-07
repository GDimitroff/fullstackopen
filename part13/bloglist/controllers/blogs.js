const router = require('express').Router()

const { Blog, User } = require('../models')
const { userExtractor } = require('../util/middleware')

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name', 'username'],
    },
  })

  res.json(blogs)
})

router.post('/', userExtractor, async (req, res) => {
  const blog = await Blog.create({ ...req.body, userId: req.user.id })
  res.status(201).json(blog)
})

router.get('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    res.json(req.blog)
  } else {
    res.status(404).end()
  }
})

router.put('/:id', [blogFinder, userExtractor], async (req, res) => {
  if (req.blog) {
    await req.blog.update(req.body)
    res.json(req.blog)
  } else {
    res.status(404).end()
  }
})

router.delete('/:id', [blogFinder, userExtractor], async (req, res) => {
  const { blog, user } = req

  if (!blog) {
    return res.status(404).end()
  }

  if (blog.userId !== user.id) {
    return res.status(401).json({ error: 'unauthorized operation' })
  }

  await req.blog.destroy()
  res.status(204).end()
})

module.exports = router
