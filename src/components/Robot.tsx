/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import cardStyle from '../assets/styles/css/card.module.css';
import style from './Robot.module.css';
import textStyle from '../assets/styles/css/single-line.module.css';
import loadingPic from "@/assets/images/Spinner-1s-200px.gif";

import { imgLazyLoad } from '@/utils/lazy-load';

interface RobotProps
{
    name: string;
    email: string;
    id: number;
    groupId: string;
}

class Robot extends React.Component<RobotProps, {}>
{
    loadImg: ReturnType<typeof imgLazyLoad>['loadImg'];
    isLazyLoaded?: ReturnType<typeof imgLazyLoad>['isLazyLoaded'];
    constructor(props)
    {
        super(props);
        this.state = {};
        // this.loadImg.call(this);
        const { loadImg, isLazyLoaded } = imgLazyLoad();
        this.loadImg = loadImg;
        this.isLazyLoaded = isLazyLoaded;
    }

    componentDidMount(): void
    {
        console.log('mounted!!!');
        const { id, groupId } = this.props;
        const src = `https://robohash.org/${ id }`;
        const $img = document.getElementById(id + groupId);
        this.loadImg($img, src);
    }

    render(): React.ReactNode
    {
        console.log('rendering...');
        const { name, email, id, groupId } = this.props;
        const src = `https://robohash.org/${ id }`;
        // const $img = document.getElementById(id + groupId);//这是渲染之前的元素,再第一次渲染时肯定为空

        const imgAttr = {
            id: id + groupId,
            opacity: 1,
            style: {
                // backgroundImage: `url(${ this.lazyLoad ? src : loadingPic })`
                backgroundImage: `url(${ (this.isLazyLoaded && this.isLazyLoaded()) ? src : loadingPic })`
            }
        };
        this.loadImg(null, src);

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

