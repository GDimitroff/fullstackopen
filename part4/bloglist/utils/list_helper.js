const _ = require('lodash');

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  return blogs.reduce(
    (max, blog) => (max.likes > blog.likes ? max : blog),
    blogs[0]
  );
};

const mostBlogs = (blogs) => {
  return _(blogs)
    .groupBy('author')
    .map((value, key) => ({ author: key, blogs: value.length }))
    .maxBy('blogs');
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
};
