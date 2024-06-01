import { Routes, Route, Navigate } from 'react-router-dom'

import Authentication from './views/Authentication'
import ProtectedComponent from './utils/ProtectedComponent'
import Blogs from './views/Blogs'
import Users from './views/Users'
import User from './views/User'

const App = () => {
  return (
    <Routes>
      <Route
        path='/auth'
        element={<Authentication />}
      />
      <Route
        path='/'
        element={
          <ProtectedComponent>
            <Blogs />
          </ProtectedComponent>
        }
      />
      <Route
        path='/blogs'
        element={
          <Navigate
            to='/'
            replace={true}
          />
        }
      />
      <Route
        path='/users'
        element={
          <ProtectedComponent>
            <Users />
          </ProtectedComponent>
        }
      />
      <Route
        path='/users/:id'
        element={
          <ProtectedComponent>
            <User />
          </ProtectedComponent>
        }
      />
    </Routes>
  )
}

export default App
