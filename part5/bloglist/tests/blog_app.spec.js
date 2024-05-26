// @ts-check
import { test, expect } from '@playwright/test'
import { loginWith } from './helper'

test.describe('blogs app', () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post('http:localhost:3001/api/testing/reset')
    await request.post('http://localhost:3001/api/users', {
      data: {
        name: 'King Tester',
        username: 'King',
        password: 'king',
      },
    })

    await page.goto('http://localhost:5173')
  })

  test('login form is shown', async ({ page }) => {
    const locator = page.getByRole('heading', {
      name: 'log in to application',
    })
    await expect(locator).toBeVisible()
    await expect(page.getByText('username')).toBeVisible()
    await expect(page.getByText('password')).toBeVisible()
  })

  test.describe('login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'King', 'king')
      const locator = page.getByRole('heading', {
        name: 'blogs',
      })
      await expect(locator).toBeVisible()
      expect(page.getByText('King Tester logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'Dummy', 'dummy')
      expect(
        page.getByRole('heading', {
          name: 'log in to application',
        })
      ).toBeVisible()
      await expect(page.getByText('username')).toBeVisible()
      await expect(page.getByText('password')).toBeVisible()
    })
  })

  test.describe('when logged in', () => {
    test.beforeEach(async ({ page }) => {
      await loginWith(page, 'King', 'king')
    })

    test('successfully logout', async ({ page }) => {
      await page.getByRole('button', { name: 'logout' }).click()
      await expect(
        page.getByRole('heading', { name: 'log in to application' })
      ).toBeVisible()
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'new blog' }).click()
      await page.getByTestId('title').fill('New Blog')
      await page.getByTestId('author').fill('dummy user')
      await page.getByTestId('url').fill('http://localhost:3001')
      await page.getByRole('button', { name: 'create' }).click()
      await expect(page.getByText('New Blog dummy user')).toBeVisible()
    })
  })
})
