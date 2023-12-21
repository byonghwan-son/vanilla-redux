import {selector} from "recoil";
import {countState} from "./atom";

export const countNextState = selector({
  key: '$counterNextState',
  get: ({ get }) => {
    return get(countState);
  }
})

export const randomDog = selector({
  key: '$randomDog',
  get: async () => {
    const response = await fetch('https://dog.ceo/api/breeds/image/random');
    const data = await response.json()
    return data.message;
  }
})