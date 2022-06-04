import React from "react";
import logo from "../logo.svg";

import { Converter } from "../components/converter/converter";

import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Converter />
    </div>
  );
}

export default App;
