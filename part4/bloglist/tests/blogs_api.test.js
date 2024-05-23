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
      const blogs = await helper.blogsInDb();
      const blogToView = blogs[0];

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
      const users = await helper.usersInDb();
      const kingUser = users.find((u) => u.username === 'King');

      const newBlog = {
        title: 'Testing patterns',
        author: 'Tests are funny',
        url: 'https://testingtpatterns.com/',
        likes: 7,
        userId: kingUser.id
      };

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const blogs = await helper.blogsInDb();
      assert.strictEqual(blogs.length, helper.initialBlogs.length + 1);

      const titles = blogs.map((b) => b.title);
      assert(titles.includes('Testing patterns'));
    });

    test('verify that newly created blog has the correct userId', async () => {
      const users = await helper.usersInDb();
      const kingUser = users.find((u) => u.username === 'King');

      const newBlog = {
        title: 'Testing patterns',
        author: 'Tests are funny',
        url: 'https://testingtpatterns.com/',
        likes: 7
      };

      const response = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      assert.strictEqual(response.body.user, kingUser.id);
    });

    test('verify that the unique identifier property is named id', async () => {
      const response = await api
        .get('/api/blogs')
        .set('Authorization', `Bearer ${token}`);

      assert(response.body[0].id);
      assert.strictEqual(response.body[0]._id, undefined);
    });

    test('verify that if missing the default value of likes is 0', async () => {
      const newBlog = {
        title: 'Likes missing',
        author: 'no likes :(',
        url: 'https://testingtpatterns.com/'
      };

      const response = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const blogs = await helper.blogsInDb();
      assert.strictEqual(blogs.length, helper.initialBlogs.length + 1);
      assert.strictEqual(response.body.likes, 0);
    });

    test('fails with status code 400 if title property is missing', async () => {
      const newBlog = {
        author: 'no likes :(',
        url: 'https://testingtpatterns.com/'
      };

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(400);

      const blogs = await helper.blogsInDb();
      assert.strictEqual(blogs.length, helper.initialBlogs.length);
    });

    test('fails with status code 400 if url property is missing', async () => {
      const newBlog = {
        title: 'Likes missing',
        author: 'no likes :('
      };

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(400);

      const blogs = await helper.blogsInDb();
      assert.strictEqual(blogs.length, helper.initialBlogs.length);
    });

    test('fails with status code 401 if there is no authorization token', async () => {
      const newBlog = {
        title: 'Testing patterns',
        author: 'Tests are funny',
        url: 'https://testingtpatterns.com/',
        likes: 7
      };

      await api.post('/api/blogs').send(newBlog).expect(401);
    });
  });

  describe('updating a blog', () => {
    test('succeeds with a valid id', async () => {
      const blogs = await helper.blogsInDb();
      const users = await helper.usersInDb();
      const kingUser = users.find((u) => u.username === 'King');
      const kingsBlog = blogs.find((b) => b.user.toString() === kingUser.id);

      const response = await api
        .put(`/api/blogs/${kingsBlog.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ title: 'Updated Blog', likes: 99 })
        .expect(200)
        .expect('Content-Type', /application\/json/);

      assert.strictEqual(response.body.title, 'Updated Blog');
      assert.strictEqual(response.body.likes, 99);
    });

    test('fails with statuscode 404 if blog does not exist', async () => {
      const validNonexistingId = await helper.nonExistingId();

      await api
        .put(`/api/blogs/${validNonexistingId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(404);
    });

    test('fails with status code 400 if id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445';
      await api
        .put(`/api/blogs/${invalidId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(400);
    });

    test("fails with status code 401 if user tries to update another's blog", async () => {
      const blogs = await helper.blogsInDb();
      const users = await helper.usersInDb();
      const kingUser = users.find((u) => u.username === 'King');
      const kingsBlog = blogs.find((b) => b.user.toString() === kingUser.id);

      const response = await api
        .post('/api/login')
        .send({ username: 'Dummy', password: 'dummy' });

      const dummyUserToken = response.body.token;

      await api
        .put(`/api/blogs/${kingsBlog.id}`)
        .set('Authorization', `Bearer ${dummyUserToken}`)
        .send({ title: 'Updated Blog', likes: 99 })
        .expect(401);
    });
  });

  describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blogs = await helper.blogsInDb();
      const users = await helper.usersInDb();
      const kingUser = users.find((u) => u.username === 'King');
      const kingsBlog = blogs.find((b) => b.user.toString() === kingUser.id);

      await api
        .delete(`/api/blogs/${kingsBlog.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204);

      const blogsAtEnd = await helper.blogsInDb();

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1);

      const titles = blogsAtEnd.map((b) => b.title);
      assert(!titles.includes(kingsBlog.title));
    });

    test('fails with status code 400 if id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445';

      await api
        .delete(`/api/blogs/${invalidId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(400);
    });

    test("fails with status code 401 if user tries to delete another's blog", async () => {
      const blogs = await helper.blogsInDb();
      const users = await helper.usersInDb();
      const kingUser = users.find((u) => u.username === 'King');
      const kingsBlog = blogs.find((b) => b.user.toString() === kingUser.id);

      const response = await api
        .post('/api/login')
        .send({ username: 'Dummy', password: 'dummy' });

      const dummyUserToken = response.body.token;

      await api
        .delete(`/api/blogs/${kingsBlog.id}`)
        .set('Authorization', `Bearer ${dummyUserToken}`)
        .expect(401);
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});
