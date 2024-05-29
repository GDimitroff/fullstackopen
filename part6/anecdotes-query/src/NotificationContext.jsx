/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW': {
      return action.payload
    }
    case 'HIDE': {
      return null
    }
    default: {
      return state
    }
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    null
  )

  const showNotification = (message) => {
    notificationDispatch({ type: 'SHOW', payload: message })

    setTimeout(() => {
      notificationDispatch({ type: 'HIDE' })
    }, 5000)
  }

  const value = {
    notification,
    showNotification,
  }

  return (
    <NotificationContext.Provider value={value}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  const notification = useContext(NotificationContext)
  return notification
}

export default NotificationContext
