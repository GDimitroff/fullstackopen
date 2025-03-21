import { gql } from '@apollo/client'
import { REPOSITORY_FRAGMENT } from './fragments'

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          ...RepositoryFragment
        }
      }
    }
  }
  ${REPOSITORY_FRAGMENT}
`
export const ME = gql`
  query {
    me {
      id
      username
    }
  }
`
