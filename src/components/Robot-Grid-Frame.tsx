import React, { useEffect, useReducer } from "react";
// import _robots from '@/mock-data/robots.json';
import Robot from "./Robot";
import { v4 as uuidv4 } from 'uuid';
import { list } from '@/api/user';

const groupId = uuidv4();

interface Item
{
    // [key: string]: unknown;
    id: number;
}

type DispatchType = 'Assign' | 'Remove' | 'Update';

function reducer(state: Item[], action: { type: DispatchType, id?: number, data?: Item[] | Item; }): Item[]
{
    function isItems(data): data is Item[]
    {
        if (!Array.isArray(data)) throw Error(`action type: ${ action.type }时, 参数action.data必须是数组！`, { cause: action });
        return true;
    }
    function isItem(data): data is Item
    {
        if (Array.isArray(data) || data === undefined) throw Error(`action type: ${ action.type }时, 参数action.data必须兼容Item类型！`, { cause: action });
        return true;
    }
    if (action.type === 'Assign' && isItems(action.data)) return action.data;
    else if (action.type === 'Remove') return state.filter(e => e.id !== action.id);
    else if (action.type === 'Update' && isItem(action.data))
    {
        const data = action.data;
        return state.map(e =>
        {
            if (e.id === action.id)
            {
                return { ...e, ...data };
            }
            return e;
        });
    }
    else return state;
}

type Dispatch = (value: {
    type: DispatchType;
    id?: number ;
    data?: Item | Item[] ;
}) => void;

async function getUsers(dispatch: Dispatch)
{
    const data = await list();
    Array.isArray(data?.data) && dispatch({ type: 'Assign', data: data.data });
};

function handleChange(id: Item["id"], robots: Item[], dispatch: Dispatch)
{
    const item = robots.find(e => e.id === id);
    if (!item) return;
    dispatch({ type: 'Update', id, data: { id: parseInt((Math.random() * 10000) + '') } });
}

const RobotGridFrame = () =>
{
    const [robots, dispatch] = useReducer(reducer, []);
    useEffect(() =>
    {
        getUsers(dispatch);
    }, []);
    return (<>{
        robots.map((r, i) =>
            <Robot
                key={r.id}
                item={r}
                groupId={groupId}
                onChange={(id) => handleChange(id, robots, dispatch)}
            />
        )
    }</>);
};

export default RobotGridFrame;
