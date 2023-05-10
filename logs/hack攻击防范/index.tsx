import React from "react";

const TestHacker = () =>
{
    const innerHTMLHack = `<img src="Invalid Src" onerror="javascript: alert('一段恶意代码，攻击成功！')" />`
    // eslint-disable-next-line no-script-url
    const inlineJSHack = `javascript: alert('一段恶意代码，攻击成功！')`
    return <div>{innerHTMLHack}
    <a href={inlineJSHack}>恶意链接！！！</a>
    </div>;
};

export default TestHacker;
