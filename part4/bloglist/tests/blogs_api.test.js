const { test, after, beforeEach } = require('node:test');
const assert = require('node:assert');
const Blog = require('../models/blog');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

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

beforeEach(async () => {
  await Blog.deleteMany({});

  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
});

test.only('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test.only('there are two blogs', async () => {
  const response = await api.get('/api/blogs');

  assert.strictEqual(response.body.length, 2);
});

test.only('the first blog is about React patterns', async () => {
  const response = await api.get('/api/blogs');

  const titles = response.body.map((e) => e.title);
  assert.strictEqual(titles.includes('React patterns'), true);
});

after(async () => {
  await mongoose.connection.close();
});
