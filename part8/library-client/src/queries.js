import { gql } from '@apollo/client'

export const BOOKS = gql(`
  query getAllBooks {
    allBooks {
      title
      published
      author
      id
    }
  }
`)

export const AUTHORS = gql(`
  query getAllAuthors {
    allAuthors {
      id
      name
      born
      bookCount
    }
  }
`)
