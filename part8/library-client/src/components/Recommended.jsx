import { useQuery } from '@apollo/client'

import { ME, RECOMMENDED } from '../queries'

const Recommended = () => {
  const {
    loading: userLoading,
    data: userData,
    error: userError,
  } = useQuery(ME)

  const { loading, data, error } = useQuery(RECOMMENDED, {
    variables: { genre: userData?.me.favoriteGenre },
    skip: !userData,
  })

  if (userLoading || loading) return <div>loading...</div>
  if (userError || error) return <p>Error: {error.message}</p>

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
        books in your favorite genre:{' '}
        <strong>{userData.me.favoriteGenre}</strong>
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
