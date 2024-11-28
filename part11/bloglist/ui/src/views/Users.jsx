import { Link } from 'react-router-dom'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'

import { useUsersQuery } from '../queries/userQueries'

const Users = () => {
  const { data: users, isLoading, error } = useUsersQuery()

  if (isLoading) return <div>loading...</div>

  if (error) return <div>error: {error.response.data.error}</div>

  return (
    <div>
      <h2>users</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography fontWeight='bold'>username</Typography>
              </TableCell>
              <TableCell align='right'>
                <Typography fontWeight='bold'>blogs created</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </TableCell>
                <TableCell align='right'>{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Users
