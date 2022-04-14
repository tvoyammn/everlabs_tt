import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useLocalStorage } from "../../app/hooks";

import { Todo } from "../../types/todo";

import './Todo.scss';

const TodoItem: React.FC = () => {
  const { todoId } = useParams();

  const [localStorageTodos, setLocalStorageTodos] = useLocalStorage<Todo[]>('todos', []);
  
  const [todo, setTodo] = useState<Todo>();
  const [newTodoBody, setNewTodoBody] = useState('');

  useEffect(() => {
    if (todoId) {
      setTodo(localStorageTodos.find(todo => todo.id === +todoId));
    }
  }, [localStorageTodos, todoId]);

  const handleEdit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setNewTodoBody('');
    setLocalStorageTodos(localStorageTodos.map(mtodo => {
      if (mtodo.id === todo?.id) {
        return {
          ...mtodo,
          body: newTodoBody
        }
      }
      return mtodo;
    }))
  }

  return (
    <>
      <p className="todo-body">{todo?.body}</p>
      <form
        className="form"
        onSubmit={handleEdit}
      >
        <input
          type="text"
          className="form__text-input"
          value={newTodoBody}
          onChange={event => setNewTodoBody(event.target.value)}
        />
        <button
          type="submit"
          className="form__button"
        >
          Edit
        </button>
      </form>
    </>
  )
}

export default TodoItem;