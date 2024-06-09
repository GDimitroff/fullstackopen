import { Routes, Route, Link } from 'react-router-dom'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

const App = () => {
  return (
    <div>
      <nav>
        <button>
          <Link to='/'>authors</Link>
        </button>
        <button>
          <Link to='/books'>books</Link>
        </button>
        <button>
          <Link to='/add'>add book</Link>
        </button>
      </nav>
      <Routes>
        <Route
          path='/'
          element={<Authors />}
        />
        <Route
          path='/books'
          element={<Books />}
        />
        <Route
          path='/add'
          element={<NewBook />}
        />
      </Routes>
    </div>
  )
}

export default App
