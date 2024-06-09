import { useQuery } from '@apollo/client'

import { AUTHORS } from '../queries'

const Authors = () => {
  const { data, loading, error } = useQuery(AUTHORS)

  if (loading) {
    return <div>loading...</div>
  }

  if (error) {
    return <p>Error: {error.message}</p>
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
    </div>
  )
}

export default Authors
