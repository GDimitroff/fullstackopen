import { createContext, useEffect, useReducer } from 'react'
import { useNavigate } from 'react-router-dom'

import authService from '../services/authentication'
import blogService from '../services/blogs'
import {
  INITIALIZE_USER,
  USER_LOGIN_SUBMIT,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGOUT,
} from '../utils/actions'
import { useNotification } from './hooks'

const initialState = {
  isLoading: true,
  user: null,
}

export const AuthContext = createContext()

const autReducer = (state, action) => {
  switch (action.type) {
    case INITIALIZE_USER: {
      return { ...state, isLoading: false, user: action.payload }
    }
    case USER_LOGIN_SUBMIT: {
      return { ...state, isLoading: true }
    }
    case USER_LOGIN_SUCCESS: {
      return { ...state, isLoading: false, user: action.payload }
    }
    case USER_LOGIN_FAILURE: {
      return { ...state, isLoading: false, user: null }
    }
    case USER_LOGOUT: {
      return { ...state, isLoading: false, user: null }
    }
    default: {
      throw new Error(`No matching action type: "${action.type}"`)
    }
  }
}

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(autReducer, initialState)
  const { setNotification } = useNotification()
  const navigate = useNavigate()

  useEffect(() => {
    initializeUser()
  }, [])

  const initializeUser = () => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogsAppUser')

    let user = null
    if (loggedUserJSON) {
      user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
    }

    dispatch({ type: INITIALIZE_USER, payload: user })
  }

  const login = async (userData) => {
    dispatch({ type: USER_LOGIN_SUBMIT })

    try {
      const user = await authService.login(userData)
      dispatch({ type: USER_LOGIN_SUCCESS, payload: user })
      window.localStorage.setItem('loggedBlogsAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      navigate('/', { replace: true })
    } catch (error) {
      dispatch({ type: USER_LOGIN_FAILURE })
      setNotification({
        type: 'error',
        message: error.response.data.error,
      })
    }
  }

  const logout = () => {
    dispatch({ type: USER_LOGOUT })
    window.localStorage.removeItem('loggedBlogsAppUser')
    blogService.setToken(null)
  }

  const value = {
    ...state,
    login,
    logout,
  }

  return (
    <AuthContext.Provider value={value}>
      {state.isLoading ? <div>loading...</div> : children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
