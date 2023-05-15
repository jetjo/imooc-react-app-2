import logo from './logo.svg';
import RobotGridFrame from './components/robots/robot-set';
import style from './app.module.css';

import { createTheme, NextUIProvider } from '@nextui-org/react';
// 在NextUI后导入nextui-style-reset.css
import '@/assets/styles/css/nextui-style-reset.css';

import ShoppingCar from './components/shopping-car/shopping-car';

import AppStateProvider from './app.context';

const TITLE = '罗伯特吊炸天机器人';

const theme = createTheme( {
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
} );

function App ()
{
  return (
    <NextUIProvider theme={ theme }>
      <AppStateProvider>
        <div className={ style.header }>
          <img src={ logo } alt="logo" />
          <h1 className={ style.newbeeBlack } >{ TITLE }</h1>
        </div>
        <div className={ style.middle }>
          <ShoppingCar />
        </div>
        <div className={ style.main }>
          {/* <TestHacker/> */ }
          <RobotGridFrame />
        </div>
      </AppStateProvider>
    </NextUIProvider>
  );
}

export default App;
