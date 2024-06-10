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
      const foundBook = await Book.findOne({ title: args.title })
      if (foundBook) {
        // TODO: throw error here
        return
      }

      let foundAuthor = await Author.findOne({ name: args.author })
      if (!foundAuthor) {
        const author = new Author({ name: args.author })
        foundAuthor = await author.save()
      }

      const book = new Book({ ...args, author: foundAuthor._id })
      await book.save()
      return book.populate('author')
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
