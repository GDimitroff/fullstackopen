// @ts-check
import { test, expect } from '@playwright/test'
import { loginWith, createBlog, createUser } from './helper'

const users = [
  {
    name: 'King Tester',
    username: 'King',
    password: 'king',
  },
  {
    name: 'Dummy Tester',
    username: 'Dummy',
    password: 'dummy',
  },
]

const blog = {
  title: 'New Blog',
  author: 'placeholder',
  url: 'http://example.com',
}

test.describe('blogs app', () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await Promise.all(users.map((user) => createUser(request, user)))

    await page.goto('/')
  })

  test('login form is shown', async ({ page }) => {
    await expect(page.getByText('username')).toBeVisible()
    await expect(page.getByText('password')).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  test.describe('login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'King', 'king')
      await expect(page.getByText('King Tester logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'King', 'wrong-password')
      await expect(page.getByTestId('notification')).toHaveText(
        'invalid username or password'
      )
    })
  })

  test.describe('when logged in', () => {
    test.beforeEach(async ({ page }) => {
      await loginWith(page, 'King', 'king')
    })

    test('user can logout', async ({ page }) => {
      await page.getByRole('button', { name: 'logout' }).click()
      await expect(page.getByText('username')).toBeVisible()
      await expect(page.getByText('password')).toBeVisible()
      await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, blog)
      await expect(page.getByText('New Blog placeholder')).toBeVisible()
    })

    test('blog can be liked', async ({ page }) => {
      await createBlog(page, blog)
      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByTestId('blog-likes')).toHaveText('likes 0 like')

      await page.getByRole('button', { name: 'like' }).click()
      await expect(page.getByTestId('blog-likes')).toHaveText('likes 1 like')
    })

    test('blog can be deleted', async ({ page }) => {
      await createBlog(page, blog)
      await page.getByRole('button', { name: 'view' }).click()

      page.on('dialog', (dialog) => dialog.accept())
      await page.getByRole('button', { name: 'remove' }).click()

      const { title, author } = blog
      await expect(page.getByTestId('notification')).toHaveText(
        `blog ${title} by ${author} removed`
      )
      await expect(page.getByText(`${title} ${author}`)).not.toBeVisible()
    })

    test('blog cannot be deleted by another user', async ({ page }) => {
      await createBlog(page, blog)
      await page.getByRole('button', { name: 'logout' }).click()
      await loginWith(page, 'Dummy', 'dummy')

      await page.getByRole('button', { name: 'view' }).click()

      await expect(
        page.getByRole('button', { name: 'remove' })
      ).not.toBeVisible()
    })

    test('blogs are ordered by likes', async ({ page }) => {
      await createBlog(page, {
        title: 'title1',
        author: 'author1',
        url: 'http://example.com',
      })

      await createBlog(page, {
        title: 'title2',
        author: 'author2',
        url: 'http://example.com',
      })

      await createBlog(page, {
        title: 'title3',
        author: 'author3',
        url: 'http://example.com',
      })

      const blogs = page.locator('[data-testid="blog"]')

      const secondBlog = page.getByText('title2 author2')
      await secondBlog.getByRole('button', { name: 'view' }).click()
      await secondBlog.getByRole('button', { name: 'like' }).click()
      await expect(secondBlog.getByText('likes 1')).toBeVisible()

      await secondBlog.getByRole('button', { name: 'like' }).click()
      await expect(secondBlog.getByText('likes 2')).toBeVisible()

      await secondBlog.getByRole('button', { name: 'like' }).click()
      await expect(secondBlog.getByText('likes 3')).toBeVisible()

      await secondBlog.getByRole('button', { name: 'like' }).click()
      await expect(secondBlog.getByText('likes 4')).toBeVisible()

      const thirdBlog = page.getByText('title3 author3')
      await thirdBlog.getByRole('button', { name: 'view' }).click()
      await thirdBlog.getByRole('button', { name: 'like' }).click()
      await expect(thirdBlog.getByText('likes 1')).toBeVisible()

      await thirdBlog.getByRole('button', { name: 'like' }).click()
      await expect(thirdBlog.getByText('likes 2')).toBeVisible()

      await expect(blogs.first().getByText('title2 author2')).toBeVisible()
      await expect(blogs.nth(1).getByText('title3 author3')).toBeVisible()
      await expect(blogs.last().getByText('title1 author1')).toBeVisible()
    })
  })
})
