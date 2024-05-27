// @ts-check
import { test, expect } from '@playwright/test'
import { resetDatabase, login, createBlog, viewAndLikeBlog } from './helper'

const blog = {
  title: 'New Blog',
  author: 'placeholder',
  url: 'http://example.com',
}

test.describe('blogs app', () => {
  test.beforeEach(async ({ page, request }) => {
    await resetDatabase(request)
    await page.goto('/')
  })

  test('login form is shown', async ({ page }) => {
    await expect(page.getByText('username')).toBeVisible()
    await expect(page.getByText('password')).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  test.describe('login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await login(page, 'King', 'king')
      await expect(page.getByText('King Tester logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await login(page, 'King', 'wrong-password')
      await expect(page.getByTestId('notification')).toHaveText(
        'invalid username or password'
      )
    })
  })

  test.describe('when logged in', () => {
    test.beforeEach(async ({ page }) => {
      await login(page, 'King', 'king')
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
      await login(page, 'Dummy', 'dummy')

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

      await viewAndLikeBlog(page, 'title1', 1)
      await viewAndLikeBlog(page, 'title2', 3)
      await viewAndLikeBlog(page, 'title3', 2)

      const blogDivs = await page.locator('[data-testid="blog"]').all()

      await expect(blogDivs[0].getByText('title2 author2')).toBeVisible()
      await expect(blogDivs[1].getByText('title3 author3')).toBeVisible()
      await expect(blogDivs[2].getByText('title1 author1')).toBeVisible()
    })
  })
})
