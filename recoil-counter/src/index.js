import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import {RecoilRoot} from "recoil";
import CharacterCounter from "./components/CharacterCounter";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RecoilRoot>
    <App />
    <CharacterCounter />
  </RecoilRoot>
);
