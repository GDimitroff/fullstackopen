import { gql } from '@apollo/client'
import { REPOSITORY_FRAGMENT } from './fragments'

export const GET_REPOSITORIES = gql`
  query Repositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
    ) {
      edges {
        node {
          ...RepositoryFragment
        }
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
  query getRepository($id: ID!) {
    repository(id: $id) {
      ...RepositoryFragment
      url
      reviews {
        edges {
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
