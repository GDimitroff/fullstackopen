import { useQuery } from '@apollo/client'

import { RECOMMENDED } from '../queries'

const Recommended = () => {
  const { loading, data, error } = useQuery(RECOMMENDED)

  if (loading) return <div>loading...</div>
  if (error) return <p>Error: {error.message}</p>

  console.log(data)

  return <div>{JSON.stringify(data)}</div>
}

export default Recommended
