import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { useApolloClient } from '@apollo/client'
import { useState } from 'react'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommended from './components/Recommended'

const App = () => {
  const client = useApolloClient()
  const navigate = useNavigate()

  const [token, setToken] = useState(() => {
    const token = localStorage.getItem('library-fso-user-token')
    return token || null
  })

  const handleLogout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    navigate('/')
  }

  return (
    <div>
      <nav>
        <button>
          <Link to='/'>authors</Link>
        </button>
        <button>
          <Link to='/books'>books</Link>
        </button>
        {token && (
          <button>
            <Link to='/add'>add book</Link>
          </button>
        )}
        {token && (
          <button>
            <Link to='/recommended'>recommended</Link>
          </button>
        )}
        {!token && (
          <button>
            <Link to='/login'>login</Link>
          </button>
        )}
        {token && <button onClick={handleLogout}>logout</button>}
      </nav>

      <hr />

      <Routes>
        <Route
          path='/'
          element={<Authors token={token} />}
        />
        <Route
          path='/books'
          element={<Books />}
        />
        <Route
          path='/add'
          element={<NewBook />}
        />
        <Route
          path='/login'
          element={<LoginForm setToken={setToken} />}
        />
        <Route
          path='/recommended'
          element={<Recommended />}
        />
      </Routes>
    </div>
  )
}

export default App
