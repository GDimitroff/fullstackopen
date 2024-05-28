import { createSlice } from '@reduxjs/toolkit'

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
      state.push(action.payload)
    },
    set(state, action) {
      return action.payload
    },
  },
})

export const { vote, create, set } = anecdoteSlice.actions
export default anecdoteSlice.reducer
