import { useRef, useState } from 'react'

import blogService from './services/blogs'
import { useAuth, useNotification } from './contexts/hooks'
import { useBlogsQuery } from './queries/blogQueries'
import { useCreateBlogMutation } from './mutations/blogMutations'
import Authentication from './components/Authentication'
import Notifications from './components/Notifications'
import Blogs from './components/Blogs'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const { user } = useAuth()
  const { data: blogs, isLoading, error } = useBlogsQuery()
  const { notifications, setNotification } = useNotification()
  const blogFormRef = useRef()
  const createMutation = useCreateBlogMutation(blogFormRef)
  const [visible, setVisible] = useState(false)

  const sortedBlogs = blogs?.sort((a, b) => b.likes - a.likes)

  const handleCreateBlog = (blogObject) => {
    createMutation.mutate(blogObject)
  }

  const handleLikeBlog = async (blogObject) => {
    const blogData = { ...blogObject, likes: blogObject.likes + 1 }

    try {
      const updated = await blogService.update(blogObject.id, blogData)
      // setBlogs((prev) =>
      //   prev.map((b) => (b.id === blogObject.id ? updated : b)),
      // )
    } catch (error) {
      setNotification({ type: 'error', message: error.response.data.error })
    }
  }

  const handleRemoveBlog = async (blogObject) => {
    const confirmText = `Remove blog ${blogObject.title} by ${blogObject.author}`

    if (window.confirm(confirmText)) {
      try {
        await blogService.remove(blogObject.id)
        // setBlogs((prev) => prev.filter((b) => b.id !== blogObject.id))
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

  if (error) return <div>error: {error.response.data.error}</div>

  return (
    <div>
      <h2>{user ? 'blogs' : 'log in to application'}</h2>
      <Notifications notifications={notifications} />

      <Authentication />
      {user && (
        <>
          <Togglable
            buttonLabel='new blog'
            visible={visible}
            setVisible={() => setVisible(!visible)}
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
