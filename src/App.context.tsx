// App.context.tsx
import React, { createContext } from "react";
import { useImmerReducer } from 'use-immer';

interface IAppState
{
    userName: string;
    shoppingCar: {
        items: { item: any, count: number; }[];
    };
}

const defaultAppContext: IAppState = {
    userName: 'bing',
    shoppingCar: {
        items: []
    }
};

export const appContext = createContext(defaultAppContext);
export const appSetterContext = createContext<React.Dispatch<Action> | undefined>(undefined);

/* const */
export enum ShoppingCarActionType
{
    Add = 1,
    Clear = -2,
    Remove = -1,
    SetItemCount = 0,
}
type Action = {
    shoppingCar: {
        type: ShoppingCarActionType;
        count?: number;
        which?: {
            (data: unknown): boolean;
        };
        what?: {
            (): unknown;
        };
    };
};

function shoppingCarReducer(draft: IAppState, { shoppingCar: action }: Action)
{
    requireSupportType();
    function requireSupportType()
    {
        const ts = Object.keys(ShoppingCarActionType);
        for (const t of ts)
        {
            if (action.type === ShoppingCarActionType[t]) return;
        }
        throw Error(`不支持${ action.type }操作！`, { cause: action });
    }
    function requireWhich()
    {
        if (!action.which) throw Error(`action type: ${ action.type }时, 参数action.which不呢为空！`, { cause: action });
    }
    function requireWhat()
    {
        if (!action.what) throw Error(`action type: ${ action.type }时, 参数action.what不呢为空！`, { cause: action });
    }
    function requireCount() // (count: number | undefined): count is number// | never
    {
        if (!(action.count! > 0)) throw Error(`action type: ${ action.type }时, 参数action.count必须大于0`, { cause: action });
        // return true;
    }
    const items = draft.shoppingCar.items;
    if (action.type === ShoppingCarActionType.Remove)
    {
        requireWhich();
        draft.shoppingCar.items = items.filter(e => !action.which!(e.item));
    }
    else if (action.type === ShoppingCarActionType.Add)
    {
        requireWhat();
        draft.shoppingCar.items = [...items, { item: action.what!(), count: 1 }];
    }
    else if(action.type === ShoppingCarActionType.SetItemCount)
    {
        requireWhich();
        requireCount();
        draft.shoppingCar.items = items.map(e =>
        {
            if (action.which!(e.item))
                return { ...e, count: action.count! };
            else return e;
        });
    }
    else
    {
        draft.shoppingCar.items = [];
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
        throw Error(`不支持${ action }操作！`, { cause: action });
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
