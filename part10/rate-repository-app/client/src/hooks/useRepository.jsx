import { useQuery } from '@apollo/client'
import { GET_REPOSITORY } from '../graphql/queries'

const useRepository = (variables) => {
  const { data, error, loading, fetchMore, ...result } = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables,
  })

  const handleFetchMoreReviews = () => {
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage

    if (!canFetchMore) {
      return
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    })
  }

  return {
    repository: data?.repository,
    fetchMore: handleFetchMoreReviews,
    loading,
    error,
    ...result,
  }
}

export default useRepository
