const { test, after, beforeEach, describe } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);

const helper = require('./helper');

const Blog = require('../models/blog');

describe.only('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);
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

  test.only('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs');

    const titles = response.body.map((e) => e.title);
    assert.strictEqual(titles.includes('React patterns'), true);
  });

  describe.only('viewing a specific blog', () => {
    test.only('succeeds with a valid id', async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToView = blogsAtStart[0];

      const response = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      assert.deepStrictEqual(response.body, blogToView);
    });

    test.only('fails with statuscode 404 if blog does not exist', async () => {
      const validNonexistingId = await helper.nonExistingId();

      await api.get(`/api/blogs/${validNonexistingId}`).expect(404);
    });

    test.only('fails with statuscode 400 if id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445';

      await api.get(`/api/blogs/${invalidId}`).expect(400);
    });
  });

  describe.only('addition of a new blog', () => {
    test.only('succeeds with valid data', async () => {
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

    test.only('verify that the unique identifier property is named id', async () => {
      const response = await api.get('/api/blogs');

      assert(response.body[0].id);
      assert.strictEqual(response.body[0]._id, undefined);
    });

    test.only('verify that if missing the default value of likes is 0', async () => {
      const newBlog = {
        title: 'Likes missing',
        author: 'no likes :(',
        url: 'https://testingtpatterns.com/'
      };

      const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const blogsAtEnd = await helper.blogsInDb();
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);
      assert.strictEqual(response.body.likes, 0);
    });

    test.only('fails with status code 400 if title property is missing', async () => {
      const newBlog = {
        author: 'no likes :(',
        url: 'https://testingtpatterns.com/'
      };

      await api.post('/api/blogs').send(newBlog).expect(400);

      const blogsAtEnd = await helper.blogsInDb();
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
    });

    test.only('fails with status code 400 if url property is missing', async () => {
      const newBlog = {
        title: 'Likes missing',
        author: 'no likes :('
      };

      await api.post('/api/blogs').send(newBlog).expect(400);

      const blogsAtEnd = await helper.blogsInDb();
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
    });
  });

  describe.only('updating a blog', () => {
    test.only('succeeds with a valid id', async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToUpdate = blogsAtStart[0];

      const response = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send({ title: 'Updated Blog', likes: 99 })
        .expect(200)
        .expect('Content-Type', /application\/json/);

      assert.strictEqual(response.body.title, 'Updated Blog');
      assert.strictEqual(response.body.likes, 99);
    });

    test.only('fails with statuscode 404 if blog does not exist', async () => {
      const validNonexistingId = await helper.nonExistingId();

      await api.put(`/api/blogs/${validNonexistingId}`).expect(404);
    });

    test.only('fails with status code 400 if id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445';
      await api.put(`/api/blogs/${invalidId}`).expect(400);
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});
