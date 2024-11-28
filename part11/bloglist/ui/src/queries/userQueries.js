import { useQuery, useQueryClient } from '@tanstack/react-query'

import userService from '../services/users'

export const useUsersQuery = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
    refetchOnWindowFocus: false,
    retry: false,
  })
}

export const useUserQuery = (id) => {
  const queryClient = useQueryClient()

  return useQuery({
    queryKey: ['users', id],
    queryFn: async () => {
      const users = queryClient.getQueryData(['users'])
      const user = users?.find((u) => u.id === id)

      if (user) {
        return user
      } else {
        return await userService.getById(id)
      }
    },
    refetchOnWindowFocus: false,
    retry: false,
  })
}
