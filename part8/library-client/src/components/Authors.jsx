import { useRef } from 'react'
import { useMutation, useQuery } from '@apollo/client'

import { AUTHORS } from '../queries'
import { EDIT_AUTHOR } from '../mutations'

const Authors = ({ token }) => {
  const { data, loading, error } = useQuery(AUTHORS)
  const [editAuthor] = useMutation(EDIT_AUTHOR)

  const formRef = useRef()

  if (loading) {
    return <div>loading...</div>
  }

  if (error) {
    return <p>Error: {error.message}</p>
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const author = event.target.author.value
    const birthyear = Number(event.target.birthyear.value)

    editAuthor({
      variables: { name: author, setBornTo: birthyear },
      refetchQueries: [{ query: AUTHORS }],
    })

    event.target.birthyear.value = ''
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {token && (
        <div>
          <h3>set birth year</h3>
          <form
            onSubmit={handleSubmit}
            ref={formRef}
          >
            <div>
              <select name='author'>
                {data.allAuthors.map((a) => (
                  <option
                    key={a.name}
                    value={a.name}
                  >
                    {a.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <input
                type='number'
                name='birthyear'
                placeholder='birth year'
              />
            </div>
            <button type='submit'>update author</button>
          </form>
        </div>
      )}
    </div>
  )
}

export default Authors
