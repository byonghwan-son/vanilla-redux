# redux toolkit

* createAction  
Action 만들기
```javascript
// 기존 redux를 사용할 때
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

// 새로운 action 만들기
// createAction 함수를 사용
const addTodo = createAction("ADD");
const deleteTodo = createAction("DELETE");

// const ADD = 'ADD' 대신에
// addTodo.type 을 사용함
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
```
