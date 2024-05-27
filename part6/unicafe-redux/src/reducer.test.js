import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0,
  }

  test('should return a proper initial state when called with undefined state', () => {
    const state = undefined
    const action = {
      type: 'DO_NOTHING',
    }

    const newState = counterReducer(state, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const state = initialState
    const action = {
      type: 'GOOD',
    }

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0,
    })
  })

  test('ok is incremented', () => {
    const state = initialState
    const action = {
      type: 'OK',
    }

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0,
    })
  })

  test('bad is incremented', () => {
    const state = initialState
    const action = {
      type: 'BAD',
    }

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1,
    })
  })

  test('zero resets the state', () => {
    const state = {
      good: 5,
      ok: 2,
      bad: 8,
    }
    const action = {
      type: 'ZERO',
    }

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual(initialState)
  })
})
