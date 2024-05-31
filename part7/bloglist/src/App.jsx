import { useState, useEffect, useCallback, useRef } from 'react'

import blogService from './services/blogs'
import Authentication from './components/Authentication'
import Notifications from './components/Notifications'
import Blogs from './components/Blogs'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { useAuth, useNotification } from './contexts/hooks'

const App = () => {
  const { user } = useAuth()
  const { notifications, setNotification } = useNotification()

  const [isLoading, setIsLoading] = useState(true)
  const [blogs, setBlogs] = useState(null)
  const blogFormRef = useRef()

  const sortedBlogs = blogs?.sort((a, b) => b.likes - a.likes)

  const fetchBlogs = useCallback(async () => {
    setIsLoading(true)
    const blogs = await blogService.getAll()
    setBlogs(blogs)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    fetchBlogs()
  }, [fetchBlogs])

  const handleCreateBlog = async (blogObject) => {
    try {
      const newBlog = await blogService.create(blogObject)
      setBlogs((prevBlogs) => [...prevBlogs, newBlog])
      setNotification({
        type: 'success',
        message: `a new blog ${newBlog.title} by ${newBlog.author} added`,
      })
      blogFormRef.current.toggleVisibility()
    } catch (error) {
      setNotification({ type: 'error', message: error.response.data.error })
    }
  }

  const handleLikeBlog = async (blogObject) => {
    const blogData = { ...blogObject, likes: blogObject.likes + 1 }

    try {
      const updated = await blogService.update(blogObject.id, blogData)
      setBlogs((prev) =>
        prev.map((b) => (b.id === blogObject.id ? updated : b)),
      )
    } catch (error) {
      setNotification({ type: 'error', message: error.response.data.error })
    }
  }

  const handleRemoveBlog = async (blogObject) => {
    const confirmText = `Remove blog ${blogObject.title} by ${blogObject.author}`

    if (window.confirm(confirmText)) {
      try {
        await blogService.remove(blogObject.id)
        setBlogs((prev) => prev.filter((b) => b.id !== blogObject.id))
        setNotification({
          type: 'success',
          message: `blog ${blogObject.title} by ${blogObject.author} removed`,
        })
      } catch (error) {
        setNotification({ type: 'error', message: error.response.data.error })
      }
    }
  }

  if (isLoading) return <div>loading...</div>

  return (
    <div>
      <h2>{user ? 'blogs' : 'log in to application'}</h2>
      <Notifications notifications={notifications} />

      <Authentication />
      {user && (
        <>
          <Togglable
            buttonLabel='new blog'
            ref={blogFormRef}
          >
            <BlogForm createBlog={handleCreateBlog} />
          </Togglable>
          <Blogs
            user={user}
            blogs={sortedBlogs}
            onLikeBlog={handleLikeBlog}
            onRemoveBlog={handleRemoveBlog}
          />
        </>
      )}
    </div>
  )
}

export default App
