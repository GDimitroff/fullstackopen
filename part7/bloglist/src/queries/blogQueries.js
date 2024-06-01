import { useQuery, useQueryClient } from '@tanstack/react-query'

import blogService from '../services/blogs'

export const useBlogsQuery = () => {
  return useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false,
    retry: false,
  })
}

export const useBlogQuery = (id) => {
  const queryClient = useQueryClient()

  return useQuery({
    queryKey: ['blogs', id],
    queryFn: async () => {
      const blogs = queryClient.getQueryData(['blogs'])
      const blog = blogs?.find((b) => b.id === id)

      if (blog) {
        return blog
      } else {
        return await blogService.getById(id)
      }
    },
    refetchOnWindowFocus: false,
    retry: false,
  })
}
