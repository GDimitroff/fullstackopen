import { useQuery } from '@apollo/client'

import { RECOMMENDED } from '../queries'

const Recommended = ({ user }) => {
  const { loading, data, error } = useQuery(RECOMMENDED)

  if (loading) return <div>loading...</div>
  if (error) return <p>error: {error.message}</p>

  if (data.recommended.length === 0) {
    return (
      <div>
        <p>No books to recommend ;(</p>
      </div>
    )
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre: <strong>{user.me.favoriteGenre}</strong>
      </p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {data.recommended.map((a) => (
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

export default Recommended
