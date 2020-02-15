import React from "react";
import "./App.css";

import Sentiment from "./Components/Sentiment/Sentiment.js";

function App() {
  return (
    <div className="App">
      <h1>Suspect Analysis App</h1>
      <Sentiment />
    </div>
  );
}

export default App;
