import Alert from '@mui/material/Alert'

import { useNotification } from '../contexts/hooks'

const Notifications = () => {
  const { notifications } = useNotification()

  if (notifications.length === 0) {
    return null
  }

  return (
    <div>
      {notifications.map((notification) => {
        return (
          <Alert
            key={notification.id}
            severity={notification.severity}
          >
            {notification.message}
          </Alert>
        )
      })}
    </div>
  )
}

export default Notifications
