import { useState } from 'react'

import { useCreateBlogMutation } from '../mutations/blogMutations'

const BlogForm = () => {
  const { mutateAsync, isPending } = useCreateBlogMutation()
  const [blog, setBlog] = useState({ title: '', author: '', url: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setBlog({ ...blog, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    await mutateAsync({
      title: blog.title,
      author: blog.author,
      url: blog.url,
    })

    setBlog({ title: '', author: '', url: '' })
  }

  return (
    <div data-testid='blogform'>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input
            type='text'
            value={blog.title}
            name='title'
            data-testid='title'
            onChange={handleChange}
            placeholder='react is awesome'
          />
        </div>
        <div>
          author:
          <input
            type='text'
            value={blog.author}
            name='author'
            data-testid='author'
            onChange={handleChange}
            placeholder='john doe'
          />
        </div>
        <div>
          url:
          <input
            type='url'
            value={blog.url}
            name='url'
            data-testid='url'
            onChange={handleChange}
            placeholder='https://example.com/'
          />
        </div>
        <button
          type='submit'
          disabled={isPending}
        >
          {isPending ? 'creating...' : 'create'}
        </button>
      </form>
    </div>
  )
}

export default BlogForm
