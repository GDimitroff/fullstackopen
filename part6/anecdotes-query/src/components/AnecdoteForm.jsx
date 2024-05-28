import { useMutation, useQueryClient } from '@tanstack/react-query'

import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: anecdoteService.createNew,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    mutate({ content })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button
          type='submit'
          disabled={isPending}
        >
          create
        </button>
        {isPending && ' Adding...'}
      </form>
    </div>
  )
}

export default AnecdoteForm
