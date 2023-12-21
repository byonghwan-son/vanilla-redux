# redux toolkit

## createAction
더 이상 이전의 복잡했던 액션 코드에서 벗어나자.
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
// 적용할 값은 모두 action 파라미터의 payload 라는 속성에 담겨져 있다.
// action.text -> action.payload
// action.id -> action.payload
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
};
```

## createReducer
복잡한 switch, case 문에서 벗어나자
```javascript
// 기존 코드
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
};

// 심플한 코드로...
// [] : 초기값
// 리턴을 할 때는 항상 새로운 인스턴스를 생성해야 한다.
const reducer = createReducer([], (builder) =>
  builder
    .addCase(addTodo, (state, action) => {
      const key = Date.now();
      state.push({ text : action.payload, id: key, key: key});
    })
    .addCase(deleteTodo, (state, action) => state.filter(todo => todo.id !== action.payload))    
);
```

## configureStore

미들웨어와 store 를 생성하기  
Redux Developer Tools 를 사용할 수 있게 해 줌.  

## createSlice

createAction 과 createReducer 를 모두 합치기

