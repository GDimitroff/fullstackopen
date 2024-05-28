import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification: (state, action) => action.payload,
  },
})

export const { setNotification } = notificationSlice.actions

export const showNotification = (message, timeout) => {
  return (dispatch) => {
    dispatch(setNotification(message))

    setTimeout(() => {
      dispatch(setNotification(null))
    }, timeout * 1000)
  }
}

export default notificationSlice.reducer
