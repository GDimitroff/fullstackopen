const Notify = ({ message }) => {
  const style = {
    position: 'absolute',
    bottom: '20px',
    right: '20px',
    padding: '10px',
    background: 'gray',
    color: 'white',
  }

  if (!message) return

  return <div style={style}>{message}</div>
}

export default Notify
