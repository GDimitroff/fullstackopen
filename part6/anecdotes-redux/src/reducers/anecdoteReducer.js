import { createSlice } from '@reduxjs/toolkit'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  }
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find((a) => a.id === id)
      anecdoteToChange.votes += 1
    },
    create(state, action) {
      const newAnecdote = asObject(action.payload)
      state.push(newAnecdote)
    },
    set(state, action) {
      return action.payload
    },
  },
})

export const { vote, create, set } = anecdoteSlice.actions
export default anecdoteSlice.reducer
