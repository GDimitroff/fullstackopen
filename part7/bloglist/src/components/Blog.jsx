import { useState } from 'react'

import {
  useLikeBlogMutation,
  useRemoveBlogMutation,
} from '../mutations/blogMutations'

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

const Blog = ({ user, blog }) => {
  const [showDetails, setShowDetails] = useState(false)
  const likeMutation = useLikeBlogMutation()
  const removeMutation = useRemoveBlogMutation()

  const handleLikeBlog = (blogObject) => {
    const blogData = { ...blogObject, likes: blogObject.likes + 1 }
    likeMutation.mutate(blogData)
  }

  const handleRemoveBlog = (blogObject) => {
    const confirmText = `Remove blog ${blogObject.title} by ${blogObject.author}`

    if (window.confirm(confirmText)) {
      removeMutation.mutate(blogObject)
    }
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}{' '}
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? 'hide' : 'view'}
      </button>
      {showDetails && (
        <div>
          {blog.url}
          <div>
            likes {blog.likes}{' '}
            <button
              onClick={() => handleLikeBlog(blog)}
              disabled={likeMutation.isPending}
            >
              {likeMutation.isPending ? 'liking...' : 'like'}
            </button>
          </div>
          <div>{blog.user.name}</div>
          {user.username === blog.user.username && (
            <button
              style={deleteButtonStyle}
              onClick={() => handleRemoveBlog(blog)}
            >
              {removeMutation.isPending ? 'removing...' : 'remove'}
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog
