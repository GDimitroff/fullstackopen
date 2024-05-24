import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect } from 'vitest'

import Blog from './Blog'

const user = {
  username: 'random',
  name: 'john doe',
}

const blog = {
  title: 'react-testing-library',
  author: 'Master of the Tests',
  likes: 7,
  url: 'https://example.com/',
  user,
}

describe('<Blog />', () => {
  let component

  beforeEach(() => {
    component = render(<Blog blog={blog} user={user} />)
  })

  test('renders content', () => {
    const titleElement = screen.getByText('react-testing-library', {
      exact: false,
    })
    const authorElement = screen.getByText('Master of the Tests', {
      exact: false,
    })

    expect(titleElement).toBeDefined()
    expect(authorElement).toBeDefined()
  })

  test('do not renders blog details initially', () => {
    const div = component.container.querySelector(
      '[data-testid="blog-details"]'
    )

    expect(div).toBeNull()
  })

  test('renders details after clicking the view button', async () => {
    const blogDiv = component.getByTestId('blog')
    const button = screen.getByText('view')
    const user = userEvent.setup()
    await user.click(button)

    const detailsDiv = component.getByTestId('blog-details')

    expect(blogDiv).toBeInTheDocument()
    expect(detailsDiv).toBeInTheDocument()

    screen.getByText('likes 7', {
      exact: false,
    })
    screen.getByText('https://example.com/', {
      exact: false,
    })
  })
})
