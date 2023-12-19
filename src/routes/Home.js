import React, {useState} from 'react';
import {connect} from "react-redux";
import { add } from "./store";
import Todo from "../components/Todo";

function Home({toDos, addToDo}) {
  const [text, setText] = useState('')
  let onChanged = (e) => {
    setText(e.target.value)
  }

  let onSubmit = (e) => {
    e.preventDefault()
    addToDo(text)
    setText('')
  }

  return (
    <>
      <h1>To Do</h1>
      <form onSubmit={onSubmit}>
        <input type="text" value={text} onChange={onChanged} />
        <button id={`btnAdd`}>Add</button>
      </form>
      <ul>
        {toDos.map(toDo => <Todo text={toDo.text} id={toDo.id} key={toDo.id} />)}
      </ul>
    </>
  );
}

const mapStateToProps = (state) => {
  return { toDos: state }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToDo: text => dispatch(add(text))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);