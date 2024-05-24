import Blog from './Blog';

const Blogs = ({ blogs, onLikeBlog }) => {
  if (!blogs || blogs.length === 0) return null;

  return (
    <div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} onLikeBlog={onLikeBlog} />
      ))}
    </div>
  );
};

export default Blogs;
