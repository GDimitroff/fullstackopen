import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AnecdoteDetails = ({ anecdote }) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (!anecdote) {
      navigate('/')
    }
  }, [anecdote, navigate])

  if (!anecdote) return null

  return (
    <div>
      <h2>
        {anecdote.content} by {anecdote.author}
      </h2>
      <div>has {anecdote.votes} votes</div>
      <div>
        for more info see{' '}
        <a
          href={anecdote.info}
          target='_blank'
        >
          {anecdote.info}
        </a>
      </div>
    </div>
  )
}

export default AnecdoteDetails
