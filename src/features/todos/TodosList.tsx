import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import { useAppDispatch, useLocalStorage } from '../../app/hooks';
import { setTodos } from './todosSlice';

import { Todo } from '../../types/todo';

import './TodosList.scss';
import '../../styles/form.scss'

const TodosList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [newTodoBody, setNewTodoBody] = useState('');
  const [localStorageTodos, setLocalStorageTodos] = useLocalStorage<Todo[]>('todos', []);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setTodos(localStorageTodos));
  }, [dispatch, localStorageTodos]);

  const handleAddTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newTodo = {
      id: Date.now(),
      body: newTodoBody,
      completed: false
    }
  
    setNewTodoBody('');
    setLocalStorageTodos([...localStorageTodos, newTodo])
  }

  const deleteTodo = (todoId: number) => {
    setLocalStorageTodos(localStorageTodos.filter(todo => todo.id !== todoId));
  }

  const toggleTodo = (todoId: number) => {
    setLocalStorageTodos(localStorageTodos.map(todo => {
      if (todo.id === todoId) {
        return {
          ...todo,
          completed: !todo.completed
        };
      }

      return todo;
    }))
  }

  const filter = searchParams.get('filter') || '';
  let todos = [...localStorageTodos];
  
  switch(filter) {
    case 'todo': {
      todos = todos.filter(todo => !todo.completed)
      break;
    }
    case 'done': {
      todos = todos.filter(todo => todo.completed)
      break;
    }
    default: {
      todos.sort((a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1);
    }
  }

  return (
    <>
      <div className='filter-buttons'>
        <button
          onClick={e => setSearchParams({})}
          className={classNames(
            'filter-buttons__button',
            { 'filter-buttons__button--selected': filter === ''}
          )}
        >
          All
        </button>
        <button
          onClick={e => setSearchParams({ filter: 'todo' })}
          className={classNames(
            'filter-buttons__button',
            { 'filter-buttons__button--selected': filter === 'todo'}
          )}
        >
          Todo
        </button>
        <button
          onClick={e => setSearchParams({ filter: 'done' })}
          className={classNames(
            'filter-buttons__button',
            { 'filter-buttons__button--selected': filter === 'done'}
          )}
        >
          Done
        </button>
      </div>
      <form onSubmit={handleAddTodo} className='form'>
        <input
          type='text'
          value={newTodoBody}
          onChange={e => setNewTodoBody(e.target.value)}
          className='form__text-input'
        />
        <button
          type='submit'
          className='form__button'
        >
          Add
        </button>        
      </form>
      <ul className='list'>
        {todos.map(todo => (
          <li key={todo.id} className='list__item'>
            <input
              type='checkbox'
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              className='list__item-checkbox'
            />
            <Link
              to={`${todo.id}`}
              className={classNames(
                'list__item-text',
                { 'list__item-text--completed': todo.completed }
                )}
            >
              {todo.body}
            </Link>
            <button
              type='button'
              onClick={() => deleteTodo(todo.id)}
              className='list__item-button'
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </>
  )
}

export default TodosList;
