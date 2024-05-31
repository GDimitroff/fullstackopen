import { useState } from 'react'

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
  const { notifications } = useNotification()
  const { mutate } = useCreateBlogMutation()
  const [visible, setVisible] = useState(false)

  const sortedBlogs = blogs?.sort((a, b) => b.likes - a.likes)

  const handleCreateBlog = (blogObject) => {
    mutate(blogObject)
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
          />
        </>
      )}
    </div>
  )
}

export default App
