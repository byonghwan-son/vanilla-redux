import {legacy_createStore as createStore} from "redux";
import {createAction, createReducer} from "@reduxjs/toolkit";

const addTodo = createAction('ADD');
const deleteTodo = createAction('DELETE');

const reducer = createReducer([], (builder) =>
  builder
    .addCase(addTodo, (state, action) => {
        const key = Date.now();
        state.push({text: action.payload, id: key, key: key});
      }
    )
    .addCase(deleteTodo, (state, action) =>
      state.filter(todo => todo.id !== action.payload)
    )
);

const store = createStore(reducer);

export const actionCreators = { addTodo, deleteTodo }

export default store;