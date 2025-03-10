const Blog = require('./blog')
const User = require('./user')
const Reading = require('./reading')

Blog.belongsTo(User)
User.hasMany(Blog)

User.belongsToMany(Blog, { through: Reading })
Blog.belongsToMany(User, { through: Reading })

module.exports = {
  Blog,
  User,
  Reading,
}
