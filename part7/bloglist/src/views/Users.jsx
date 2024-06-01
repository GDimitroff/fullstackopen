import { Link } from 'react-router-dom'

import { useUsersQuery } from '../queries/userQueries'

const Users = () => {
  const { data: users, isLoading, error } = useUsersQuery()

  if (isLoading) return <div>loading...</div>

  if (error) return <div>error: {error.response.data.error}</div>

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
