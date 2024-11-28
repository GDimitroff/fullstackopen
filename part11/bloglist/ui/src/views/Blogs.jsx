import { useState } from 'react'

import BlogForm from '../components/BlogForm'
import Togglable from '../components/Togglable'
import BlogList from '../components/BlogList'

const Blogs = () => {
  const [visible, setVisible] = useState(false)

  return (
    <section>
      <Togglable
        buttonLabel='new blog'
        visible={visible}
        setVisible={() => setVisible(!visible)}
      >
        <BlogForm />
      </Togglable>
      <BlogList />
    </section>
  )
}

export default Blogs
