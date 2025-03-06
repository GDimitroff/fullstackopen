require('dotenv').config()
const { Sequelize, QueryTypes } = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_URL)

const main = async () => {
  try {
    await sequelize.authenticate()
    const blogs = await sequelize.query('SELECT * FROM blogs', { type: QueryTypes.SELECT })
    blogs.forEach((b) => {
      console.log(b.author + ': ' + b.title + ', ' + b.likes + ' likes')
    })
    sequelize.close()
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

main()
