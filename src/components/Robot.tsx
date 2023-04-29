/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import cardStyle from '../assets/styles/css/card.module.css';
import style from './Robot.module.css';
import textStyle from '../assets/styles/css/single-line.module.css';

interface RobotProps
{
    name: string;
    email: string;
    id: number;
}


const Robot: React.FC<RobotProps> = ({ id, name, email }) =>
{
    const boxStyle = [cardStyle.card, cardStyle["card-pic_-text--vertical"], style.card].join(' ');
    const singleLineStyle = [textStyle["text-center"], textStyle["text-hidden"]].join(' ');
    const imgAttr = { src: `https://robohash.org/${ id }`, alt: name }

    return (
        <div className={boxStyle}>
            <img className={style["card-img"]} {...imgAttr} />
            <h2 className={singleLineStyle}>{name}</h2>
            <p className={singleLineStyle}>{email}</p>
        </div>
    );
};

export default Robot;

