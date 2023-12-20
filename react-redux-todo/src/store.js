import {legacy_createStore as createStore} from "redux";

const ADD = 'ADD';
const DELETE = 'DELETE';

const addTodo = text => {
  return {
    type: ADD,
    text
  }
}

const deleteTodo = id => {
  return {
    type: DELETE,
    id
  }
}

const reducer = (state = [], action) => {
  switch(action.type) {
    case ADD:
      const key = Date.now();
      return [{ text : action.text, id: key, key: key}, ...state];
    case DELETE:
      return state.filter(todo => todo.id !== action.id);
    default:
      return state;
  }
};

const store = createStore(reducer);

export const actionCreators = { addTodo, deleteTodo }

export default store;