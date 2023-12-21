import {legacy_createStore as createStore} from "redux";
import {configureStore, createSlice} from "@reduxjs/toolkit";

const toDosSlice = createSlice({
  name: 'TodoSlice',
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      const key = Date.now();
      state.push({text: action.payload, id: key, key: key })
    },
    deleteTodo: (state, action) => state.filter(todo => todo.id !== action.payload)
  }
});

const store = configureStore({
  reducer: toDosSlice.reducer
});

export const actionCreators = { ...toDosSlice.actions }

export default store;

/*
const addTodo = createAction('ADD');
const deleteTodo = createAction('DELETE');

const reducer = createReducer([], (builder) =>
  builder
    .addCase(addTodo, (state, action) => {
      const key = Date.now();
      state.push({ text : action.payload, id: key, key: key});
    })
    .addCase(deleteTodo, (state, action) =>
      state.filter(todo => todo.id !== action.payload)
    )
);

const reducer = (state = [], action) => {
  switch(action.type) {
    case addTodo.type:
      const key = Date.now();
      return [{ text : action.payload, id: key, key: key}, ...state];
    case deleteTodo.type:
      return state.filter(todo => todo.id !== action.payload);
    default:
      return state;
  }
};*/
