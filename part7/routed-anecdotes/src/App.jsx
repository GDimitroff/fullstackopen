import { useState } from 'react'
import { Routes, Route, Navigate, useMatch } from 'react-router-dom'

import Navigation from './components/Navigation'
import Footer from './components/Footer'
import AnecdoteList from './components/AnecdoteList'
import CreateNew from './components/CreateNew'
import About from './components/About'
import AnecdoteDetails from './components/AnecdoteDetails'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1,
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2,
    },
  ])

  const match = useMatch('/anecdotes/:id')
  const anecdote = match
    ? anecdotes.find((a) => a.id === Number(match.params.id))
    : null

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    }

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)))
  }

  return (
    <>
      <h1>Software anecdotes</h1>
      <Navigation />

      <Routes>
        <Route
          path='/'
          element={<AnecdoteList anecdotes={anecdotes} />}
        />
        <Route
          path='/anecdotes'
          element={
            <Navigate
              replace
              to='/'
            />
          }
        />
        <Route
          path='/anecdotes/:id'
          element={<AnecdoteDetails anecdote={anecdote} />}
        />
        <Route
          path='/create'
          element={<CreateNew addNew={addNew} />}
        />
        <Route
          path='/about'
          element={<About />}
        />
      </Routes>

      <Footer />
    </>
  )
}

export default App
