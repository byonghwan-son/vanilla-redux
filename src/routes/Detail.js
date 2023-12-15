import React from 'react';
import {connect} from "react-redux";
import {useParams} from "react-router-dom";

function Detail({ toDos }) {
  const id = parseInt(useParams().id)
  const todo = toDos.find(f => f.id === id)
  return (
    <>
      <h1>{todo?.text}</h1>
      <h5>Created at : {(new Date(id)).toLocaleString('ko-KR')}</h5>
    </>
  );
}

const mapStateToProps = (state) => {
  return { toDos: state }
}

export default connect(mapStateToProps, null)(Detail);