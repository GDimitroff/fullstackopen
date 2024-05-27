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

const resetDatabase = async (request) => {
  await request.post('/api/testing/reset')
  await Promise.all(users.map((user) => createUser(request, user)))
}

const createUser = async (request, user) => {
  return request.post('/api/users', { data: user })
}

const login = async (page, username, password) => {
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, { title, author, url }) => {
  await page.getByRole('button', { name: 'new blog' }).click()
  await page.getByTestId('title').fill(title)
  await page.getByTestId('author').fill(author)
  await page.getByTestId('url').fill(url)
  page.getByRole('button', { name: 'create' }).click()

  await page.getByText(`${title} ${author}`).waitFor()
}

const viewAndLikeBlog = async (page, query, likes) => {
  await page.getByText(query).getByRole('button', { name: 'view' }).click()
  const likeButton = page.getByText(query).getByRole('button', { name: 'like' })

  await likeTimes(page, likeButton, likes)

  await page.getByText(query).getByRole('button', { name: 'hide' }).click()
}

async function likeTimes(page, button, n) {
  for (let i = 0; i < n; i++) {
    await button.click()
    await page.getByText(`likes ${i + 1}`).waitFor()
  }
}

export { resetDatabase, createUser, login, createBlog, viewAndLikeBlog }
