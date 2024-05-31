const Togglable = ({ children, visible = false, setVisible, buttonLabel }) => {
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={setVisible}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button onClick={setVisible}>cancel</button>
      </div>
    </div>
  )
}

export default Togglable
