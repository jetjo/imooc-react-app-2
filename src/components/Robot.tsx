/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useRef, useState, useContext, useMemo } from 'react';
import cardStyle from '../assets/styles/css/card.module.css';
import style from './Robot.module.css';
import textStyle from '../assets/styles/css/single-line.module.css';
import loadingPic from "@/assets/images/Spinner-1s-200px.gif";
import { appSetterContext, ShoppingCarActionType } from '@/App.context';

import { imgLazyLoad } from '@/utils/lazy-load';

import { Button } from '@nextui-org/react';

interface Prop
{
    groupId: string;
    onChange: {
        (id: number): void;
    };
    item: {
        [k: string]: any;
        id: number;
    };
}

type Dispatch = React.Dispatch<{
    shoppingCar: {
        type: ShoppingCarActionType;
        count?: number;
        which?: ((data: unknown) => boolean);
        what?: (() => unknown);
    };
}>;

function handlePress(item: Prop['item'], dispatch?: Dispatch)
{
    if (dispatch)
    {
        dispatch({
            shoppingCar: {
                type: ShoppingCarActionType.Add,
                what: () => ({ ...item })
            }
        });
    }
}

const Robot: React.FC<Prop> = ({ groupId, onChange, item }, ref) =>
{
    const { id, name = '', email = '' } = item;
    const dispatch = useContext(appSetterContext);
    const $img = useRef<HTMLImageElement>(null);
    const src = `https://robohash.org/${ id }`;

    imgLazyLoad(() => $img.current, src);

    const imgAttr = useMemo(() => ({
        id: id + groupId,
        opacity: 1,
        style: {
            backgroundImage: `url(${ loadingPic })`
        }
    }), [id, groupId]);

    const boxStyle = [cardStyle.card, cardStyle.cardVerticalPicTextStyle, style.card].join(' ');
    const singleLineStyle = [textStyle.textCenter, textStyle.textHidden].join(' ');
    return (
        <div
            onClick={() => onChange(id)}
            className={boxStyle}>
            <div ref={$img} className={style.cardImg} {...imgAttr} ></div>
            <h3 className={singleLineStyle}>{name}</h3>
            <p className={singleLineStyle}>{email}</p>
            <Button
                onPress={() => handlePress(item, dispatch)}
                size='xs'
                auto
            >Add to 🛒</Button>
        </div>
    );
};

export default Robot;

