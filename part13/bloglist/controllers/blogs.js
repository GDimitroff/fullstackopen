const router = require('express').Router()

const { Blog } = require('../models')

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

router.get('/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id)
  if (blog) {
    res.json(blog)
  } else {
    res.status(404).end()
  }
})

router.put('/:id', async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id)

    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' })
    }

    await blog.update(req.body)

    res.json(blog)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id)

    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' })
    }

    await blog.destroy()
    res.status(204).end()
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

module.exports = router
