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

type lazyLoadArg = { $img?: HTMLElement, src?: string; }

function lazyLoad({ $img, src }: lazyLoadArg)
{
    debugger;
    function imgLoadedHandler()
    {
        function transitionHandler()
        {
            if (!$img) return;
            $img.removeEventListener("transitionend", transitionHandler);
            $img.style.backgroundImage = `url(${ src })`;
            $img.style.opacity = `1`;
        };
        if (!$img || loaded) return;
        loaded = true;
        $img.addEventListener("transitionend", transitionHandler);
        $img.style.opacity = `0`;
    }
    let loaded = false;
    if (!src) throw new Error('src 不能为空！');
    const img = new Image();
    img.addEventListener("load", imgLoadedHandler);
    img.src = src;

    function lazyLoad ({ $img: $imgNew }: lazyLoadArg)
    {
        if (!$imgNew) return;// lazyLoad.bind(null);
        // if ($img) return;// 不会发生
        $img = $imgNew;
        imgLoadedHandler();
    }

    if (!$img) return lazyLoad.bind(null);
    lazyLoad.call(null, {$img});
}

class Robot extends React.Component<RobotProps, {}>
{
    lazyLoad?: any; //typeof lazyLoad;
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

    loadImg()
    {
        const { id, groupId } = this.props;
        const $img = document.getElementById(id + groupId);
        $img&& this.lazyLoad && this.lazyLoad({$img});
    }

    render(): React.ReactNode
    {
        // console.log('rendering...');
        const { name, email, id, groupId } = this.props;
        const src = `https://robohash.org/${ id }`;
        // const $img = document.getElementById(id + groupId);//这是渲染之前的元素
        this.lazyLoad = lazyLoad.call(null, { src });

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

