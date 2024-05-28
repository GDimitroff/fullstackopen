import { configureStore } from '@reduxjs/toolkit'

import filterReducer from './reducers/filterReducer'
import anecdotesReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'

export const store = configureStore({
  reducer: {
    anecdotes: anecdotesReducer,
    filter: filterReducer,
    notification: notificationReducer,
  },
})
