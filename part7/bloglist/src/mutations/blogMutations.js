import { useMutation, useQueryClient } from '@tanstack/react-query'

import blogService from '../services/blogs'
import { useNotification } from '../contexts/hooks'

export const useCreateBlogMutation = () => {
  const queryClient = useQueryClient()
  const { setNotification } = useNotification()

  return useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], [...blogs, newBlog])

      setNotification({
        type: 'success',
        message: `a new blog ${newBlog.title} by ${newBlog.author} added`,
      })
    },
    onError: (error) => {
      setNotification({ type: 'error', message: error.response.data.error })
    },
  })
}

export const useLikeBlogMutation = () => {
  const queryClient = useQueryClient()
  const { setNotification } = useNotification()

  return useMutation({
    mutationFn: blogService.update,
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(
        ['blogs'],
        blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog)),
      )
    },
    onError: (error) => {
      setNotification({ type: 'error', message: error.response.data.error })
    },
  })
}

export const useRemoveBlogMutation = () => {
  const queryClient = useQueryClient()
  const { setNotification } = useNotification()

  return useMutation({
    mutationFn: blogService.remove,
    onSuccess: (_, variables) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(
        ['blogs'],
        blogs.filter((blog) => blog.id !== variables.id),
      )

      setNotification({
        type: 'success',
        message: `blog ${variables.title} by ${variables.author} removed`,
      })
    },
    onError: (error) => {
      setNotification({ type: 'error', message: error.response.data.error })
    },
  })
}
