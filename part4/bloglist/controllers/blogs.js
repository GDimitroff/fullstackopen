const { Router } = require('express');
const Blog = require('../models/blog');

const blogsRouter = Router();

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const { title, author, url, likes = 0 } = request.body;

  const blog = new Blog({
    title,
    author,
    url,
    likes
  });

  const savedBlog = await blog.save();
  response.status(201).json(savedBlog);
});

module.exports = blogsRouter;
