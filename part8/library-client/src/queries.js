import { gql } from '@apollo/client'

export const BOOKS = gql(`
  query getAllBooks {
    allBooks {
      title
      published
      author {
        id
        name
        born
      }
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

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`
