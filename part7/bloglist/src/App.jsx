import { Routes, Route, Navigate } from 'react-router-dom'

import Authentication from './views/Authentication'
import Blogs from './views/Blogs'
import ProtectedComponent from './utils/ProtectedComponent'

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
    </Routes>
  )
}

export default App
