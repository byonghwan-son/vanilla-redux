import React from 'react';
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import Home from "../routes/Home";
import Detail from "../routes/Detail";

function App() {
  return (
    <div>
      <h1>React Redux Todo</h1>
      <Router>
        <Routes>
          <Route path={`/`} exact element=<Home /> />
          <Route path={`/:id`} element=<Detail /> />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
