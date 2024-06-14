import { gql } from '@apollo/client'

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    published
    genres
    author {
      id
      name
      born
    }
  }
`

export const ME = gql`
  query getMe {
    me {
      id
      username
      favoriteGenre
    }
  }
`

export const BOOKS = gql`
  ${BOOK_DETAILS}

  query getAllBooks($author: String, $genre: String) {
    allBooks(author: $author, genre: $genre) {
      ...BookDetails
    }
  }
`

export const AUTHORS = gql`
  query getAllAuthors {
    allAuthors {
      id
      name
      born
      bookCount
    }
  }
`

export const GENRES = gql`
  query getAllGenres {
    allGenres
  }
`

export const RECOMMENDED = gql`
  ${BOOK_DETAILS}

  query getRecommended {
    recommended {
      ...BookDetails
    }
  }
`

export const BOOK_ADDED = gql`
  ${BOOK_DETAILS}

  subscription {
    bookAdded {
      ...BookDetails
    }
  }
`
