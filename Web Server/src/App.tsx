import React from 'react';
import './App.css';
import Shelves from './Shelves'

function App() {
  return (
    <div className="App">
      <div className="title">
        Current Stock
      </div>
      <div>
        <Shelves/>
      </div>
    </div>
  );
}

export default App;
