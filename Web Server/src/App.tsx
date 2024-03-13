import React from 'react';
import './App.css';
import Shelves from './Shelves'
import Inventory from './Inventory';

function App() {
  return (
    <div className="App">
      <div className="title">
        Current Stock
      </div>
      <div>
        <Inventory/>
      </div>
    </div>
  );
}

export default App;
