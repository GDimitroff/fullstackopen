const _ = require('lodash');

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return _.sumBy(blogs, 'likes');
};

const favoriteBlog = (blogs) => {
  return _.maxBy(blogs, 'likes');
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
