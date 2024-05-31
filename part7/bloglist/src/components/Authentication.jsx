import { useState } from 'react'

import { useAuth } from '../contexts/hooks'

const Authentication = () => {
  const { user, login, logout } = useAuth()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    await login({ username, password })
    setUsername('')
    setPassword('')
  }

  const handleLogout = () => {
    logout()
  }

  if (user) {
    return (
      <div>
        <span>{user.name} logged in</span>
        <button onClick={handleLogout}>logout</button>
      </div>
    )
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type='text'
          value={username}
          name='username'
          data-testid='username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type='password'
          value={password}
          name='password'
          data-testid='password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit'>login</button>
    </form>
  )
}

export default Authentication
