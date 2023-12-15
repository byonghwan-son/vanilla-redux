import {legacy_createStore as createStore} from "redux";
import {configureStore, createAction, createReducer} from "@reduxjs/toolkit";

const addToDo = createAction("ADD")
const deleteToDo = createAction("DELETE")

const reducer = createReducer([], (builder => {
  builder
    .addCase(addToDo, (state, action) => {
      state.push({text: action.payload, id: Date.now()})
    })
    .addCase(deleteToDo, (state, action) => state.filter(todo => todo.id !== action.payload))
}))

const store = configureStore({reducer})

export const actionCreator = {
  addToDo,
  deleteToDo
}

export default store