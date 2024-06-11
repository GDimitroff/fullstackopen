import { gql } from '@apollo/client'

export const BOOKS = gql(`
  query getAllBooks($author: String, $genre: String) {
    allBooks(author: $author, genre: $genre) {
      title
      published
      author {
        id
        name
        born
      }
      id
      genres
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

export const GENRES = gql(`
  query getAllGenres {
    allGenres
  }
`)

export const RECOMMENDED = gql(`
  query getRecommended {
    recommended {
      title
      published
      author {
        id
        name
      }
      genres
    }
  }
`)
