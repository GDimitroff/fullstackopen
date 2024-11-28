import { useState } from 'react'

import { useCreateBlogMutation } from '../mutations/blogMutations'
import { Button, TextField } from '@mui/material'

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
    <div>
      <h2>create new</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          width: '200px',
        }}
      >
        <div>
          <TextField
            label='title'
            type='text'
            name='title'
            value={blog.title}
            onChange={handleChange}
            size='small'
          />
        </div>
        <div>
          <TextField
            label='author'
            type='text'
            name='author'
            value={blog.author}
            onChange={handleChange}
            size='small'
          />
        </div>
        <div>
          <TextField
            label='url'
            type='text'
            name='url'
            value={blog.url}
            onChange={handleChange}
            placeholder='https://example.com/'
            size='small'
          />
        </div>
        <Button
          variant='contained'
          color='success'
          onClick={handleSubmit}
          disabled={isPending}
          size='small'
          type='submit'
        >
          {isPending ? 'creating...' : 'create'}
        </Button>
      </form>
    </div>
  )
}

export default BlogForm
