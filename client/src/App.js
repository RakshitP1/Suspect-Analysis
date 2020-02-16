import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import MainPage from "./Pages/MainPage/MainPage";
import SuspectPage from "./Pages/SuspectPage/SuspectPage";

import Sentiment from "./Components/Sentiment/Sentiment.js";

import "./App.css";
// import "./bootstrap.min.css";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <MainPage />
          </Route>
          <Route exact path="/suspect">
            <SuspectPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
