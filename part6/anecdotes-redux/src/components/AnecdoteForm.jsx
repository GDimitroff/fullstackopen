import { useDispatch } from 'react-redux'

import { create } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    dispatch(create(content))
    dispatch(setNotification(`You have created '${content}'`))
    setTimeout(() => {
      dispatch(setNotification(null))
    }, 5000)
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input name='anecdote' />
        </div>
        <button>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm
