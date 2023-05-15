import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app';
import reportWebVitals from './reportWebVitals';

// import.meta.webpackContext(".", {
//   exclude: /node_modules|\.html$/,
// });

// const k = Object.keys(__webpack_modules__).find(k => /App\.tsx/.test(k));

// const module = { exports: {} } as NodeJS.WebpackRequireResult;
// k && __webpack_modules__[k](module, module.exports, __webpack_require__);

//这样导出的模块，其中的jsx没有经过babel转译，React.createElement调用失败
// console.log({ url, webpack, context: React.createElement(module.exports.default()) });
// console.log({ url, webpack, context:  (context('./App.tsx') as any).default });÷

console.log(process.env);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(

      <App />

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
