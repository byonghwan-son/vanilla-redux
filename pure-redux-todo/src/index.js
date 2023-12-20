import { legacy_createStore as createStore } from 'redux';

const form = document.querySelector('form');
const input = document.querySelector('input');
const ul = document.querySelector('ul');

const ADD_TODO = "add_todo";
const DELETE_TODO = "delete_todo";

const addTodo = text => {
  return {
    type: ADD_TODO,
    text
  };
}

const deleteTodo = id => {
  return {
    type: DELETE_TODO,
    id
  };
}

const reducer = (state = [], action) => {
  console.log(action);
  switch(action.type) {
    case ADD_TODO:
      return [{ text: action.text, id: Date.now() }, ...state];
    case DELETE_TODO:
      return state.filter(todo => todo.id !== action.id);
    default:
      return state;
  }
}

const store = createStore(reducer);

const dispatchAddTodo = text => {
  store.dispatch(addTodo(text));
}

const dispatchDeleteTodo = (e) => {
  const id = parseInt(e.target.parentNode.id);
  store.dispatch(deleteTodo(id));
}

const displayTodo = () => {
  const toDos = store.getState();
  ul.innerHTML = '';
  toDos.forEach(todo => {
    const btn = document.createElement('button');
    btn.innerText = "DEL";
    btn.addEventListener('click', dispatchDeleteTodo);
    const li = document.createElement('li');
    li.id = todo.id;
    li.innerText = `${todo.text}`;
    li.appendChild(btn);
    ul.appendChild(li);
  })
}

store.subscribe(displayTodo)

const onSubmit = (e) => {
  e.preventDefault();
  const toDo = input.value;
  input.value = '';
  dispatchAddTodo(toDo);
}

form.addEventListener('submit', onSubmit);

