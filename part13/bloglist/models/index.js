const Blog = require('./blog')
const User = require('./user')
const Reading = require('./reading')
const Session = require('./session')

Blog.belongsTo(User)
User.hasMany(Blog)

User.belongsToMany(Blog, { through: Reading, as: 'readings' })
Blog.belongsToMany(User, { through: Reading, as: 'readers' })

User.hasOne(Session)
Session.belongsTo(User)

module.exports = {
  Blog,
  User,
  Reading,
}
