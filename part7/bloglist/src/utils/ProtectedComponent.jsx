import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '../contexts/hooks'
import Navigation from '../components/Navigation'

const ProtectedComponent = ({ children }) => {
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user === null) {
      navigate('/auth', { replace: true })
    }
  }, [user, navigate])

  if (user === null) return null

  return (
    <main>
      <Navigation />
      {children}
    </main>
  )
}

export default ProtectedComponent
