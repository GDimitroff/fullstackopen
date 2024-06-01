import { Button } from '@mui/material'

const Togglable = ({ children, visible = false, setVisible, buttonLabel }) => {
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button
          onClick={setVisible}
          color='success'
          variant='contained'
          size='small'
        >
          {buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <Button
          onClick={setVisible}
          style={{
            width: '200px',
            marginTop: '5px',
          }}
          size='small'
        >
          cancel
        </Button>
      </div>
    </div>
  )
}

export default Togglable
