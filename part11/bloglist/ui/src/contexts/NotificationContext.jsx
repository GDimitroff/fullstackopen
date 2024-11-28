import { createContext, useReducer } from 'react'
import { v4 as uuidv4 } from 'uuid'

export const NotificationContext = createContext()

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION': {
      return [...state, action.payload]
    }
    case 'REMOVE_NOTIFICATION': {
      return state.filter((notification) => notification.id !== action.id)
    }
    default: {
      return state
    }
  }
}

const NotificationProvider = ({ children }) => {
  const [notifications, dispatchNotification] = useReducer(
    notificationReducer,
    [],
  )

  const setNotification = (notification) => {
    const id = uuidv4()
    const { severity, message } = notification

    dispatchNotification({
      type: 'SET_NOTIFICATION',
      payload: { id, severity, message },
    })

    setTimeout(() => {
      dispatchNotification({ type: 'REMOVE_NOTIFICATION', id })
    }, 5000)
  }

  const value = {
    notifications,
    setNotification,
  }

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  )
}

export default NotificationProvider
