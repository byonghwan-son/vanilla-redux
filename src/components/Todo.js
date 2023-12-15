import React from 'react';
import {connect} from "react-redux";
import {actionCreator} from "../routes/store";
import {Link} from "react-router-dom";

function Todo({text, id, onBtnClick}) {
  return (
    <li>
      <Link to={`/${id}`}>{text}</Link>
      <button onClick={onBtnClick}>X</button>
    </li>
  );
}

const mapDispatchToProps = (dispatch, ownProps) => {
  // console.log(dispatch, ownProps)
  return {
  onBtnClick: () => dispatch(actionCreator.deleteToDo(ownProps.id))
}}

export default connect(null, mapDispatchToProps)(Todo);