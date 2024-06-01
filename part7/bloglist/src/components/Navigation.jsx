import { Link, useNavigate } from 'react-router-dom'

import { useAuth } from '../contexts/hooks'

const Navigation = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav>
      <ul
        style={{
          paddingInlineStart: 0,
          listStyleType: 'none',
          display: 'flex',
          gap: '10px',
        }}
      >
        <li>
          <Link to='/'>blogs</Link>
        </li>
        <li>
          <Link to='/users'>users</Link>
        </li>
        <li>
          <span>{user.name} logged in</span>
          <button onClick={handleLogout}>logout</button>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
