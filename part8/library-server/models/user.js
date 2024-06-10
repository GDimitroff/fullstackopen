import { Schema, model } from 'mongoose'
const uniqueValidator = require('mongoose-unique-validator')

const schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },
  favoriteGenre: {
    type: String,
    required: true,
  },
})

schema.plugin(uniqueValidator)

export default model('User', schema)
