import React from "react";
import {RecoilRoot} from "recoil";
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
