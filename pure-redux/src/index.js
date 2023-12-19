import {legacy_createStore as createStore} from "redux";

const plus = document.getElementById("plus")
const minus = document.getElementById('minus')
const number = document.querySelector('span')

const reducer = (state = 0, action) => {
  switch(action.type) {
    case "PLUS":
      return state + 1
    case "MINUS":
      return state - 1
    default:
      return state;
  }
}

const store = createStore(reducer)

store.subscribe(() => number.innerText = store.getState());

plus.addEventListener('click', () => store.dispatch({type: 'PLUS'}));
minus.addEventListener('click', () => store.dispatch({type: 'MINUS'}));

