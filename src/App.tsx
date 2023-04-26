import React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import logo from './logo.svg';
import './App.css';
import Robot from './components/Robot';
import robots from "@/mock-data/robots.json";
import TestHacker from './hack攻击防范';

function App() {
  return (
    <div className="App">
      <TestHacker/>
      <ul>
        {/* render robots list */}
        {robots.map(r => <Robot {...r} />)}
      </ul>
    </div>
  );
}

export default App;
