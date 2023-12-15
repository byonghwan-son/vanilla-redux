import {legacy_createStore as createStore} from 'redux'

const form = document.querySelector('form')
const input = document.querySelector('input')
const ul = document.querySelector('ul')

const ADD_TODO = "ADD_TODO"
const DELETE_TODO = "DELETE_TODO"


const addTodo = text => {
  return {
    type: ADD_TODO, text
  };
}

const deleteTodo = id => {
  return {
    type: DELETE_TODO,
    id
  }
}

const dispatchAddTodo = text => {
  store.dispatch(addTodo(text))
}

const dispatchDeleteTodo = (e) => {
  const id = parseInt(e.target.parentNode.id)
  store.dispatch(deleteTodo(id))
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      let newTodoObj = {text: action.text, id: Date.now()};
      return [newTodoObj, ...state]
    case DELETE_TODO:
      return state.filter(todo => todo.id !== action.id)
    default:
      return state
  }
}

const store = createStore(reducer)

const paintTodos = () => {
  const toDos = store.getState()
  ul.innerHTML = ''
  toDos.forEach(todo => {
    const li = document.createElement('li')
    const btn = document.createElement('button')
    btn.addEventListener('click', dispatchDeleteTodo)
    btn.innerText = "X"
    li.id = todo.id
    li.innerText = todo.text
    li.appendChild(btn)
    ul.appendChild(li)
  })
}

store.subscribe(paintTodos)

const onSubmit = e => {
  e.preventDefault()
  const toDo = input.value
  input.value = ''
  dispatchAddTodo(toDo)
}

form.addEventListener('submit', onSubmit)