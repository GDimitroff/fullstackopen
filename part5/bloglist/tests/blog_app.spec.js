// @ts-check
import { test, expect } from '@playwright/test'

test.describe('blogs app', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('login form is shown', async ({ page }) => {
    await page.goto('http://localhost:5173')

    const locator = page.getByRole('heading', {
      name: 'log in to application',
    })
    await expect(locator).toBeVisible()
    await expect(page.getByText('username')).toBeVisible()
    await expect(page.getByText('password')).toBeVisible()
  })
})
