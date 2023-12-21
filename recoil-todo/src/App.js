import React from "react";
import {RecoilRoot, useRecoilValue} from "recoil";
import TodoItemCreator from "./components/TodoItemCreator";
import TodoItem from "./components/TodoItem";
import {todoListState} from "./states/atoms";
import TodoList from "./components/TodoList";

function App() {
  return (
    <RecoilRoot>
      <h2>Recoil Todo</h2>
      <TodoList />
    </RecoilRoot>
  );
}

export default App;
