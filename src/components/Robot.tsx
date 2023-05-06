/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useRef, useState } from 'react';
import cardStyle from '../assets/styles/css/card.module.css';
import style from './Robot.module.css';
import textStyle from '../assets/styles/css/single-line.module.css';
import loadingPic from "@/assets/images/Spinner-1s-200px.gif";

import { imgLazyLoad } from '@/utils/lazy-load';

import { Button } from '@nextui-org/react';

interface RobotProps
{
    name: string;
    email: string;
    id: number;
    groupId: string;
    onChange: {
        (id: number): void;
    }
    addToCar: (id: number) => void;
}

const Robot: React.FC<RobotProps> = ({ name, email, id, groupId, onChange, addToCar }) =>
{
    const $img = useRef<HTMLImageElement>(null);
    const src = `https://robohash.org/${ id }`;

    imgLazyLoad(() => $img.current, src);
    console.log('rendering...');

    const imgAttr = {
        id: id + groupId,
        opacity: 1,
        style: {
            // backgroundImage: `url(${ this.lazyLoad ? src : loadingPic })`
            backgroundImage: `url(${ loadingPic })`
        }
    };

    const boxStyle = [cardStyle.card, cardStyle.cardVerticalPicTextStyle, style.card].join(' ');
    const singleLineStyle = [textStyle.textCenter, textStyle.textHidden].join(' ');
    return (
        <div
            onClick={() => onChange(id)}
            className={boxStyle}>
            <div ref={$img} className={style.cardImg} {...imgAttr} ></div>
            <h3 className={singleLineStyle}>{name}</h3>
            <p className={singleLineStyle}>{id}</p>
            <Button onPress={() => addToCar(id)} size='xs' auto>Add to 🛒</Button>
        </div>
    );
};

export default Robot;

