const bcrypt = require('bcrypt')
const router = require('express').Router()

const { User, Blog } = require('../models')
const { userExtractor } = require('../util/middleware')

const isAdmin = async (req, res, next) => {
  const user = await User.findByPk(req.user.id)

  if (!user.admin) {
    return res.status(401).json({ error: 'operation not allowed' })
  }

  next()
}

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ['userId'] },
    },
  })
  res.json(users)
})

router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    include: [
      {
        model: Blog,
        attributes: { exclude: ['userId'] },
      },
      {
        model: Blog,
        as: 'readings',
        attributes: { exclude: ['userId'] },
        through: { attributes: ['id', 'read'] },
      },
    ],
  })

  if (!user) {
    return res.status(404).end()
  } else {
    res.json(user)
  }
})

router.post('/', async (req, res) => {
  const { username, password, ...rest } = req.body

  if (!password) {
    return res.status(400).json({
      error: `User validation failed: password is required`,
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = await User.create({
    username,
    passwordHash,
    ...rest,
  })

  res.status(201).json(user)
})

router.put('/:username', userExtractor, isAdmin, async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.params.username,
    },
  })

  if (user) {
    await user.update(req.body)
    res.json(user)
  } else {
    res.status(404).end()
  }
})

module.exports = router
