import { legacy_createStore as createStore } from 'redux'

const plus = document.getElementById('plus')
const minus = document.getElementById('minus')
const number = document.querySelector('span')

number.innerText = "0"
const PLUS = "PLUS"
const MINUS = "MINUS"

const countModifier = (currentCount = 0, action) => {
  switch(action.type) {
    case PLUS:
      return currentCount + 1
    case MINUS:
      return currentCount - 1
    default:
      return currentCount
  }
}

const countStore = createStore(countModifier)

const onChange = () => {
  // getState : reducer를 통해 리턴된 값
  number.innerText = countStore.getState()
}

countStore.subscribe(onChange)
// action의 객체에는 꼭, 반드시 "type"이 있어야 함.
plus.addEventListener('click', () => countStore.dispatch({type: PLUS}))
minus.addEventListener('click', () => countStore.dispatch({type: MINUS}))
