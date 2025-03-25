import { gql } from '@apollo/client'
import { REPOSITORY_FRAGMENT } from './fragments'

export const GET_REPOSITORIES = gql`
  query Repositories(
    $first: Int
    $after: String
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
  ) {
    repositories(
      first: $first
      after: $after
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
    ) {
      totalCount
      edges {
        cursor
        node {
          ...RepositoryFragment
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
  ${REPOSITORY_FRAGMENT}
`

export const GET_CURRENT_USER = gql`
  query getCurrentUser($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            id
            userId
            repositoryId
            rating
            createdAt
            text
          }
        }
      }
    }
  }
`

export const GET_REPOSITORY = gql`
  query getRepository($first: Int, $after: String, $id: ID!) {
    repository(id: $id) {
      ...RepositoryFragment
      url
      reviews(first: $first, after: $after) {
        totalCount
        pageInfo {
          startCursor
          hasPreviousPage
          hasNextPage
          endCursor
        }
        edges {
          cursor
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
  ${REPOSITORY_FRAGMENT}
`
