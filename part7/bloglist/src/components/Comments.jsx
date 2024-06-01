const Comments = ({ comments }) => {
  return (
    <div>
      <h3>comments</h3>
      <div>
        <input type='text' />
        <button>add a comment</button>
      </div>
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
