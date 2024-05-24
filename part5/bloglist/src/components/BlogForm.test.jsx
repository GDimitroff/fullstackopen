import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect } from 'vitest'

import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  let component
  let mockCreateBlogHandler

  beforeEach(() => {
    mockCreateBlogHandler = vi.fn()

    component = render(<BlogForm createBlog={mockCreateBlogHandler} />)
  })

  test('renders content', () => {
    const div = component.getByTestId('blogform')
    screen.getByText('title:')
    screen.getByText('author:')
    screen.getByText('create')

    expect(div).toBeDefined()
  })

  test('calls createBlog with the right details', async () => {
    const titleInput = screen.getByPlaceholderText('react is awesome')
    const authorInput = screen.getByPlaceholderText('john doe')
    const urlInput = screen.getByPlaceholderText('https://example.com/')
    const createButton = component.getByText('create')

    await userEvent.type(titleInput, 'React testing')
    await userEvent.type(authorInput, 'self-taught developer')
    await userEvent.type(urlInput, 'https://example.com/')
    await userEvent.click(createButton)

    expect(mockCreateBlogHandler).toHaveBeenCalledTimes(1)
    expect(mockCreateBlogHandler).toHaveBeenCalledWith({
      title: 'React testing',
      author: 'self-taught developer',
      url: 'https://example.com/',
    })
  })
})
