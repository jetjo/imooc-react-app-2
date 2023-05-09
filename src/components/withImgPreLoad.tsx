// withImgPreLoad.tsx
import { imgLazyLoad } from "@/utils/lazy-load";
import React, { forwardRef, ForwardRefRenderFunction, useContext, useMemo, useRef } from "react";

// TODO: 参数名ChildCom首字母必须大写。。。
// TODO: 否则报错：类型“JSX.IntrinsicElements”上不存在属性“childCom”。ts(2339)
const withImgPreLoad = <T extends HTMLElement, P = {}>(ChildCom: ForwardRefRenderFunction<T, P>) =>
{
    const ChildComWithRef = forwardRef(ChildCom);

    return (props) =>
    {
        const $img = useRef<HTMLImageElement>(null);
        const src = `https://robohash.org/${ props.item.id }`;

        imgLazyLoad(() => $img.current, src);

        return (<ChildComWithRef {...props} ref={$img} />);
    };
};

export default withImgPreLoad;
