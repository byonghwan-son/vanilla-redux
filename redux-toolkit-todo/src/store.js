import {legacy_createStore as createStore} from "redux";
import { createAction } from "@reduxjs/toolkit";

const addTodo = createAction('ADD');
const deleteTodo = createAction('DELETE');

console.log(addTodo(), deleteTodo(), addTodo.type, addTodo.payload)

const reducer = (state = [], action) => {
  switch(action.type) {
    case addTodo.type:
      const key = Date.now();
      return [{ text : action.text, id: key, key: key}, ...state];
    case deleteTodo.type:
      return state.filter(todo => todo.id !== action.id);
    default:
      return state;
  }
};

const store = createStore(reducer);

export const actionCreators = { addTodo, deleteTodo }

export default store;