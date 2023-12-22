import React from 'react';
import TodoItemCreator from "./TodoItemCreator";
import TodoItem from "./TodoItem";
import {useRecoilValue} from "recoil";
import TodoListFilters from "./TodoListFilters";
import {filteredTodoListState} from "../states/selectors";
import TodoListStats from "./TodoListStats";

function TodoList() {
  const todoList = useRecoilValue(filteredTodoListState);

  return (
    <>
      <TodoListStats />
      <TodoListFilters />
      <TodoItemCreator/>
      <ul>
        {todoList.map(todoItem =>
          <TodoItem key={todoItem.id} item={todoItem}/>)}
      </ul>
    </>
  );
}

export default TodoList;