import { GraphQLError } from 'graphql'
import jwt from 'jsonwebtoken'
import { PubSub } from 'graphql-subscriptions'

import User from './models/user.js'
import Book from './models/book.js'
import Author from './models/author.js'

const pubsub = new PubSub()

export const resolvers = {
  Query: {
    me: (_, __, { currentUser }) => currentUser,
    bookCount: async () => Book.countDocuments(),
    authorCount: async () => Author.countDocuments(),
    allBooks: async (_, { author, genre }) => {
      const query = {}

      const foundAuthor = await Author.findOne({ name: author }, '_id')
      if (foundAuthor) {
        query.author = foundAuthor._id
      }

      if (genre && genre !== 'all') {
        query.genres = { $in: [genre] }
      }

      return await Book.find(query).populate('author')
    },
    allAuthors: async () => Author.find({}),
    allGenres: async () => {
      const genres = await Book.find({}, 'genres')
      return ['all', ...new Set(genres.flatMap((book) => book.genres))]
    },
    recommended: async (_, __, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }

      return Book.find({
        genres: { $in: [currentUser.favoriteGenre] },
      }).populate('author')
    },
  },

  Mutation: {
    createUser: async (_, { username, favoriteGenre }) => {
      const user = new User({ username, favoriteGenre })

      try {
        await user.save()
        return user
      } catch (error) {
        throw new GraphQLError('Creating user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: { username, favoriteGenre },
            error,
          },
        })
      }
    },
    login: async (_, { username, password }) => {
      const user = await User.findOne({ username })

      if (!user || password !== 'secret') {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
    addBook: async (_, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }

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
        pubsub.publish('BOOK_ADDED', { bookAdded: book.populate('author') })
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
    editAuthor: async (_, { name, setBornTo }, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }

      const author = await Author.findOneAndUpdate(
        { name },
        { born: setBornTo },
        { new: true }
      )

      return author
    },
  },

  Author: {
    bookCount: async ({ _id }, _, { loaders }) => {
      return await loaders.bookCountLoader.load(_id)
    },
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
    },
  },
}
