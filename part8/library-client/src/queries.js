import { gql } from '@apollo/client'

export const BOOKS = gql(`
  query GetAllBooks {
    allBooks {
      title
      published
      author
      id
    }
  }
`)

export const AUTHORS = gql(`
  query GetAllAuthors {
    allAuthors {
      id
      name
      born
      bookCount
    }
  }
`)
