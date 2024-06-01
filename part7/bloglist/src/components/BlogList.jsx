import { Link } from 'react-router-dom'

import { useBlogsQuery } from '../queries/blogQueries'

const listStyle = {
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft: 5,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5,
  marginTop: 5,
  listStyle: 'none',
}

const BlogList = () => {
  const { data: blogs, isLoading } = useBlogsQuery()

  const sortedBlogs = blogs?.sort((a, b) => b.likes - a.likes)

  if (isLoading) return <div>loading...</div>

  return (
    <ul style={{ paddingInlineStart: 0 }}>
      {sortedBlogs.map((blog) => (
        <li
          key={blog.id}
          style={listStyle}
        >
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} {blog.author}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default BlogList
