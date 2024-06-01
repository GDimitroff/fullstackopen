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
