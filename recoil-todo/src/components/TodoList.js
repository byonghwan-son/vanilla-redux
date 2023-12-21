import React from 'react';
import TodoItemCreator from "./TodoItemCreator";
import TodoItem from "./TodoItem";
import {useRecoilValue} from "recoil";
import {todoListState} from "../states/atoms";

function TodoList() {
  const todoList = useRecoilValue(todoListState);

  return (
    <>
      <TodoItemCreator />
      {
        todoList.map(todoItem => <TodoItem key={todoItem.id} item={todoItem} />)
      }
    </>
  );
}

export default TodoList;