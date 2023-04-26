import React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import logo from './logo.svg';
import './App.css';
import Robot from './components/Robot';
import robots from "@/mock-data/robots.json";

function App() {
  return (
    <div className="App">
      <ul>
        {/* render robots list */}
        {robots.map(r => <Robot id={r.id} name={r.name} email={r.email} />)}
      </ul>
    </div>
  );
}

export default App;
