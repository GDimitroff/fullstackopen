import DataLoader from 'dataloader'

import Book from './models/book.js'

const batchBookCount = async (authorIds) => {
  const books = await Book.find({ author: { $in: authorIds } })

  const bookCountMap = {}
  books.forEach((book) => {
    const authorId = book.author.toString()
    bookCountMap[authorId] = (bookCountMap[authorId] || 0) + 1
  })

  return authorIds.map((id) => bookCountMap[id.toString()] || 0)
}

const bookCountLoader = new DataLoader((authorIds) => batchBookCount(authorIds))

export { bookCountLoader }
