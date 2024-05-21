const User = require('../models/user');
const Blog = require('../models/blog');

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 12
  }
];

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'will-remove-soon',
    author: 'does not matter',
    url: 'https://placeholder.com/',
    likes: 0
  });

  await blog.save();
  await blog.deleteOne();

  return blog._id.toString();
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  usersInDb,
  blogsInDb
};
