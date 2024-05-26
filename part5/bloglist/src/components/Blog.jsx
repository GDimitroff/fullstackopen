import { useState } from 'react'

const Blog = ({ user, blog, onLikeBlog, onRemoveBlog }) => {
  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    marginTop: 5,
  }

  const deleteButtonStyle = {
    background: 'lightcoral',
    color: 'white',
    border: 'none',
    padding: '4px 8px',
  }

  return (
    <div data-testid="blog" style={blogStyle}>
      {blog.title} {blog.author}{' '}
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? 'hide' : 'view'}
      </button>
      {showDetails && (
        <div data-testid="blog-details">
          {blog.url}
          <div data-testid="blog-likes">
            likes {blog.likes}{' '}
            <button onClick={() => onLikeBlog(blog)}>like</button>
          </div>
          <div>{blog.user.name}</div>
          {user.username === blog.user.username && (
            <button
              style={deleteButtonStyle}
              onClick={() => onRemoveBlog(blog)}
            >
              remove
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog
