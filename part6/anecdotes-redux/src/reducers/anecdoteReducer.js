import { createSlice } from '@reduxjs/toolkit'

import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    set(state, action) {
      return action.payload
    },
    append(state, action) {
      state.push(action.payload)
    },
    incrementVote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find((a) => a.id === id)
      anecdoteToChange.votes += 1
    },
  },
})

export const { set, append, incrementVote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(set(anecdotes))
  }
}

export const create = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(append(newAnecdote))
  }
}

export const vote = (anecdote) => {
  return async (dispatch) => {
    await anecdoteService.updateVotes(anecdote)
    dispatch(incrementVote(anecdote.id))
  }
}

export default anecdoteSlice.reducer
