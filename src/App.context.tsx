// App.context.tsx
import React, { createContext } from "react";
import { useImmerReducer } from 'use-immer';

import { shoppingCarReducer, ShoppingCarActionType, shoppingCar } from "./model/shoppingCar";

interface IAppState
{
    userName: string;
    shoppingCar: typeof shoppingCar | Parameters<typeof shoppingCarReducer>[0];
}

type Action = {
    shoppingCar: Parameters<typeof shoppingCarReducer>[1];
};

function reducer(draft: IAppState, action: Action)
{
    if (action.shoppingCar)
    {
        draft.shoppingCar = shoppingCarReducer(draft.shoppingCar, action.shoppingCar);
    }
    else
    {
        throw Error(`不支持${ action }操作！`, { cause: action });
    }
}


const defaultAppContext: IAppState = {
    userName: 'bing',
    shoppingCar
};

const appContext = createContext(defaultAppContext);
const appSetterContext = createContext<React.Dispatch<Action> | undefined>(undefined);


const AppStateProvider = (props) =>
{
    const [state, dispatch] = useImmerReducer(reducer, defaultAppContext);
    return (
        <appContext.Provider value={state}>
            <appSetterContext.Provider value={dispatch}>
                {props.children}
            </appSetterContext.Provider>
        </appContext.Provider >
    );
};

export { appContext, appSetterContext, ShoppingCarActionType };

export default AppStateProvider;
