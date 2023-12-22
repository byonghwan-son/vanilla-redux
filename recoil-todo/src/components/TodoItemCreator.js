import React, {useState} from 'react';
import {useRecoilState} from "recoil";
import {todoListState} from "../states/atoms";

function TodoItemCreator() {

  const [inputValue, setInputValue] = useState('');
  const [todoList, setTodoList] = useRecoilState(todoListState);
  // const setTodoList = useSetRecoilState(todoListState);
  // 구조 분해 할당 : cool
  //const onChange = ({ target : { value : inputValue } }) => setInputValue(inputValue)

  // 구조 분해 할당
  const onChange = ({ target : { value } }) => setInputValue(value)

  const addItem = () => {
    setTodoList(
      [...todoList,
        {
          id: Date.now(),
          text: inputValue,
          isComplete: false,
        },
      ]
    );
    setInputValue('');
  }

  return (
    <div>
      <input type="text" value={inputValue}
             onChange={onChange} />
      <button onClick={addItem}>Add</button>
    </div>
  );
}

export default TodoItemCreator;