# React-Redux

* react-redux 모듈 추가하기
```sh
> $ yarn add react-redux
> $ npm install --save react-redux
```

* **중요 : 기존 redux 에서는 외부에서 state 를 다루기 위한 메소드 2개가 있음.**
  * 일단 store 를 통해서 state 에 접근(input, output)하기 위한 방법 
  * getState : 현재 state 의 값을 가져 오기
  * dispatch : action 을 통해서 state 에 값을 전달하기
  * 위의 두 메소드를 아래의 mapStateToProps, mapDispatchToProps 로 대신 처리.
  * 각 컴포넌트 단위로 공유 값을 처리함.
    * 컴포넌트 단위로 처리가 가능하게 되는 이유
    * Provider 를 통해서 하위 컴포넌트에서 store 를 공유할 수 있다는 것.
    * **_store 를 공유한다는 것은 store 내부에 공유해야 할 모든 state 를 정의해야 함._**
```javascript
import {Provider} from "react-redux";
import store from "./store";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
```

* connect 함수
  * state 와 dispatch 를 컴포넌트의 속성값과 연결을 시킨다.
  * 연결은 connect 함수의 파라미터로 전달하는 2개의 함수를 사용함.
  * 각각의 함수에 대한 설명은 아래에 있음.
```javascript
function Home({ toDos, addTodo, deleteTodo }) { // }

export default connect(mapStateToProps, mapDispatchToProps)(Home);
```

* 전달할 state 를 어떻게 컴포넌트의 속성으로 전달할 것인가?
  * state 값이 변경될 때마다 호출된다. 
  * [mapStateToProps](https://react-redux.js.org/using-react-redux/connect-mapstate) 
  * export default connect(mapStateToProps, null)(Home);
```javascript
function Home({ toDos }) { // }

// state : store 의 state
// ownProps : 컴포넌트의 속성 값 (null 허용)
function mapStateToProps(state, ownProps?) {
  // plain object 를 리턴해야 한다.
  return { toDos : state };
}

// Home 컴포넌트의 속성(props)에 할당되어서 state 를 사용할 수 있게 된다.
connect(mapStateToProps, null)(Home);
```

* 전달할 메세지를 dispatch 에 어떻게 만들어서 컴포넌트에 어떻게 전달할 것인가?
  * [mapDispatchToProps](https://react-redux.js.org/using-react-redux/connect-mapdispatch) 
  * export default connect(null, mapDispatchToProps)(Home);
```javascript
function Home({ addTodo, deleteTodo }) { // }

function mapDispatchToProps(dispatch, ownProps?) {
  // 파라미터 dispatch 는 dispatch 함수와 동일한 역할을 함.
  return {
    addTodo : () => {},
    deleteTodo : () => {}
  }
}

// Home 컴포넌트의 속성(props)에 할당되어서 state 를 사용할 수 있게 된다.
connect(null, mapDispatchToProps)(Home);
```
## combineReducers(reducers)

https://ko.redux.js.org/api/combinereducers/

```javascript
// -------------------------------------------------------------
// todos.js
export default function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([action.text])
    default:
      return state
  }
}

// -------------------------------------------------------------
// counter.js
export default function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

// -------------------------------------------------------------
// index.js
import { combineReducers } from 'redux'
import todos from './todos'
import counter from './counter'

export default combineReducers({
  todos,
  counter
})

// -------------------------------------------------------------
// App.js
import { createStore } from 'redux'
import reducer from './reducers/index'

const store = createStore(reducer)
console.log(store.getState())
// {
//   counter: 0,
//   todos: []
// }

store.dispatch({
  type: 'ADD_TODO',
  text: 'Use Redux'
})
console.log(store.getState())
// {
//   counter: 0,
//   todos: [ 'Use Redux' ]
// }
```