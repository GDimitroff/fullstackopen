import { useQuery } from '@tanstack/react-query'

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
  return useQuery({
    queryKey: ['users', id],
    queryFn: () => userService.getById(id),
    refetchOnWindowFocus: false,
    retry: false,
  })
}
