const { test, after, beforeEach } = require('node:test');
const assert = require('node:assert');
const Blog = require('../models/blog');
const mongoose = require('mongoose');
const helper = require('./test_helper');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  let blogObject = new Blog(helper.initialBlogs[0]);
  await blogObject.save();

  blogObject = new Blog(helper.initialBlogs[1]);
  await blogObject.save();
});

test.only('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test.only('all blogs are returned', async () => {
  const response = await api.get('/api/blogs');

  assert.strictEqual(response.body.length, helper.initialBlogs.length);
});

test.only('the first blog is about React patterns', async () => {
  const response = await api.get('/api/blogs');

  const titles = response.body.map((e) => e.title);
  assert.strictEqual(titles.includes('React patterns'), true);
});

test.only('a valid blog can be added ', async () => {
  const newBlog = {
    title: 'Testing patterns',
    author: 'Tests are funny',
    url: 'https://testingtpatterns.com/',
    likes: 7
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);

  const titles = blogsAtEnd.map((b) => b.title);
  assert(titles.includes('Testing patterns'));
});

test.only('verify that the unique identifier property of the blog posts is named id and not _id', async () => {
  const response = await api.get('/api/blogs');

  assert(response.body[0].id);
  assert.strictEqual(response.body[0]._id, undefined);
});

test.only('if the likes property is missing from the request, it will default to the value 0', async () => {
  const newBlog = {
    title: 'Likes missing',
    author: 'no likes :(',
    url: 'https://testingtpatterns.com/'
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);

  const newlySavedBlog = blogsAtEnd.find((b) => b.title === 'Likes missing');
  assert.strictEqual(newlySavedBlog.likes, 0);
});

after(async () => {
  await mongoose.connection.close();
});
