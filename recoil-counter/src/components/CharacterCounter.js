import React from 'react';
import CharacterCount from "./CharacterCount";
import {useRecoilState} from "recoil";
import {textState} from "../states/atom";

function CharacterCounter() {
  const [text, setText] = useRecoilState(textState);

  return (
    <>
      <div><input type={`text`}
                  onChange={(e) => setText(e.target.value)} /></div>
      Echo: {text}
      <CharacterCount />
    </>
  );
}

export default CharacterCounter;