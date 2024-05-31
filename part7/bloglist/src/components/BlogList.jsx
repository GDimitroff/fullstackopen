import { useAuth } from '../contexts/hooks'
import { useBlogsQuery } from '../queries/blogQueries'
import Blog from './Blog'

const BlogList = () => {
  const { user } = useAuth()
  const { data: blogs, isLoading, error } = useBlogsQuery()

  const sortedBlogs = blogs?.sort((a, b) => b.likes - a.likes)

  if (isLoading) return <div>loading...</div>

  if (error) return <div>error: {error.response.data.error}</div>

  return (
    <div>
      {sortedBlogs.map((blog) => (
        <Blog
          user={user}
          key={blog.id}
          blog={blog}
        />
      ))}
    </div>
  )
}

export default BlogList
