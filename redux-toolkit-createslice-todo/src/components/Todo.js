import React from 'react';
import {actionCreators} from "../store";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

// text, id는 todo 의 구조 분해로 할당됨.
function Todo({ text, id, onBtnClick }) {
  return (
    <li>
      <Link to={`/${id}`}>{text}</Link>
      <button onClick={onBtnClick}>DEL</button>
    </li>
  );
}

const mapDispatchToProps = (dispatch, ownProps) => {
  // 삭제를 위한 id는 store.js에서 아래의 코드로 추가되고 있음.
  // case ADD:
  //       const key = Date.now();
  //       return [{ text : action.text, id: key, key: key}, ...state];
  return {
    onBtnClick: () => dispatch(actionCreators.deleteTodo(ownProps.id))
  };
}

export default connect(null, mapDispatchToProps)(Todo);