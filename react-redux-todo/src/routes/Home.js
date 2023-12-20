import React, {useRef, useState} from 'react';
import {connect} from "react-redux";
import {actionCreators} from "../store";
import Todo from "../components/Todo";

function Home({toDos, addTodo}) {
  const [text, setText] = useState('');
  const inputBox = useRef();

  const onChange = (e) => {
    setText(e.target.value);
  }
  const onSubmit = (e) => {
    e.preventDefault();
    addTodo(text); // dispatch 호출과 동일함. (dispatch 를 props(속성)을 통해서 전달함. component 내부에서 언제든지 사용가능함.)
    setText('');
    inputBox.current.focus();
  }

  return (
    <>
      <h4>할 일을 입력해 주세요.</h4>
      <form onSubmit={onSubmit}>
        <input ref={inputBox} type="text" value={text} onChange={onChange}/>
        <button>Add</button>
      </form>
      <ul>
        {
          toDos.map(todo => <Todo {...todo} />)
        }
      </ul>
    </>
  );
}

const mapStateToProps = (state, ownProps) => {
  return { toDos : state };
}

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: text => dispatch(actionCreators.addTodo(text))
  };
}

// connect(mapStateToProps, mapDispatchToProps) : 함수의 currying
export default connect(mapStateToProps, mapDispatchToProps)(Home);

// 아래의 방법으로도 외부에 노출 가능
// Home = connect(getCurrentState)(Home);
// export default Home;
