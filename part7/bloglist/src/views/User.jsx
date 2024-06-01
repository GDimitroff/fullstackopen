import { useNavigate, useParams } from 'react-router-dom'

import { useUserQuery } from '../queries/userQueries'
import { useEffect } from 'react'

const User = () => {
  const { id } = useParams()
  const { data: user, isLoading, error } = useUserQuery(id)
  const navigate = useNavigate()

  useEffect(() => {
    if (error) {
      navigate('/users')
    }
  }, [error])

  if (isLoading) return <div>loading...</div>

  if (!user) return null

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>
            {blog.title} by {blog.author}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default User
