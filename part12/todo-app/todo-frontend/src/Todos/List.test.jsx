import { render } from '@testing-library/react'
import { Todo } from './List'

test('renders Todo content', () => {
  const todo = {
    text: 'Increase the number of tools in my toolbelt',
    done: false,
  }

  const { container } = render(
    <Todo
      todo={todo}
      onClickDelete={() => console.log('onClickDelete')}
      onClickComplete={() => console.log('onClickComplete')}
    />,
  )

  const div = container.querySelector('.todo')
  expect(div).toHaveTextContent('Increase the number of tools in my toolbelt')
  expect(div).toHaveTextContent('This todo is not done')
})

test('renders Todo content 2', () => {
  const todo = {
    text: 'Learn about containers',
    done: true,
  }

  const { container } = render(
    <Todo
      todo={todo}
      onClickDelete={() => console.log('onClickDelete')}
      onClickComplete={() => console.log('onClickComplete')}
    />,
  )

  const div = container.querySelector('.todo')
  expect(div).toHaveTextContent('Learn about containers')
  expect(div).toHaveTextContent('This todo is done')
})
