const Blog = require('./blog')
const User = require('./user')
const Reading = require('./reading')

Blog.belongsTo(User)
User.hasMany(Blog)

User.belongsToMany(Blog, { through: Reading, as: 'readings' })
Blog.belongsToMany(User, { through: Reading, as: 'readers' })

module.exports = {
  Blog,
  User,
  Reading,
}
