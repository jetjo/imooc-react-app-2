import React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import logo from './logo.svg';
import Robot from './components/Robot';
import robots from "@/mock-data/robots.json";
import TestHacker from './hack攻击防范';
import style from './App.module.css';

function App() {
  return (
    <div className={style.container}>
      {/* <TestHacker/> */}
      <div className={style['card-set-box--grid']}>
        {/* render robots list */}
        {robots.map((r, i) => <div key={i} className={style.card}><Robot {...r} /></div>)}
      </div>
    </div>
  );
}

export default App;
