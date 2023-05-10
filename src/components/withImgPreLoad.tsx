// withImgPreLoad.tsx
import { imgLazyLoad } from "@/utils/lazy-load";
import { forwardRef, ForwardRefRenderFunction, useRef } from "react";

// TODO: 参数名ChildCom首字母必须大写。。。
// TODO: 否则报错：类型“JSX.IntrinsicElements”上不存在属性“childCom”。ts(2339)
const withImgPreLoad = <T extends HTMLElement, P extends {}>(ChildCom: ForwardRefRenderFunction<T, P>, getSrc: (p: React.PropsWithoutRef<P>) => string) =>
{
    const ChildComWithRef = forwardRef(ChildCom);

    // NOTE: 类型“*”的参数不能赋给类型“*”的参数。"*" 可赋给 "*" 类型的约束，但可以使用约束 "*" 的其他子类型实例化 "*"。
    // NOTE: 包裹了ChildComWithRef的组件也可以接受ref作为第二个参数，所以props的类型是React.PropsWithoutRef<P> & React.RefAttributes<T>
    return (props: React.PropsWithoutRef<P> & React.RefAttributes<T>) =>
    {
        const $img = useRef<T>(null);
        const src = getSrc(props);

        imgLazyLoad(() => $img.current, src);

        return (<ChildComWithRef {...props} ref={$img} />);
    };
};

export default withImgPreLoad;
