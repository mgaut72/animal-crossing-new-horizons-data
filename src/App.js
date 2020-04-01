import React from 'react';
import CreatureGrid from './CreatureGrid.js';
import './App.css';
import bugs from "./bugs.js";
import fish from "./fish.js";

function App() {
  return (
    <CreatureGrid creatures={[...bugs, ...fish]}/>
  );
}

export default App;
