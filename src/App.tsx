import logo from './logo.svg';
import RobotGridFrame from './components/robots/Robot-Grid-Frame';
import boxStyle from './assets/styles/css/flex-grid.module.css';
import layout from './App.module.css';
import textStyle from './assets/styles/css/single-line.module.css';

import { createTheme, NextUIProvider } from '@nextui-org/react';
// 在NextUI后导入nextui-style-reset.css
import '@/assets/styles/nextui-style-reset.css';

import ShoppingCar from './components/shopping-car/shopping-car';

import AppStateProvider from './App.context';

// const { loadFont, isLazyLoad } = webFontLazyLoad();
// const fontFamilyName = 'Newbee Black';
const TITLE = '罗伯特吊炸天机器人';
// const TEST_TEXT = '罗伯特';
const id = window.h1_id; //uuidv4();
const logoId = window.logo_id; //uuidv4();

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

function App()
{
  // const { loadFont, isLazyLoad } = webFontLazyLoad(layout['newbee-black--font-style'], {});//TODO: 开发模式下会连着执行两次渲染函数，所以移到此处
  return (
    <NextUIProvider theme={theme}>
      <AppStateProvider>
        <div className={layout.header}>
          <img id={logoId} className={layout.headerLogo} src={logo} alt="logo" />
          <h1 id={id} className={textStyle.textHidden} >{TITLE}</h1>
        </div>
        <ShoppingCar />
        <div className={[boxStyle.flexGrid, layout.main].join(' ')}>
          {/* <TestHacker/> */}
          <RobotGridFrame />
        </div>
      </AppStateProvider>
    </NextUIProvider>
  );
}

export default App;
