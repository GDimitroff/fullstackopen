import gql from 'graphql-tag'

export const typeDefs = gql`
  type Query {
    me: User
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    allGenres: [String!]!
    recommended: [Book!]!
  }

  type Mutation {
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token

    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!

    editAuthor(name: String!, setBornTo: Int!): Author
  }

  type Subscription {
    bookAdded: Book!
  }

  type User {
    id: ID!
    username: String!
    favoriteGenre: String!
  }

  type Token {
    value: String!
  }

  type Author {
    id: ID!
    name: String!
    born: Int
    bookCount: Int!
  }

  type Book {
    id: ID!
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
  }
`
