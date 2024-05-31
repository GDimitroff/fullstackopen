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
    onError: (error) => {
      setNotification({ type: 'error', message: error.response.data.error })
    },
  })
}

export const useRemoveBlogMutation = () => {
  const queryClient = useQueryClient()
  const { setNotification } = useNotification()

  useMutation({
    mutationFn: blogService.remove,
    onError: (error) => {
      setNotification({ type: 'error', message: error.response.data.error })
    },
  })
}
