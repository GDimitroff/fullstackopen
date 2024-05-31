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
          <div
            key={notification.id}
            className={`notification ${notification.type}`}
          >
            {notification.message}
          </div>
        )
      })}
    </div>
  )
}

export default Notifications
