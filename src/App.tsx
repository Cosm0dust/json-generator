import React from 'react';
import './App.scss';
import Header from "./components/Header/Header";
import Builder from "./components/Builder/Builder";

function App() {
  return (
    <div className="App">
      <Header />
        <Builder />
    </div>
  );
}

export default App;
