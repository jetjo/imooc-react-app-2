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

type lazyLoadArg = { $img?: HTMLElement, src?: string; };

function lazyLoad({ $img, src }: lazyLoadArg)
{
    function imgLoadedHandler()
    {
        function transitionHandler()
        {
            if (!$img) return;
            $img.removeEventListener("transitionend", transitionHandler);
            $img.style.backgroundImage = `url(${ src })`;
            $img.style.opacity = `1`;
        };
        if (!$img) return;
        $img.addEventListener("transitionend", transitionHandler);
        $img.style.opacity = `0`;
    }
    let loaded = false, handled = false, mounted = false;
    if (!src) throw new Error('src 不能为空！');
    const img = new Image();
    img.addEventListener("load", () =>
    {
        loaded = true;
        if (handled || !mounted) return;
        imgLoadedHandler();
        handled = true;
    });
    img.src = src;

    function lazyLoad({ $img: $imgNew }: lazyLoadArg)
    {
        // if ($img) return;// 不会发生，即使由值也需要更新，因为可能不是一个节点了
        $img = $imgNew;
        mounted = true;
        // if (handled || !loaded) return !$img ? lazyLoad : undefined;
        if (!handled && loaded)
        {
            imgLoadedHandler();
            handled = true;
        }
        return lazyLoad;// if (!$img)
    }
    return lazyLoad;// if (!$img)
}

class Robot extends React.Component<RobotProps, {}>
{
    lazyLoad?: typeof lazyLoad;
    isLazyLoaded: boolean = false;

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
        $img && this.lazyLoad && this.lazyLoad({ $img });
    }

    render(): React.ReactNode
    {
        // console.log('rendering...');
        const { name, email, id, groupId } = this.props;
        const src = `https://robohash.org/${ id }`;
        // const $img = document.getElementById(id + groupId);//这是渲染之前的元素,再第一次渲染时肯定为空
        !this.isLazyLoaded &&
            // (this.isLazyLoaded = true) &&
            (this.lazyLoad = lazyLoad({ src }));

        const imgAttr = { id: id + groupId, opacity: 1, style: { backgroundImage: `url(${ this.isLazyLoaded ? src : loadingPic })` } };
        this.isLazyLoaded = true;

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

