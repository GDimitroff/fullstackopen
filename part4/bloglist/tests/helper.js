const User = require('../models/user');
const Blog = require('../models/blog');

const initialUsers = [
  {
    username: 'King',
    name: 'King Tester',
    passwordHash: '$2b$10$8e9ZDlpVDePBb/eH8i2HxePYReQqBdbPQCDKGZ7No5EKguHeZz6VS'
  },
  {
    username: 'Looser',
    name: 'Looser Tester',
    passwordHash: '$2b$10$8e9ZDlpVDePBb/eH8i2HxePYReQqBdbPQCDKGZ7No5EKguHeZz6VS'
  }
];

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

const initializeTestDatabase = async () => {
  await User.deleteMany({});
  await Blog.deleteMany({});

  const users = await User.insertMany(initialUsers);

  const blogPromises = initialBlogs.map((blog, index) => {
    const newBlog = new Blog({ ...blog, user: users[index]._id });
    return newBlog.save();
  });

  const blogs = await Promise.all(blogPromises);

  const userPromises = users.map((user, index) => {
    user.blogs = [blogs[index]._id];
    return user.save();
  });

  await Promise.all(userPromises);
};

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
  initializeTestDatabase,
  initialUsers,
  initialBlogs,
  nonExistingId,
  usersInDb,
  blogsInDb
};
