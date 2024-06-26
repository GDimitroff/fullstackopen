import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@mui/material'

import { useAuth } from '../contexts/hooks'
import { useBlogQuery } from '../queries/blogQueries'
import {
  useLikeBlogMutation,
  useRemoveBlogMutation,
} from '../mutations/blogMutations'
import Comments from '../components/Comments'

const Blog = () => {
  const { id } = useParams()
  const { user } = useAuth()
  const { data: blog, isLoading, error } = useBlogQuery(id)
  const navigate = useNavigate()

  const likeMutation = useLikeBlogMutation()
  const removeMutation = useRemoveBlogMutation()

  const handleLikeBlog = (blogObject) => {
    const blogData = { ...blogObject, likes: blogObject.likes + 1 }
    likeMutation.mutate(blogData)
  }

  const handleRemoveBlog = async (blogObject) => {
    const confirmText = `Remove blog ${blogObject.title} by ${blogObject.author}`

    if (window.confirm(confirmText)) {
      await removeMutation.mutateAsync(blogObject)
      navigate('/blogs')
    }
  }

  useEffect(() => {
    if (error) {
      navigate('/blogs')
    }
  }, [error])

  if (isLoading) return <div>loading...</div>

  if (!blog || error) return null

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <div>
        <a
          href={blog.url}
          target='_blank'
        >
          {blog.url}
        </a>
        <div>
          likes {blog.likes}{' '}
          <Button
            onClick={() => handleLikeBlog(blog)}
            color='primary'
            variant='contained'
            size='small'
          >
            like
          </Button>
        </div>
        <div>added by {blog.user.name}</div>
        {user.username === blog.user.username && (
          <Button
            onClick={() => handleRemoveBlog(blog)}
            color='error'
            variant='contained'
            size='small'
            disabled={removeMutation.isPending}
          >
            remove
          </Button>
        )}
      </div>
      <Comments
        blogId={blog.id}
        comments={blog.comments}
      />
    </div>
  )
}

export default Blog
