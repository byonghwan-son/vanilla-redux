import {selector} from "recoil";
import {countState, textState} from "./atom";

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

export const charCountState = selector({
  key: 'charCountState',
  get: ({get}) => {
    const text = get(textState);
    return text.length;
  }
})