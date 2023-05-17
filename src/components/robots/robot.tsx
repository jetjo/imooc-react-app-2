import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
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

// var tt;

const Robot: React.FC<Prop> = ( { onChange, item } ) =>
{
    const $img = useRef<HTMLImageElement>();
    const [ state, setState ] = useState( { backgroundImage: `url(${ loadingPic })`  } );

    if ( !$img.current && ( item.id > 0 || window.isDebug ) )
    {
        $img.current = new Image();
        $img.current.addEventListener( 'load', () =>
        {
            setState( { backgroundImage: `url(https://robohash.org/${ id })` } );
        } );
        $img.current.src = `https://robohash.org/${ item.id }`;
    }

    const { id, name = '', email = '' } = item;

    const handlePress = useAddToCar( item );
    const handleClick = useCallback( () => onChange( id ), [onChange ,id ] );

    return (
        <div
            onClick={ handleClick }
            className={ style.card }>
            <div className={ style.cardImg } style={ state } ></div>
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

export default memo(Robot);

