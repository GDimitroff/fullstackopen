import { useQuery } from '@apollo/client'
import { ME } from '../graphql/queries'

const useMe = () => {
  const { data, error, loading } = useQuery(ME, {
    fetchPolicy: 'cache-and-network',
  })

  return { data, loading, error }
}

export default useMe
