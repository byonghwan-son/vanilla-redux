import React from 'react';
import {useRecoilState} from "recoil";
import {todoListState} from "../states/atoms";

function TodoItem({ item }) {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const index = todoList.findIndex((todoItem) => todoItem === item);

  const deleteItem = () => {
    const newList = removeItemAtIndex(todoList, index);

    setTodoList(newList);
  }

  const editItemText = ({ target : { value }}) => {
    const newList = replaceItemAtIndex(todoList, index, {
      ...item,
      text: value
    })

    setTodoList(newList);
  }

  const toggleItemComplete = () => {
    const newList = replaceItemAtIndex(todoList, index, {
      ...item,
      isComplete: !item.isComplete,
    });
    setTodoList(newList);
  }

  return (
    <li>
      <input type="text" value={item.text} onChange={editItemText} disabled={item.isComplete}/>
      <input type="checkbox" checked={item.isComplete} onChange={toggleItemComplete}/>
      <button onClick={deleteItem}>X</button>
    </li>
  );
}

export default TodoItem;

function replaceItemAtIndex(origin, index, newValue) {
  return [...origin.slice(0, index), newValue, ...origin.slice(index + 1)];
}

function removeItemAtIndex(origin, index) {
  return [...origin.slice(0, index), ...origin.slice(index + 1)];
}