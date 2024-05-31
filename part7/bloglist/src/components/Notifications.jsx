const Notifications = ({ notifications }) => {
  console.log(notifications)
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
            data-testid='notification'
          >
            {notification.message}
          </div>
        )
      })}
    </div>
  )
}

export default Notifications
