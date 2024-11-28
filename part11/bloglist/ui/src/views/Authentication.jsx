import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, TextField } from '@mui/material'

import { useAuth } from '../contexts/hooks'

const Authentication = () => {
  const { user, login } = useAuth()
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (user) {
      navigate('/blogs', { replace: true })
    }
  }, [user, navigate])

  const handleLogin = async (event) => {
    event.preventDefault()

    await login({ username, password })
  }

  if (user) return null

  return (
    <div>
      <h2>login</h2>
      <form
        onSubmit={handleLogin}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          width: '200px',
        }}
      >
        <div>
          <TextField
            label='username'
            type='text'
            name='username'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            size='small'
          />
        </div>
        <div>
          <TextField
            label='password'
            type='password'
            name='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            size='small'
          />
        </div>
        <div>
          <Button
            variant='contained'
            color='primary'
            type='submit'
            size='small'
          >
            login
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Authentication
