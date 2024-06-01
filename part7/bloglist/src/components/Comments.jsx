import { useState } from 'react'

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
        <div>
          <input
            type='text'
            name='comment'
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button disabled={addCommentMutation.isPending}>
            {addCommentMutation.isPending ? 'adding...' : 'add a comment'}
          </button>
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
