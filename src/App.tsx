import React, { useState } from 'react';
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

import { createTheme, NextUIProvider } from '@nextui-org/react';
// 在NextUI后导入nextui-style-reset.css
import '@/assets/styles/nextui-style-reset.css';

import ShoppingCar from './components/shopping-car';

// const { loadFont, isLazyLoad } = webFontLazyLoad();
const fontFamilyName = 'Newbee Black';
const TITLE = '罗伯特吊炸天机器人';
const TEST_TEXT = '罗伯特';
const id = uuidv4();
const logoId = uuidv4();

const theme = createTheme({
  type: "light", // it could be "light" or "dark"
  theme: {
    colors: {
      // brand colors
      // primaryLight: '$green200',
      // primaryLightHover: '$green300',
      // primaryLightActive: '$green400',
      // primaryLightContrast: '$green600',
      // primary: 'hls(185, 100%, 28%)',
      primary: '#2da0bf',
      // primaryBorder: '$green500',
      // primaryBorderHover: '$green600',
      // primarySolidHover: '$green700',
      // primarySolidContrast: '$white',
      // primaryShadow: '$green500',

      // gradient: 'linear-gradient(112deg, $blue100 -25%, $pink500 -10%, $purple500 80%)',
      // link: '#5E1DAD',

      // // you can also create your own color
      // myColor: '#ff4ecd'

      // // ...  more colors
    },
    space: {},
    fonts: {}
  }
});

// const items: any[] = [];

function App()
{
  const [ items, setItems ] = useState<any[]>([]);
  const { loadFont, isLazyLoad } = webFontLazyLoad(layout['newbee-black--font-style'], {});//TODO: 开发模式下会连着执行两次渲染函数，所以移到此处
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
    <NextUIProvider theme={theme}>
      <div className={layout.header}>
        <img id={logoId} className={layout["header-logo"]} src={logo} alt="logo" />
        <h1 id={id} className={textStyle['text-hidden']} >{TITLE}</h1>
      </div>
      <ShoppingCar items={ items } />
      <div className={[boxStyle["flex-grid"], layout.main].join(' ')}>
        {/* <TestHacker/> */}
        {/* render robots list */}
        <RobotGridFrame addToCar={
          (item) => 
          {
            // items.push({ item, index: items.length });
            setItems([...items, { item, index: items.length }]);
          }
        } />
      </div>
    </NextUIProvider>
  );
}

export default App;
