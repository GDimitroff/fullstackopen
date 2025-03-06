const router = require('express').Router()

const { Blog } = require('../models')

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

router.post('/', async (req, res) => {
  try {
    const blog = await Blog.create(req.body)
    res.json(blog)
  } catch (error) {
    return res.status(400).json(error)
  }
})

router.get('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    res.json(req.blog)
  } else {
    res.status(404).json({ error: 'Blog not found' })
  }
})

router.put('/:id', blogFinder, async (req, res) => {
  try {
    if (!req.blog) {
      return res.status(404).json({ error: 'Blog not found' })
    }

    await req.blog.update(req.body)

    res.json(req.blog)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

router.delete('/:id', blogFinder, async (req, res) => {
  try {
    if (!req.blog) {
      return res.status(404).json({ error: 'Blog not found' })
    }

    await req.blog.destroy()
    res.status(204).end()
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

module.exports = router
