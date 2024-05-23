import Blog from './Blog';

const Blogs = ({ user, blogs }) => {
  return (
    <div>
      <p>{user.username} logged in</p>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
        />
      ))}
    </div>
  );
};

export default Blogs;
