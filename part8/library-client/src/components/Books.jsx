import { useQuery } from '@apollo/client'
import { useState } from 'react'

import { BOOKS, GENRES } from '../queries'

const Books = () => {
  const [genre, setGenre] = useState('all')

  const { loading, data, error } = useQuery(BOOKS, {
    variables: { genre },
  })

  const {
    loading: genresLoading,
    data: genresData,
    error: genresError,
  } = useQuery(GENRES)

  if (loading || genresLoading) {
    return <div>loading...</div>
  }

  if (error || genresError) {
    return <p>Error: {error.message}</p>
  }

  /* ugly code. don't do that in production. its for demo purposes only.
    should extract logic into separate components, use proper styling, etc. */
  return (
    <div>
      <h2>books</h2>
      {genre === 'all' ? (
        <p>
          in{' '}
          <strong
            style={{
              color: 'lightsalmon',
              borderBottom: '1px solid lightsalmon',
            }}
          >
            all
          </strong>{' '}
          genres
        </p>
      ) : (
        <p>
          in genre{' '}
          <strong
            style={{
              color: 'lightsalmon',
              borderBottom: '1px solid lightsalmon',
            }}
          >
            {genre}
          </strong>
        </p>
      )}

      <div
        style={{
          maxWidth: '500px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '5px',
        }}
      >
        {genresData.allGenres.map((g) => (
          <button
            key={g}
            style={
              g === genre
                ? {
                    backgroundColor: 'gray',
                    color: 'whitesmoke',
                  }
                : {}
            }
            onClick={() => setGenre(g)}
          >
            {g}
          </button>
        ))}
      </div>

      <hr />

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
