import { useNavigate } from 'react-router-dom'

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
      <span>{user.name} logged in</span>
      <button onClick={handleLogout}>logout</button>
    </nav>
  )
}

export default Navigation
