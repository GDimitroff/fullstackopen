const { Router } = require('express');
const Blog = require('../models/blog');
const { userExtractor } = require('../utils/middleware');

const blogsRouter = Router();

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });

  response.json(blogs);
});

blogsRouter.post('/', userExtractor, async (request, response) => {
  const { title, author, url, likes = 0 } = request.body;
  const user = request.user;

  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: user._id
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

blogsRouter.put('/:id', userExtractor, async (request, response) => {
  const { title, author, url, likes } = request.body;
  const blogId = request.params.id;

  const user = request.user;
  const blog = await Blog.findById(blogId);

  if (!blog) {
    return response.status(404).end();
  }

  if (!blog.user.equals(user._id)) {
    return response.status(401).json({ error: 'unauthorized operation' });
  }

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { title, author, url, likes },
    {
      new: true,
      runValidators: true,
      context: 'query'
    }
  );

  if (updatedBlog) {
    response.json(updatedBlog);
  } else {
    response.status(404).end();
  }
});

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const blogId = request.params.id;

  const user = request.user;
  const blog = await Blog.findById(blogId);

  if (!blog) {
    return response.status(404).end();
  }

  if (!blog.user.equals(user._id)) {
    return response.status(401).json({ error: 'unauthorized operation' });
  }

  user.blogs = user.blogs.filter((id) => id.toString() !== request.params.id);
  await user.save();

  await Blog.findByIdAndDelete(blogId);
  response.status(204).end();
});

module.exports = blogsRouter;
