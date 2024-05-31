import Blog from './Blog'

const Blogs = ({ user, blogs }) => {
  if (!blogs || blogs.length === 0) return null

  return (
    <div>
      {blogs.map((blog) => (
        <Blog
          user={user}
          key={blog.id}
          blog={blog}
        />
      ))}
    </div>
  )
}

export default Blogs
