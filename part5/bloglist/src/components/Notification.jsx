const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }

  return (
    <div
      className={`notification ${notification.type}`}
      data-testid="notification"
    >
      {notification.message}
    </div>
  )
}

export default Notification
