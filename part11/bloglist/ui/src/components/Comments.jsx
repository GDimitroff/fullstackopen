import { useState } from 'react'
import { Button, TextField } from '@mui/material'

import { useAddCommentMutation } from '../mutations/blogMutations'

const Comments = ({ blogId, comments }) => {
  const addCommentMutation = useAddCommentMutation()
  const [newComment, setNewComment] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (newComment.trim() === '') return

    await addCommentMutation.mutateAsync({ blogId, newComment })
    setNewComment('')
  }

  return (
    <div>
      <h3>comments</h3>
      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
          }}
        >
          <TextField
            label='comment'
            type='text'
            name='comment'
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            size='small'
          />
          <Button
            color='success'
            variant='contained'
            type='submit'
          >
            add a comment
          </Button>
        </div>
      </form>
      {comments.length > 0 ? (
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      ) : (
        <div>no comments yet. why no add one?</div>
      )}
    </div>
  )
}

export default Comments
