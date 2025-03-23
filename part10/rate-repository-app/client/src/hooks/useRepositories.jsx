import { useQuery } from '@apollo/client'
import { GET_REPOSITORIES } from '../graphql/queries'

const useRepositories = (sortItem) => {
  const { orderBy, orderDirection } = sortItem

  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: { orderBy, orderDirection },
  })

  return { data, loading, error }
}

export default useRepositories
