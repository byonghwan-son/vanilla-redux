import React from 'react';
import {useRecoilValue} from "recoil";
import {todoListStatsState} from "../states/selectors";

function TodoListStats() {
  const {
    totalNum,
    totalCompletedNum,
    totalUncompletedNum,
    percentCompleted
  } = useRecoilValue(todoListStatsState)

  return (
    <ul>
      <li>Total Items : {totalNum}</li>
      <li>Items completed : {totalCompletedNum}</li>
      <li>Items not completed : {totalUncompletedNum}</li>
      <li>Percent completed : {Math.round(percentCompleted * 100)}%</li>
    </ul>
  );
}

export default TodoListStats;