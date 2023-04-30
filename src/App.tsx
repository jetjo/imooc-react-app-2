import React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import logo from './logo.svg';
import RobotGridFrame from './components/Robot-Grid-Frame';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import TestHacker from './hack攻击防范';
import boxStyle from './assets/styles/css/flex-grid.module.css';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import cardStyle from './assets/styles/css/card.module.css';
import layout from './App.module.css';
import textStyle from './assets/styles/css/single-line.module.css'

function App()
{
  return (
    <div>
      <div className={layout.header}>
        <img className={layout["header-logo"]} src={logo} alt="logo" />
        <h1 className={textStyle['text-hidden']}>罗伯特吊炸天机器人</h1>
      </div>
      <div className={[boxStyle["flex-grid"], layout.main].join(' ')}>
        {/* <TestHacker/> */}
        {/* render robots list */}
        <RobotGridFrame />
      </div>
    </div>
  );
}

export default App;
