import { useDispatch, useSelector } from 'react-redux'

import { voteForAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    return state.sort((a, b) => b.votes - a.votes)
  })

  const dispatch = useDispatch()

  const handleVote = (id) => {
    dispatch(voteForAnecdote(id))
  }

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  )
}

export default AnecdoteList
