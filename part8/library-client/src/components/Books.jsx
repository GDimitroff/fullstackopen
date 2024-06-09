import { useQuery } from '@apollo/client'

import { BOOKS } from '../queries'

const Books = () => {
  const { loading, data, error } = useQuery(BOOKS)

  if (loading) {
    return <div>loading...</div>
  }

  if (error) {
    return <p>Error: {error.message}</p>
  }

  return (
    <div>
      <h2>books</h2>

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
