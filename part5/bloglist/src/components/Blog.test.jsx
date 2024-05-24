import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Blog from './Blog'

describe('<Blog />', () => {
  let component

  beforeEach(() => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'Master of the Tests',
      like: 0,
      url: 'https://example.com/',
    }

    component = render(<Blog blog={blog} />)
  })

  test('renders content', () => {
    const div = component.getByTestId('blog')

    expect(div).toHaveTextContent(
      'Component testing is done with react-testing-library'
    )
  })
})
