import { Link, useNavigate } from 'react-router-dom'
import { AppBar, Button, Toolbar, Typography } from '@mui/material'

import { useAuth } from '../contexts/hooks'

const Navigation = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <AppBar position='static'>
      <Toolbar>
        <Button
          color='inherit'
          component={Link}
          to='/'
        >
          blogs
        </Button>
        <Button
          color='inherit'
          component={Link}
          to='/users'
        >
          users
        </Button>
        <div
          style={{
            marginLeft: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
          }}
        >
          <Typography
            variant='subtitle2'
            style={{
              display: 'block',
            }}
          >
            {user.name} logged in
          </Typography>
          <Button
            color='inherit'
            onClick={handleLogout}
          >
            logout
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Navigation
