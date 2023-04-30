/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import cardStyle from '../assets/styles/css/card.module.css';
import style from './Robot.module.css';
import textStyle from '../assets/styles/css/single-line.module.css';
import loadingPic from "@/assets/images/Spinner-1s-200px.gif";

interface RobotProps
{
    name: string;
    email: string;
    id: number;
}


const Robot: React.FC<RobotProps> = ({ id, name, email }) =>
{
    const _imgAttr = { style: { backgroundImage: `url(${ loadingPic})`}, 'data-src': `https://robohash.org/${ id }` }
    const [imgAttr, setImgAttr] = useState(_imgAttr);
    const img = new Image();
    img.addEventListener("load", (e) => {
        console.log(e);
        // setImgAttr({style: { backgroundImage: `url(${ _imgAttr["data-src"] })`}, 'data-src': ''});
    });
    img.src = _imgAttr["data-src"];
    const boxStyle = [cardStyle.card, cardStyle["card-pic_-text--vertical"], style.card].join(' ');
    const singleLineStyle = [textStyle["text-center"], textStyle["text-hidden"]].join(' ');

    return (
        <div className={boxStyle}>
            <div className={style["card-img"]} {...imgAttr} ></div>
            <h2 className={singleLineStyle}>{name}</h2>
            <p className={singleLineStyle}>{email}</p>
        </div>
    );
};

export default Robot;

