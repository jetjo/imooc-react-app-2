import { ReactElement, useContext, useMemo } from 'react';
import cardStyle from '../../assets/styles/css/card.module.css';
import style from './Robot.module.css';
import textStyle from '../../assets/styles/css/single-line.module.css';
import loadingPic from "@/assets/images/Spinner-1s-200px.gif";
import { appSetterContext } from '@/App.context';

import handleAddPress from '@/model/shoppingCar/controllers/add';


import { Button } from '@nextui-org/react';

import withImgPreLoad from '../withImgPreLoad';

interface Prop
{
    groupId: string;
    onChange: {
        (id: number): void;
    };
    item: Parameters<typeof handleAddPress>[0];
}

// const Robot: React.FC<Prop> = ({ groupId, onChange, item }, ref) =>
const Robot: React.ForwardRefRenderFunction<HTMLImageElement, Prop> = function({ groupId, onChange, item }, $img)
{
    const { id, name = '', email = '' } = item;
    const dispatch = useContext(appSetterContext);

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
                onPress={() => handleAddPress(item, dispatch)}
                size='xs'
                auto
            >Add to 🛒</Button>
        </div>
    );
};

export default withImgPreLoad(Robot);

