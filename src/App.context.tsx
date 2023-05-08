// App.context.tsx
import { type } from "os";
import React, { createContext, FC } from "react";
import { useImmerReducer } from 'use-immer';

interface IAppState
{
    userName: string;
    shoppingCar: {
        items: { item: any, index: number }[];
    };
}

const defaultAppContext:IAppState = {
    userName: 'bing',
    shoppingCar: {
        items: []
    }
};

export const appContext = createContext(defaultAppContext);
export const appSetterContext = createContext<React.Dispatch<Action>|undefined>(undefined);

type ShoppingCarActionType = "AddToShoppingCar" | "RemoveFromShoppingCar" | "UpdateItemInShoppingCar";
type Action = {
    shoppingCar: {
        type: ShoppingCarActionType;
        index: number;
        id: number;
        data?: any
    }
}

function shoppingCarReducer(draft: IAppState, {shoppingCar: action}: Action)
{
    if (action.type === 'RemoveFromShoppingCar')
    {
        draft.shoppingCar.items.splice(action.index, 1);
    }
    else if (action.type === 'AddToShoppingCar')
    {
        draft.shoppingCar.items.push(action.data)
    }
    else if (action.type === 'UpdateItemInShoppingCar')
    {
        const d = draft.shoppingCar.items[action.index];
        draft.shoppingCar.items[action.index] = {...d, ...action.data}
    }
    else
    {
        throw new Error(`不支持${action.type}操作！`)
    }
}

function reducer(draft: IAppState, action: Action)
{
    if (action.shoppingCar)
    {
        return void shoppingCarReducer(draft, action);
    }
    else
    {
        throw new Error(`不支持${ action }操作！`)
    }
}

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

export default AppStateProvider;
