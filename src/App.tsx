import { NavLink, Route, Routes } from 'react-router-dom';
import classNames from 'classnames';

import TodosList from './features/todos/TodosList';
import TodoItem from './features/todo/Todo';
import Photos from './features/photos/Photos';

import './App.scss';

function App() {
  return (
    <>
      <header className='header'>
        <nav className='header__nav'>
          <NavLink
            to='todos'
            className={({ isActive }) => classNames('header__link', { 'header__link--active': isActive })}
          >
            Todos
          </NavLink>
          <NavLink
            to='photos'
            className={({ isActive }) => classNames('header__link', { 'header__link--active': isActive })}
          >
            Photos
          </NavLink>
        </nav>
      </header>

      <main className='main'>
        <Routes>
          <Route path='/todos' element={<TodosList />} />
          <Route path='/todos/:todoId' element={<TodoItem />} />
          <Route path='/photos'element={<Photos />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
