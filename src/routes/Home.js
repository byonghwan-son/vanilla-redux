import React, {useState} from 'react';
import {connect} from "react-redux";
import {actionCreator} from "./store";

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
        <input type="text" value={text} onChange={onChanged}/>
        <button>Add</button>
      </form>
      <ul>{JSON.stringify(toDos)}</ul>
    </>
  );
}

const mapStateToProps = (state) => {
  return { toDos: state }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addToDo: text => dispatch(actionCreator.addToDo(text))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);