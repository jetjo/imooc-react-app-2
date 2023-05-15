import { useEffect, useMemo, useRef, useState } from 'react';
import style from './robot.module.css';
import loadingPic from "@/assets/images/Spinner-1s-200px.gif";

import useAddToCar from '@/hooks/use-add-to-car';

import { Button } from '@nextui-org/react';

interface Prop
{
    onChange: {
        ( id: number ): void;
    };
    item: Parameters<typeof useAddToCar>[ 0 ];
}

var tt;

const Robot: React.FC<Prop> = ( { onChange, item } ) =>
{
    const $img = useRef<HTMLImageElement>();
    const [ state, setState ] = useState( { loading: true } );

    if ( !$img.current && ( item.id > 0 || window.isDebug ) )
    {
        $img.current = new Image();
        $img.current.addEventListener( 'load', () =>
        {
            setState( { loading: false } );
        } );
        $img.current.src = `https://robohash.org/${ item.id }`;
    }

    const { id, name = '', email = '' } = item;

    const imgAttr = useMemo( () =>
    {
        return {
            style: {
                backgroundImage: state.loading ? `url(${ loadingPic })` : `url(https://robohash.org/${ id })`
            }
        };
    }, [ id, state ] );

    useEffect( () =>
    {
        console.log( 'every render...' );
    } );
    useEffect( () =>
    {
        console.log( 'only render...' );
    }, [] );
    useEffect( () =>
    {
        console.log( 'every render...' );
    }, [ state ] );
    useEffect( () =>
    {
        console.log( 'every render...' );
    }, [ id ] );

    const handlePress = useAddToCar( item );

    const ff = tt === handlePress;
    tt = handlePress;

    return (
        <div
            onClick={ () => onChange( id ) }
            className={ style.card }>
            <div className={ style.cardImg } { ...imgAttr } ></div>
            <h3 >{ name }</h3>
            <p >{ email }</p>
            <Button
                onPress={ handlePress }
                size='xs'
                auto
            >Add to 🛒</Button>
        </div>
    );
};

export default Robot;

