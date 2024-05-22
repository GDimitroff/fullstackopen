const { test, after, beforeEach, describe } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);

const helper = require('./helper');

describe('when there is initially some blogs saved', () => {
  let token;

  beforeEach(async () => {
    await helper.initializeTestDatabase();

    const response = await api
      .post('/api/login')
      .send({ username: 'King', password: 'king' });

    token = response.body.token;
  });

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all blogs are returned', async () => {
    const response = await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${token}`);

    assert.strictEqual(response.body.length, helper.initialBlogs.length);
  });

  test('a specific blog is within the returned blogs', async () => {
    const response = await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${token}`);

    const titles = response.body.map((e) => e.title);
    assert.strictEqual(titles.includes('React patterns'), true);
  });

  describe('viewing a specific blog', () => {
    test('succeeds with a valid id', async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToView = blogsAtStart[0];

      const response = await api
        .get(`/api/blogs/${blogToView.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      blogToView.user = blogToView.user.toString();
      assert.deepStrictEqual(response.body, blogToView);
    });

    test('fails with statuscode 404 if blog does not exist', async () => {
      const validNonexistingId = await helper.nonExistingId();

      await api
        .get(`/api/blogs/${validNonexistingId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(404);
    });

    test('fails with statuscode 400 if id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445';

      await api
        .get(`/api/blogs/${invalidId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(400);
    });
  });

  describe('addition of a new blog', () => {
    test('succeeds with valid data', async () => {
      const usersAtStart = await helper.usersInDb();

      const newBlog = {
        title: 'Testing patterns',
        author: 'Tests are funny',
        url: 'https://testingtpatterns.com/',
        likes: 7,
        userId: usersAtStart[0].id
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

    test('verify that newly created blog is added to the user', async () => {
      const usersAtStart = await helper.usersInDb();

      const newBlog = {
        title: 'Testing patterns',
        author: 'Tests are funny',
        url: 'https://testingtpatterns.com/',
        likes: 7,
        userId: usersAtStart[0].id
      };

      const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const usersAtEnd = await helper.usersInDb();
      assert.strictEqual(
        usersAtEnd[0].blogs.length,
        usersAtStart[0].blogs.length + 1
      );

      const newlyAddedBlogUserId = response.body.user.toString();
      assert.strictEqual(newlyAddedBlogUserId, usersAtStart[0].id);
    });

    test('verify that the unique identifier property is named id', async () => {
      const response = await api.get('/api/blogs');

      assert(response.body[0].id);
      assert.strictEqual(response.body[0]._id, undefined);
    });

    test('verify that if missing the default value of likes is 0', async () => {
      const usersAtStart = await helper.usersInDb();

      const newBlog = {
        title: 'Likes missing',
        author: 'no likes :(',
        url: 'https://testingtpatterns.com/',
        userId: usersAtStart[0].id
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

    test('fails with status code 400 if title property is missing', async () => {
      const usersAtStart = await helper.usersInDb();

      const newBlog = {
        author: 'no likes :(',
        url: 'https://testingtpatterns.com/',
        userId: usersAtStart[0].id
      };

      await api.post('/api/blogs').send(newBlog).expect(400);

      const blogsAtEnd = await helper.blogsInDb();
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
    });

    test('fails with status code 400 if url property is missing', async () => {
      const usersAtStart = await helper.usersInDb();

      const newBlog = {
        title: 'Likes missing',
        author: 'no likes :(',
        userId: usersAtStart[0].id
      };

      await api.post('/api/blogs').send(newBlog).expect(400);

      const blogsAtEnd = await helper.blogsInDb();
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
    });
  });

  describe('updating a blog', () => {
    test('succeeds with a valid id', async () => {
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

    test('fails with statuscode 404 if blog does not exist', async () => {
      const validNonexistingId = await helper.nonExistingId();

      await api.put(`/api/blogs/${validNonexistingId}`).expect(404);
    });

    test('fails with status code 400 if id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445';
      await api.put(`/api/blogs/${invalidId}`).expect(400);
    });
  });

  describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToDelete = blogsAtStart[0];

      await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

      const blogsAtEnd = await helper.blogsInDb();

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1);

      const titles = blogsAtEnd.map((b) => b.title);
      assert(!titles.includes(blogToDelete.title));
    });

    test('fails with status code 400 if id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445';
      await api.delete(`/api/blogs/${invalidId}`).expect(400);
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});
