import {useRecoilState, useRecoilValue, useResetRecoilState} from "recoil";
import {countState} from "../states/atom";
import {countNextState} from "../states/selectors";
import React, {Suspense} from "react";
import Loading from "./Loading";
import DogImage from "./DogImage";

function App() {
  const [count, setCount] = useRecoilState(countState);
  const resetCount = useResetRecoilState(countState);
  const nextCount = useRecoilValue(countNextState);

  const increase = () => {
    setCount(count + 1);
  }

  const reset = () => {
    resetCount();
  }

  return (
    <>
      <h3>NextCount : {nextCount}</h3>
      <h3>Count : {count}</h3>
      <button onClick={increase}>Increase</button>
      <button onClick={reset}>Reset</button>
      <br/>
      <Suspense fallback={<Loading/>}>
        <DogImage/>
      </Suspense>
    </>
  );
}

export default App;
