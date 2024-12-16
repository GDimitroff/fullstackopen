/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react'

export const Todo = ({ todo, onClickDelete, onClickComplete }) => {
  const doneInfo = (
    <>
      <span>This todo is done</span>
      <span>
        <button onClick={onClickDelete(todo)}> Delete </button>
      </span>
    </>
  )

  const notDoneInfo = (
    <>
      <span>This todo is not done</span>
      <span>
        <button onClick={onClickDelete(todo)}> Delete </button>
        <button onClick={onClickComplete(todo)}> Set as done </button>
      </span>
    </>
  )

  return (
    <div>
      <hr />
      <div
        className='todo'
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          maxWidth: '70%',
          margin: 'auto',
        }}
      >
        <span>{todo.text}</span>
        {todo.done ? doneInfo : notDoneInfo}
      </div>
    </div>
  )
}

const TodoList = ({ todos, deleteTodo, completeTodo }) => {
  const onClickDelete = (todo) => () => {
    deleteTodo(todo)
  }

  const onClickComplete = (todo) => () => {
    completeTodo(todo)
  }

  return (
    <div>
      {todos.map((todo) => (
        <Todo
          key={todo._id}
          todo={todo}
          onClickDelete={onClickDelete}
          onClickComplete={onClickComplete}
        />
      ))}
    </div>
  )
}

export default TodoList
