import DataLoader from 'dataloader'

import Book from './models/book.js'

const batchBookCount = async (authorIds) => {
  const books = await Book.find({ author: { $in: authorIds } })

  const bookCountByAuthor = {}
  books.forEach((book) => {
    const authorId = book.author.toString()
    bookCountByAuthor[authorId] = (bookCountByAuthor[authorId] || 0) + 1
  })

  return authorIds.map((id) => bookCountByAuthor[id.toString()] || 0)
}

const bookCountLoader = new DataLoader((authorIds) => batchBookCount(authorIds))

export default { bookCountLoader }
