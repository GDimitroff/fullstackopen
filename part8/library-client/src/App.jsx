import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import { useState } from 'react'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommended from './components/Recommended'
import Notify from './components/Notify'
import { BOOKS, BOOK_ADDED, ME } from './queries'
import { updateAllBooksCache } from './utils/cache-helpers'

const App = () => {
  const client = useApolloClient()
  const navigate = useNavigate()

  const [token, setToken] = useState(() => {
    return localStorage.getItem('library-fso-user-token') || null
  })

  const [notify, setNotify] = useState(null)

  const {
    loading: userLoading,
    data: userData,
    error: userError,
  } = useQuery(ME, { skip: !token })

  const handleLogout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    navigate('/')
  }

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded

      updateAllBooksCache(
        client.cache,
        { query: BOOKS, variables: { genre: 'all' } },
        addedBook
      )

      setNotify('New book added: ' + addedBook.title)
      setTimeout(() => {
        setNotify(null)
      }, 3000)
    },
  })

  if (userLoading) return <div>loading...</div>
  if (userError) return <p>error: {userError.message}</p>

  return (
    <div>
      <Notify message={notify} />
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
          <button
            style={{
              marginLeft: '10px',
              backgroundColor: 'GrayText',
              color: 'white',
            }}
          >
            <Link
              to='/login'
              style={{
                backgroundColor: 'GrayText',
                color: 'white',
              }}
            >
              login
            </Link>
          </button>
        )}
        {token && (
          <button
            onClick={handleLogout}
            style={{
              marginLeft: '10px',
              backgroundColor: 'GrayText',
              color: 'white',
            }}
          >
            logout
          </button>
        )}
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
          element={<Recommended user={userData} />}
        />
      </Routes>
    </div>
  )
}

export default App
