import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Todo } from '../../types/todo';

export interface TodosState {
  todos: Todo[]
}

const initialState: TodosState = {
  todos: [],
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
    }
  },
});

export const { setTodos } = todosSlice.actions;

export default todosSlice.reducer;
