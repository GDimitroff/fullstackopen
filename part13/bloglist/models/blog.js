const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Blog extends Model {}

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    yearWritten: {
      field: 'year_written',
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isInValidRange(value) {
          if (value != null && (value < 1991 || value > new Date().getFullYear())) {
            throw new Error(`yearWritten must be between 1991 and ${new Date().getFullYear()}`)
          }
        },
      },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'blog',
  },
)

module.exports = Blog
