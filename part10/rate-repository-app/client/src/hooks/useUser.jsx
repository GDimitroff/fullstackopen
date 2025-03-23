import { useQuery } from '@apollo/client'
import { GET_CURRENT_USER } from '../graphql/queries'

const useUser = ({ includeReviews = false } = {}) => {
  const { data, error, loading } = useQuery(GET_CURRENT_USER, {
    fetchPolicy: 'cache-and-network',
    variables: { includeReviews },
  })

  return { data, loading, error }
}

export default useUser
