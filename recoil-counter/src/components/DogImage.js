import React from 'react';
import {useRecoilValue} from "recoil";
import {randomDog} from "../states/selectors";

function DogImage(props) {
  const imageUrl = useRecoilValue(randomDog);

  return (
    <div>
      <img src={imageUrl} alt={``} width={`100%`} height={`100%`} />
    </div>
  );
}

export default DogImage;