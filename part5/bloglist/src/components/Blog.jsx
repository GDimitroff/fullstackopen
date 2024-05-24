import { useState } from 'react';

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}{' '}
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? 'hide' : 'view'}
      </button>
      {showDetails && (
        <div>
          {blog.url}
          <div>
            likes {blog.likes} <button>like</button>
          </div>
          <div>{blog.user.name}</div>
        </div>
      )}
    </div>
  );
};

export default Blog;
