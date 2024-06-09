import { gql, useQuery } from '@apollo/client'

const BOOKS = gql(`
  query GetAllBooks {
    allBooks {
      title
      published
      author
      id
      genres
    }
  }
`)

const Books = () => {
  const { loading, error, data } = useQuery(BOOKS)

  console.log(loading, data)

  if (loading) {
    return <div>loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
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
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
