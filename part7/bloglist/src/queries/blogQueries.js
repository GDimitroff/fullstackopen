import { useQuery } from '@tanstack/react-query'

import blogService from '../services/blogs'

export const useBlogsQuery = () => {
  return useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false,
    retry: false,
  })
}
