const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('./dummy_helper')

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 12,
    __v: 0,
  },
]

describe('list helper', () => {
  describe('dummy', () => {
    test('dummy returns one', () => {
      const blogs = []

      const result = listHelper.dummy(blogs)
      assert.strictEqual(result, 1)
    })
  })

  describe('favorite blog', () => {
    test('returns undefined when the blog list is empty', () => {
      const result = listHelper.favoriteBlog([])
      assert.deepStrictEqual(result, undefined)
    })

    test('identifies the blog with the highest number of likes', () => {
      const result = listHelper.favoriteBlog(blogs)
      assert.deepStrictEqual(result, blogs[1])
    })

    test('returns the first blog when multiple blogs have the same highest number of likes', () => {
      const result = listHelper.favoriteBlog(blogs)
      assert.deepStrictEqual(result, blogs[1])
    })

    test('returns the only blog when the list contains only one blog', () => {
      const result = listHelper.favoriteBlog([blogs[0]])
      assert.deepStrictEqual(result, blogs[0])
    })
  })

  describe('most blogs', () => {
    test('of empty list is undefined', () => {
      const result = listHelper.mostBlogs([])
      assert.strictEqual(result, undefined)
    })

    test('when list has only one blog, equals the author of that', () => {
      const result = listHelper.mostBlogs([blogs[0]])
      assert.deepStrictEqual(result, { author: 'Michael Chan', blogs: 1 })
    })

    test('of a bigger list is calculated right', () => {
      const result = listHelper.mostBlogs(blogs)
      assert.deepStrictEqual(result, { author: 'Robert C. Martin', blogs: 3 })
    })
  })

  describe('most likes', () => {
    test('returns undefined when the blog list is empty', () => {
      const result = listHelper.mostLikes([])
      assert.deepStrictEqual(result, undefined)
    })

    test('returns the author with the most likes', () => {
      const result = listHelper.mostLikes(blogs)
      assert.deepStrictEqual(result, {
        author: 'Edsger W. Dijkstra',
        likes: 24,
      })
    })

    test('returns the first author with the most likes when there are multiple authors with the same amount of likes', () => {
      const result = listHelper.mostLikes(blogs)
      assert.deepStrictEqual(result, {
        author: 'Edsger W. Dijkstra',
        likes: 24,
      })
    })
  })

  describe('total likes', () => {
    test('returns zero for an empty blog list', () => {
      const result = listHelper.totalLikes([])
      assert.strictEqual(result, 0)
    })

    test('returns the likes of the single blog when list has only one blog', () => {
      const result = listHelper.totalLikes([blogs[0]])
      assert.strictEqual(result, 7)
    })

    test('calculates total likes correctly for a larger blog list', () => {
      const result = listHelper.totalLikes(blogs)
      assert.strictEqual(result, 53)
    })

    test('returns zero for a single blog with zero likes', () => {
      const result = listHelper.totalLikes([blogs[4]])
      assert.strictEqual(result, 0)
    })
  })
})
