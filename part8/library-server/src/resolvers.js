import { v4 as uuid } from 'uuid'

let authors = [
  {
    name: 'Robert Martin',
    id: 'afa51ab0-344d-11e9-a414-719c6709cf3e',
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: 'afa5b6f0-344d-11e9-a414-719c6709cf3e',
    born: 1963,
  },
  {
    name: 'Fyodor Dostoevsky',
    id: 'afa5b6f1-344d-11e9-a414-719c6709cf3e',
    born: 1821,
  },
  {
    name: 'Joshua Kerievsky',
    id: 'afa5b6f2-344d-11e9-a414-719c6709cf3e',
  },
  {
    name: 'Sandi Metz',
    id: 'afa5b6f3-344d-11e9-a414-719c6709cf3e',
  },
]

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: 'afa5b6f4-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring'],
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: 'afa5b6f5-344d-11e9-a414-719c6709cf3e',
    genres: ['agile', 'patterns', 'design'],
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: 'afa5de00-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring'],
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: 'afa5de01-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring', 'patterns'],
  },
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: 'afa5de02-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring', 'design'],
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: 'afa5de03-344d-11e9-a414-719c6709cf3e',
    genres: ['classic', 'crime'],
  },
  {
    title: 'Demons',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: 'afa5de04-344d-11e9-a414-719c6709cf3e',
    genres: ['classic', 'revolution'],
  },
]

export const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (_, { author, genre }) => {
      if (!author && !genre) {
        return books
      }

      return books.filter((b) => {
        if (author && genre) {
          return b.author === author && b.genres.includes(genre)
        } else if (author) {
          return b.author === author
        } else if (genre) {
          return b.genres.includes(genre)
        }
        return false
      })
    },
    allAuthors: () => authors,
  },

  Mutation: {
    addBook: (_, args) => {
      const { title, author, published, genres } = args
      const book = { title, author, published, genres, id: uuid() }

      books = books.concat(book)
      if (!authors.find((a) => a.name === author)) {
        authors = authors.concat({ name: author, id: uuid() })
      }

      return book
    },
    editAuthor: (_, args) => {
      const { name, setBornTo } = args
      const author = authors.find((a) => a.name === name)

      if (!author) {
        return null
      }

      const updatedAuthor = { ...author, born: setBornTo }
      authors = authors.map((a) => (a.name === name ? updatedAuthor : a))
      return updatedAuthor
    },
  },

  Author: {
    bookCount: ({ name }) => books.filter((b) => b.author === name).length,
  },
}