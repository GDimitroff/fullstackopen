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
    await request.post('http:localhost:3001/api/testing/reset')
    await Promise.all(users.map((user) => createUser(request, user)))

    await page.goto('http://localhost:5173')
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
      await expect(page.getByTestId('blog-likes')).toHaveText('likes 0 like')
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
  })
})
