import { createContext, useReducer } from 'react'

export const NotificationContext = createContext()

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION': {
      return { ...action.payload }
    }
    case 'CLEAR_NOTIFICATION': {
      return null
    }
    default: {
      return state
    }
  }
}

const NotificationProvider = ({ children }) => {
  const [notification, dispatchNotification] = useReducer(
    notificationReducer,
    null,
  )

  const setNotification = (notification) => {
    dispatchNotification({ type: 'SET_NOTIFICATION', payload: notification })
    setTimeout(() => {
      dispatchNotification({ type: 'CLEAR_NOTIFICATION' })
    }, 5000)
  }

  const value = {
    notification,
    setNotification,
  }

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  )
}

export default NotificationProvider
