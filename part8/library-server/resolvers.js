import { GraphQLError } from 'graphql'

import Book from './models/book.js'
import Author from './models/author.js'

export const resolvers = {
  Query: {
    bookCount: async () => Book.countDocuments(),
    authorCount: async () => Author.countDocuments(),
    allBooks: async (_, { author, genre }) => {
      const query = {}

      const foundAuthor = await Author.findOne({ name: author }, '_id')
      if (foundAuthor) {
        query.author = foundAuthor._id
      }

      if (genre) {
        query.genres = { $in: [genre] }
      }

      return await Book.find(query).populate('author')
    },
    allAuthors: async () => Author.find({}),
  },

  Mutation: {
    addBook: async (_, args) => {
      let foundAuthor = await Author.findOne({ name: args.author })

      if (!foundAuthor) {
        try {
          const author = new Author({ name: args.author })
          foundAuthor = await author.save()
        } catch (error) {
          throw new GraphQLError('Creating author failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.author,
              error,
            },
          })
        }
      }

      const book = new Book({ ...args, author: foundAuthor._id })

      try {
        await book.save()
        return book.populate('author')
      } catch (error) {
        throw new GraphQLError('Creating book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
            error,
          },
        })
      }
    },
    editAuthor: async (_, { name, setBornTo }) => {
      const author = await Author.findOneAndUpdate(
        { name },
        { born: setBornTo },
        { new: true }
      )

      return author
    },
  },

  Author: {
    bookCount: async ({ _id }) => {
      return await Book.countDocuments({ author: _id })
    },
  },
}
