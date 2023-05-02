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
import textStyle from './assets/styles/css/single-line.module.css';
import { webFontLazyLoad } from './utils/lazy-load';
import { v4 as uuidv4 } from 'uuid';

import { NextUIProvider } from '@nextui-org/react';
// 在NextUI后导入nextui-style-reset.css
import '@/assets/styles/nextui-style-reset.css';

// const { loadFont, isLazyLoad } = webFontLazyLoad();
const fontFamilyName = 'Newbee Black';
const TITLE = '罗伯特吊炸天机器人';
const TEST_TEXT = '罗伯特';
const id = uuidv4();
const logoId = uuidv4();

function App()
{
  const { loadFont, isLazyLoad } = webFontLazyLoad(layout['newbee-black--font-style'], { });//TODO: 开发模式下会连着执行两次渲染函数，所以移到此处
  // const h1Style = isLazyLoad() ? {} : { opacity: '1' };
  loadFont(null, fontFamilyName, TEST_TEXT);
  const timer = setInterval(() =>
  {
    const $ele = document.getElementById(id);
    if (!$ele) return;
    clearInterval(timer);
    loadFont($ele, fontFamilyName, TEST_TEXT);
  }, 100);
  // const timer1 = setInterval(() =>
  // {
  //   const $logo = document.getElementById(logoId);
  //   if ($logo)
  //   {
  //     $logo.style.opacity = '1';
  //     clearInterval(timer1);
  //   }
  // }, 100);

  // const h1Style = { fontFamily: fontFamilyName, fontSize: '5em', fontWeight: 'bold', lineHeight: '1', letterSpacing: '0' };

  return (
    <NextUIProvider>
        <div className={layout.header}>
          <img id={logoId} className={layout["header-logo"]} src={logo} alt="logo" />
          <h1 id={id} className={textStyle['text-hidden']} >{TITLE}</h1>
        </div>
        <div className={[boxStyle["flex-grid"], layout.main].join(' ')}>
          {/* <TestHacker/> */}
          {/* render robots list */}
          <RobotGridFrame />
        </div>
    </NextUIProvider>
  );
}

export default App;
