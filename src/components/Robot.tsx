/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import cardStyle from '../assets/styles/css/card.module.css';
import style from './Robot.module.css';
import textStyle from '../assets/styles/css/single-line.module.css';
import loadingPic from "@/assets/images/Spinner-1s-200px.gif";
import { v4 as uuidv4 } from 'uuid';

interface RobotProps
{
    name: string;
    email: string;
    id: number;
    groupId: string;
}

class Robot extends React.Component<RobotProps, {}>
{
    constructor(props)
    {
        super(props);
        this.state = {};
        // this.loadImg.call(this);
    }

    componentDidMount(): void
    {
        this.loadImg.call(this);
    }

    loadImg(this: React.Component<RobotProps, {}>)
    {
        const { id , groupId } = this.props;
        const src = `https://robohash.org/${ 11 }`;
        const img = new Image();
        const $img = document.getElementById(id + groupId);
        let loaded = false;
        let transitioned = false;
        const handler = () =>
        {
            if(!$img) return;
            $img.removeEventListener("transitionend", transitionHandler);
            $img.style.backgroundImage = `url(${ src })`;
            $img.style.transitionDuration = '1s'
            // $img.style.transitionDelay = '0s'
            $img.style.opacity = '1';
        }
        function transitionHandler(e)
        {
            transitioned = true;
            if (!loaded && $img)
            {
                $img.style.opacity = $img.style.opacity === '1' ? '0' : '1';
                return;
            }
            handler();
        };
        $img?.addEventListener("transitionend", transitionHandler);
        img.addEventListener("load", (e) =>
        {
            loaded = true;
            if (!transitioned) return;
            handler();
        });
        setTimeout(() =>
        {
            $img && ($img.style.opacity = '0')
        }, 1000);
        img.src = src;
    }

    render(): React.ReactNode
    {
        console.log('rendering...');
        const { name, email, id, groupId } = this.props;
        const imgAttr = { id: id + groupId, opacity: 1, style: { backgroundImage: `url(${ loadingPic })` } };

        const boxStyle = [cardStyle.card, cardStyle["card-pic_-text--vertical"], style.card].join(' ');
        const singleLineStyle = [textStyle["text-center"], textStyle["text-hidden"]].join(' ');

        return (
            <div className={boxStyle}>
                <div className={style["card-img"]} {...imgAttr} ></div>
                <h2 className={singleLineStyle}>{name}</h2>
                <p className={singleLineStyle}>{email}</p>
            </div>
        );
    }
};

export default Robot;

